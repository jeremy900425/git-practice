# Week-04 作業 ( Instance Public IP [98.84.175.100](http://98.84.175.100) )
## 關於 建立 EC2 instance 遇到或想到的 issue
1. 須先將密鑰檔案的權限設置為只允許擁有者讀取檔案，從而符合 SSH 的安全要求。
    ```bash
    chmod 400 your-key.pem

    ssh -i your-key.pem ubuntu@your-public-ip
    ```
2. 為什麼需要下這兩個指令
   ```bash
    sudo apt update -y
    sudo apt upgrade -y
   ```
   - 確保系統保持最新狀態並修復潛在的安全漏洞或錯誤。<br>
   - `apt update` 是用來更新「套件列表」的指令。這個指令會連接到已設定的來源（例如 Ubuntu 的官方），並下載最新的套件列表。更簡單的說這個指令只是獲取最新的「套件菜單」，這個菜單會告訴電腦每一個套件需要在哪個櫃台索取。
   - `apt upgrade` 是用來安裝所有「可更新的套件」版本。這個指令會根據之前 apt update 取得的最新套件資訊，將系統上的所有已安裝套件升級到最新版本。根據上述的例子就是讓電腦真正的去到那個櫃檯來索取最新的套件。
   - `-y` 是自動回應 "yes" ，省去手動確認更新的步驟。
3. Nginx 是什麼？
   
   餐廳服務員（Nginx）和廚房（伺服器）例子：
   1. 顧客進餐廳點餐（用戶發送請求）： 當顧客（用戶）走進餐廳，他們會向服務員（Nginx）點餐，服務員會接下點單（接收到用戶的 HTTP 請求）。
   2. 服務員（Nginx）處理簡單需求： 如果顧客要的東西很簡單，比如飲料（靜態內容，如圖片、CSS 檔案等），服務員可以直接提供，因為這些東西是隨時可以拿到的（Nginx 可以直接處理靜態資源，不需要廚房處理）。
   3. 服務員（Nginx）轉交複雜的訂單給廚房（反向代理）： 如果顧客點的是複雜的菜餚（動態內容或複雜的邏輯，比如 Node.js 處理的資料），服務員無法自己準備。他會把這個點單轉交給廚房（後端伺服器）。這個過程就像 Nginx 作為反向代理，將用戶的請求轉發給後端的伺服器。
   4. 廚房做菜（後端伺服器處理請求）： 廚房根據服務員送來的點單做菜（後端伺服器處理用戶的需求，執行程式並生成動態內容）。
   5. 服務員將菜送到顧客桌上（將伺服器的回應回傳給用戶）： 廚房做好菜後，服務員會把菜（伺服器的回應）端回給顧客（用戶）。Nginx 在這裡相當於將後端伺服器的結果返回給請求的用戶。
   6. 分擔工作量（負載平衡）： 如果有很多顧客來點餐（大量請求同時到達），一個廚房可能忙不過來，餐廳可以設置多個廚房（多個伺服器）。服務員（Nginx）會把訂單分配給不同的廚房（負載平衡），讓每個廚房都不會太忙，餐廳的運作更流暢。
   
   總結特性：
   Nginx 的用途與特性：

    - 靜態內容服務：Nginx 可以直接處理和提供靜態檔案（如圖片、CSS、JS）。
    - 反向代理：它可以將請求轉發給後端的應用伺服器（如 Node.js、Python Flask 等），這稱為反向代理。
    - 負載平衡：可以將用戶的請求分配給多個後端伺服器，來分擔流量和提高應用的穩定性。
    - 高併發性能：Nginx 可以同時處理大量請求，且資源佔用率低。
4. `sudo systemctl start nginx` 指令用途 ?
   
   這個指令的作用是啟動 Nginx 服務
   - `systemctl`：是系統服務管理的指令，簡單來說，它就像是一個 開關，讓你可以輕鬆控制各種系統服務的 啟動、停止、重啟 等操作。
   - `start`：表示要啟動一個服務。在這裡指向的是 nginx（ 因為 start 後面就是寫 nginx ）。
   - `nginx`：指定要啟動的服務名稱，也就是 Nginx Web 伺服器。
5. PM2 是什麼？
   
   可以把 PM2 想像成 一個照顧你的員工的經理：
   - 如果員工（ Node.js server ）因為某些原因停止工作（崩潰），PM2 這個經理會馬上通知他再開始工作（自動重啟）。
   - 經理還會照看多個員工（多個server），並幫助分配工作量（負載平衡）。
   - 如果你不在公司，經理也會在每天上班時間幫你自動安排工作（開機啟動）。
   - 經理還會記錄每個員工的工作表現（日誌），方便你檢查工作情況。
  
        `npm install pm2 -g` 中的 `-g` 代表 global，意思是全局安裝。全局安裝的工具可以在系統的任意目錄下使用，不限於當前的專案目錄。這樣無論你在哪裡運行命令，都可以直接使用 pm2 指令。

### 以上就是我在做作業時遇到的問題，以及我對自己的提問

## ~總結一下～ 如何做到讓外部用戶連線到 app.js 的
 - 建立 AWS EC2 instance
   -  OS : Ubuntu 24.04 
   -  Instance type : t2.micro
   -   22 (SSH) 端口 : 透過 22 端口使用 SSH 來連線並控制 EC2 主機。當使用以下命令時，就是通過 22 端口來進行通訊的：`ssh -i your-key.pem ubuntu@your-public-ip`
   -   80 (HTTP) 端口：當你在瀏覽器中輸入你的 EC2 Public IP（例如 http://your-public-ip）時，Nginx 會透過 80 端口接收這個請求並將其轉發給後端（如 Node.js）。然後，後端會處理 Request，最後透過 80 端口返回給瀏覽器，顯示網頁內容。 所以說 Security Group 必須設定HTTP TCP 80 0.0.0.0/0
 -  SSH 連接 EC2 主機
    -  使用下載的 .pem ，透過 SSH 連接到 EC2 ：
       -  `ssh -i your-key.pem ubuntu@your-public-ip`
    -  確保 .pem 文件的權限正確設置：
       -  `chmod 400 your-key.pem
 -  更新並安裝必要套件
    ```bash
    sudo apt update -y
    sudo apt upgrade -y
    ```
 - 安裝 Nginx：
    ```bash
    sudo apt install nginx -y
    sudo systemctl start nginx
    ```
 -  安裝 Node.js 和 PM2
    ```bash
    sudo apt install nodejs -y
    sudo apt install npm -y
    sudo npm install pm2 -g
    ```
 - Clone github 專案
   - 進入專案目錄並安裝所有套件：
    ```bash
    cd git-practice/backend
    npm install
    ```
 - 使用 PM2 啟動 app.js 伺服器：
    `pm2 start app.js`
 - 配置 Nginx 作為反向代理
    ```bash
    sudo nano /etc/nginx/sites-available/default

    將 config 修改為以下內容：
    server {
        listen 80;  # 1. 這個反向代理會在 80 埠上監聽 HTTP 請求（80 是 HTTP 的預設埠）。
        
        server_name your-public-ip;  # 2. 設定伺服器的名稱，這裡通常使用伺服器的 Public IP

        location / {  # 3. 定義當請求匹配到根路徑（即 `/`）時的行為。
            proxy_pass http://localhost:3000;  # 4. 將匹配到的請求轉發給本地主機的 3000 埠，也就是說，Nginx 會將來自客戶端的請求轉發給在 localhost:3000 上運行的應用程式（如 Node.js ）。
        }
    }
    ```
      - 保存並退出後，重新啟動 Nginx：`sudo systemctl restart nginx`
  
  - 在瀏覽器輸入 http://98.84.175.100 整個過程可以分為以下幾個步驟：
      1. DNS 查詢（跳過，因為直接使用 IP 地址）
      2. 建立 TCP 連接
       - 瀏覽器接下來會根據輸入的 IP 地址 15.168.177.236 與對應的 80 port（HTTP 的預設端口）建立一個 TCP 連接。
       - TCP 連接的建立過程是通過 「三方交握」（峻峰老師有教過） 完成的
       - 所以說我建立 EC2 時，如果不選擇 80 端口，我必須輸入「ip:port」才能成功連線
      3. 發送 HTTP 請求
       - 連接建立後，瀏覽器會向伺服器發送一個 HTTP 請求。這個請求通常包含 GET 方法、Header、Body 等
      4. 伺服器處理請求
       - 當伺服器收到這個 HTTP Request 後，會通過 Nginx（或其他 Web 伺服器）處理這個Request
       - Nginx 作為反向代理會將這個請求轉發給在 localhost:3000 運行的後端（比如 Node.js）。
       - Node.js 接收請求後，會執行相應的邏輯（例如查詢資料庫或生成動態內容），並生成一個 HTTP Respond。
       -  伺服器生成的回應會通過 Nginx 發送回瀏覽器。這個回應通常包括 狀態碼, 內容(例如 HTML 等)
      5. 瀏覽器解析 Respond 並 Render 網頁
      6. 關閉 TCP 連接
        - 當所有資料傳輸完成後，瀏覽器和伺服器會通過 TCP 四次握手（讚嘆峻峰老師）來關閉連接
## 回答問題
### 1. 提供 instance 的 public IP
- http://98.84.175.100
### 2. 什麼是 instance type?
- Instance Type 是指在 AWS 上所選擇的 VM 的規格，包含 CPU、記憶體等。不同的 Instance Type 有不同的Performance 與價格。
### 3. 什麼是 Nginx？有哪些用途與特性？
- 在做作業時已經想過、回答過並紀錄了 :)
### 4. pm2 套件是什麼？有什麼用處？
- 這個也已經想過，在上方回答過了，看來經過老師幾個禮拜的訓練，已經知道在做作業時要自己反思什麼問題了
### 5. 步驟 9 中提到的 proxy 是什麼意思？為什麼要透過 Nginx 來 proxy 到 Express 開發的 Web Server?
- Proxy 是通常會指的是「正向代理」，負責轉發用戶的請求，或是說只要是代表用戶來發送請求的就是正向代理。
- 反之 Reverse Proxy 就是代表伺服器的，也可以說是所有伺服器的管理員，這個管理員接收所有的 Request，然後來分配給他下面的員工（伺服器），這樣的行為也可以稱作負載均衡。以作業來說是指 Client 的請求首先到達 Nginx，再由 Nginx 將請求轉發到後端的應用伺服器（如 Express）。
### 6. 提供步驟 9 的 Nginx 設定檔
- 上面已提供
### 7. Security Group 是什麼？用途為何？
- Security Group 是 AWS 的一種Virtual Fire wall，負責控制 EC2 進出流量。可以設定允許哪些 IP、哪些Port 的流量進出 EC2 主機。
### 8. 什麼是 sudo? 為什麼有的時候需要加上 sudo，有時候不用？
- sudo 是用來以系統管理員身份執行命令的工具，某些操作需要系統管理員權限才可以執行。
### 9. Nginx 的 Log 檔案在哪裡？
- Nginx 的 Log 檔案預設位於 `/var/log/nginx/`，可以使用以下指令查看： `sudo tail -f /var/log/nginx/access.log`
- 所以我每當重新載入 http://15.168.177.236 時，log 就會多一筆紀錄，長得像以下內容
    ```bash
    172.226.160.45 - - [12/Oct/2024:14:39:56 +0000] "GET / HTTP/1.1" 200 12 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Safari/605.1.15"
    ```
### 10. 參考資料
- Amazon EC2 Documentation
  - https://docs.aws.amazon.com/ec2/index.html
- Nginx Documentation
  - https://nginx.org/en/docs/
- PM2 Documentation
  - https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/
- DigitalOcean - How to Set Up Nginx as a Reverse Proxy
  - https://ultahost.com/knowledge-base/setup-nginx-reverse-proxy/
