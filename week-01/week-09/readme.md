# Week - 09
## 1. 啟動 NGINX 服務並查看錯誤訊息
- 指令：`sudo systemctl start nginx`
  
![](/asset/start_ng.png)
- 原因：啟動 NGINX，發現啟動失敗。接下來使用 `systemctl status nginx.service` 查看更詳細的錯誤訊息，並發現 `/etc/nginx/nginx.conf` 中的第 8 行有額外的分號 (unexpected ";")。
  
![](/asset/error_log.png)

## 2. 修正 NGINX 配置檔案
- 指令：`sudo nano /etc/nginx/nginx.conf`
- 原因：修正配置檔案中的語法錯誤。確保沒有多餘的分號，並再次測試配置檔案是否正確。使用 `sudo nginx -t` 測試顯示成功
```bash
ubuntu@ip-172-31-37-116:~$ sudo nginx -t
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```
- 接著再次輸入 `sudo systemctl start nginx` 還是顯示錯誤，所以再看一次 Log `sudo systemctl status nginx.service`

![](/asset/bind_error.png)
原因：根據錯誤訊息，`bind() to 0.0.0.0:80 failed (98: Address already in use)`，這表示 80 端口已經被佔用。

## 3. 處理佔用 80 端口的 Process
- 指令：`sudo lsof -i :80`
- 原因：可知有名為 srv 的 Process，使用 `sudo systemctl stop srv` 終止Process
```bash
COMMAND PID USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
srv     577 root    3u  IPv6   6710      0t0  TCP *:http (LISTEN)
```

- 接著啟動 Nginx 並查看 Log 即可成功啟動，但是輸入 `curl localhost` 仍然無法連接

![](/asset/remove80.png)

## 4. 檢查是否有防火牆阻擋
AWS EC2 上通常使用 AWS Security Groups 來控制端口訪問。如果沒有使用 ufw，可以先確認是否有其他防火牆設置，例如 iptables。
- 指令：`sudo iptables -L`

![](/asset/ipta.png)
- 在 iptables 規則中，看到 INPUT 連線被拒絕，特別是針對 tcp dpt:http（80 端口）。這導致所有到 80 端口的 HTTP 請求被拒絕。
  
- 指令：`sudo iptables -D INPUT -p tcp --dport 80 -j REJECT`，刪除該條規則後，使用 `curl localhost` 即可訪問。
  
![](/asset/delipta.png)

- 但發現為 403 Forbidden

## 5. 解決 403 Forbidden 問題
403 Forbidden 錯誤表示 NGINX 能夠接收請求，但由於權限問題無法提供網頁。通常是因為 NGINX 的根目錄或網頁目錄的讀取權限有問題，或配置檔案中的目錄設定錯誤。

在 Ubuntu 上，NGINX 的預設網頁根目錄通常是 /var/www/html。檢查 NGINX 配置，確認根目錄設置正確：
- 指令：`sudo nano /etc/nginx/sites-available/default`
  - 確保路徑正確 `root /var/www/html;`

確保權限正常
- 指令：`ls -ld /var/www/html`
  - 輸出：`drwxr-xr-x 2 www-data www-data 4096 Oct 11 06:53 /var/www/html`
  - 這樣的權限設置允許 NGINX 讀取和提供該目錄下的文件，因此 /var/www/html 的權限配置是正確的

## 6. 結案
重啟 nginx 並輸入 `curl localhost` 即可完成拜訪

最後僅需使用以下指令，修改網頁內容即可

指令： `sudo nano index.nginx-debian.html`

![](/asset/wek9com.png)

