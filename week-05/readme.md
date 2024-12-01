# Week-05 作業

## 相關連結
[98.84.175.100](http://98.84.175.100)

[http://www.jeremy900425.me](http://www.jeremy900425.me )

[https://www.jeremy900425.me](https://www.jeremy900425.me ) > 之前因為被課金，有把 EC2 重新架一次但就沒重新做SSL的東西

## 關於「購買網域」以及加上「SSL」的步驟以及遇到的問題

### 1. 購買網域
在 Namecheap 購買網域時，需要進行以下步驟：

1. 註冊並登入 Namecheap(用 github 教育方案可以免費買網域) 帳號。
2. 購買網域名稱 `jeremy900425.me`。
3. 進入 Namecheap 的「Domain List」區域，點擊「Manage」進入網域管理頁面。

### 2. 設定 DNS
#### 設定 A Record
確保網域的 A Record 指向我的伺服器 IP。設定如下：

| Type    | Host  | Value          | TTL   |
| ------- | ----- | -------------- | ----- |
| A Record| @     | 15.168.177.236 | Auto|
| A Record| www   | 15.168.177.236 | Auto|

- `@` 表示根網域 (`jeremy900425.me`)
- `www` 表示帶有 `www` 的子域名 (`www.jeremy900425.me`)

#### 設定完成後
確認 DNS 設定已更新，需要數分鐘到數小時的時間。

### 3. Nginx 配置
#### 基本配置
編輯 Nginx 配置檔案，使其同時支援根網域和帶 `www` 的網域：

```nginx
server {
    listen 80;
    server_name jeremy900425.me www.jeremy900425.me;

    location /.well-known/pki-validation/ {
        alias /var/www/html/.well-known/pki-validation/;
    }

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# 改玩退出並重啟啟動
sudo systemctl reload nginx
```
### 4. 使用 zerossl 驗證 SSL 憑證
當安裝 SSL 時，會要求你驗證擁有權。以下是透過 HTTP 驗證的流程：<br>
這種方式需要你在網頁伺服器上放置一個驗證檔案，讓憑證提供者能夠檢查你對該域名的控制權。
```bash
# 在伺服器上建立對應目錄：
sudo mkdir -p /var/www/html/.well-known/pki-validation

# 上傳驗證檔案：
scp /path/to/your/validation/file.txt /var/www/html/.well-known/pki-validation/
(通常要先 scp 到 EC2 的桌面 然後再使用 mv 的方式轉移資料夾)

# 確認以下兩個 URL 都可以成功訪問：
http://jeremy900425.me/.well-known/pki-validation/validation-file.txt
http://www.jeremy900425.me/.well-known/pki-validation/validation-file.txt
```

### 5. 安裝 SSL 憑證
參考:
https://help.zerossl.com/hc/en-us/articles/360058295894-Installing-SSL-Certificate-on-NGINX

其中關於 Merge .crt Files 我改為以下指令
```bash
cat certificate.crt ca_bundle.crt > full_certificate.crt
mv full_certificate.crt certificate.crt
```

#### 添加 HTTPS 配置
確保在 Nginx 配置文件中設置了針對 https://jeremy900425.me 和 https://www.jeremy900425.me 的伺服器區塊：
```bash
server {
    listen 443 ssl;
    server_name jeremy900425.me www.jeremy900425.me;

    ssl_certificate      /etc/ssl/certificate.crt;
    ssl_certificate_key  /etc/ssl/private/private.key;

    location /.well-known/pki-validation/ {
        alias /var/www/html/.well-known/pki-validation/;
    }

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 6. 改 AWS EC2 的 Inbound Rules  ( 我那時候直接忘記改，試超久== )
點擊 Add rule 按鈕，並按以下配置設置規則：
- Type: HTTPS
- Protocol: TCP
- Port Range: 443
- Source: 0.0.0.0/0（這將允許所有 IP 訪問 443 ）
  
## 回答問題
### 1. 你在哪裡購買網域的 ?
    我在 Namecheap 買的，因為有同學說 github 教育專案有免費網域可以用 ( 但只有.me )
### 2. DNS 的 A Record 是什麼？
    A Record是一種 DNS 記錄類型，用於將網域名稱解析為 IPv4 地址。
    假設網站 IP 是 15.168.177.236，那麼 A Record 可以這樣設定：

    jeremy900425.me       15.168.177.236
    www.jeremy900425.me   15.168.177.236

    當輸入 上述兩個網址時就會自動對應到 15.168.177.236
### 3-1 DNS 的 NS Record 是什麼？
    NS Record 是 DNS 記錄的一種，用於指定哪個 DNS 伺服器是這個網域的權威伺服器。換句話說，它告訴 DNS 應該向哪個伺服器查詢這個網域的其他 DNS 記錄（例如 A Record、CNAME 等）。

    - 為什麼在 Namecheap 上沒有設定 NS Record？
    Namecheap 會自動設置默認的 NS Record。所以說如果沒有更改 NS 設定，網域會自動使用 Namecheap 的名稱伺服器。

### 3-2 所以整個運作流程如下
1. 瀏覽器解析網址並發起請求，瀏覽器會分析這個網址並識別出：

    協定（Protocol）：https，代表需要建立一個安全的連接。

    網域（Domain）：jeremy900425.me，這是需要轉換成 IP 地址的部分。

    路徑（Path）：默認是 /，表示網站的首頁。

2. DNS 解析（將網域轉換成 IP 地址）
   
   - 瀏覽器檢查 DNS 暫存檔案
   - OS的 DNS 暫存
   - 查詢配置的 DNS 伺服器（例如 8.8.8.8）
   - Google DNS 伺服器會首先檢查自己的暫存，看是否有 jeremy900425.me 對應的 IP 地址。但一定沒有，所以會向其他 DNS 查詢
   - Google DNS 會接著向 .me 的 TLD 名稱伺服器發送查詢，請求 jeremy900425.me 的 IP 地址。
   - .me 的 TLD 伺服器會返回管理 jeremy900425.me 的 權威名稱伺服器（NS 記錄） 的地址。
   - Google DNS 知道了 jeremy900425.me 的權威名稱伺服器（這個伺服器通常是由你在 Namecheap 上配置的 DNS 伺服器）。
   - 獲取並返回 IP 地址

### 4.Domain Name vs FQDN vs URL 這三者分別為何？
- Domain Name： 由 DNS 解析成 IP 地址。
  - google.com
  - jeremy900425.me
- FQDN（Fully Qualified Domain Name，完整網域名稱）: 從子域到根域，能夠唯一識別網路上的主機。
  - www.jeremy900425.me.
  - shop.example.com.
- URL: 用來表示網路資源的位置，包含了完整的路徑，包括協議、網域、路徑、查詢參數等。
  - https://www.jeremy900425.me/path/to/page?query=123

域名系統中，有一些常用的術語來描述不同層級的域名，例如根域、頂級域 (TLD)、二級域(SLD)、子域(次級域) 等。
- 根域 (Root Domain)
  - 根域是一個隱藏的“.”（點），通常在瀏覽器中看不到它。

- 頂級域 (Top-Level Domain, TLD)
  - 通用頂級域 (gTLD)：像 .com, .org, .net, .info, .biz 等。
  - 國家代碼頂級域 (ccTLD)：像 .us (美國), .uk (英國), .jp (日本), .tw (台灣) 等。
  - 新頂級域 (new gTLD)：如 .tech, .online, .store 等。

- 二級域 (Second-Level Domain, SLD)
  - 這是在購買網域時通常可以自訂的部分。網站名稱大部分都屬於這一層。
  - example.com 中的 example 是二級域。
  - google.com 中的 google 是二級域。

- 子域 (Subdomain)
  - 子域是二級域名下的擴展，能用來區分不同的服務或網站部分。通過在主域名前加上額外的名稱，可以創建子域。
  - 無需額外購買，只要你擁有主域名，就可以任意創建子域。
  - www.example.com 中的 www 是一個子域，代表網站的主頁面。
  - blog.example.com 中的 blog 是一個子域，通常用來存放部落格。

### 5.為什麼應該要為網站加上憑證？而不是直接用 http 就好？
可以讓網站通過 HTTPS 進行加密傳輸，而不是 HTTP 明文傳輸。所以傳輸過程封包被攔截，駭客也無法知道真正的內容是什麼(因為被加密過)
