---
sidebarDepth: 3
sidebar: auto
---

# 服务端

## NestJS

### 流程图

![流程图](https://raw.githubusercontent.com/SirM2z/assets/master/nest-life.jpg)

## Nginx

### 常用命令

`Ubuntu` 平台

```bash
# 检查配置
nginx -t

# 停止
sudo systemctl stop nginx

# 启动
sudo systemctl start nginx

# 重启
sudo systemctl restart nginx

# 仅修改配置，重新加载
sudo systemctl reload nginx

# 服务器引导时自动启动（默认）
sudo systemctl enable nginx

# 关闭 开机启动
sudo systemctl disable nginx
```

### 常用文件目录

- `/var/www/html` 默认 `Web` 内容目录
- `/etc/nginx` 所有 Nginx 配置文件
- `/etc/nginx/nginx.conf` 主 `Nginx` 配置文件，修改以更改 `Nginx` 全局配置
- `/var/log/nginx/access.log` 所有请求日志文件
- `/var/log/nginx/error.log` 所有错误日志

### 常用配置
静态内容服务
```conf
server {
  listen 80;
  server_name www.domain1.com;
  access_log logs/domain1.access.log main;
  location / {
    index index.html;
    root /var/www/domain1.com;
    try_files $uri $uri/ /index.html; # 单页应用
  }
}
```
代理端口
```conf
server {
  listen 80;
  server_name www.domain1.com;
  location / {
    proxy_pass http://localhost:5000;
    proxy_redirect default;
  }
}
```

### 安装

阿里云不用开启 `ufw`，可以用默认防火墙

[安装教程](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-16-04)

若启动不起来，参考如下问题（云服务器提供商做了手脚）
[stackoverflow](https://stackoverflow.com/questions/35868976/nginx-not-started-and-cant-start/40076325)

```bash
sudo fuser -k 80/tcp
sudo fuser -k 443/tcp
sudo service nginx restart
```

### HTTPS

Let's Encrypt 证书申请

Let's Encrypt 提供了方便的命令行工具 [certbot](https://certbot.eff.org/lets-encrypt/ubuntuxenial-nginx)，`Ubuntu 16.04/18.04` 执行命令:

1. 将 `Certbot PPA` 添加到存储库列表
```bash
sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository universe
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
```

2. 安装 `Certbot`
```bash
sudo apt-get install certbot python-certbot-nginx
```

3. `Nginx` 配置好 80 端口网站以及域名 `server_name`，`Certbot` 可以匹配 `Nginx` 配置中的 `server_name`，并自动配置 `SSL`

4. 通过防火墙允许 `HTTPS`（阿里云不用开启，可以用默认防火墙）
```bash
sudo ufw enable
sudo ufw allow 'Nginx Full'
sudo ufw delete allow 'Nginx HTTP'
```

5. 获取 `SSL` 证书
```bash
sudo certbot --nginx -d example.com -d www.example.com
```

6. 验证 `Certbot` 自动续订
```bash
sudo certbot renew --dry-run
```

:::tip
参考[How To Secure Nginx with Let's Encrypt on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04)
:::

## Caddy

### 安装

`Ubuntu` 平台

```bash
curl https://getcaddy.com | bash -s personal
```
安装完成后，我们需要将 `cap_net_bind_servicecapability` 添加到 `Caddy` 二进制文件中。
此功能将允许 `Caddy` 可执行文件绑定到小于 `1024` 的端口。
```bash
sudo setcap cap_net_bind_service=+ep /usr/local/bin/caddy
```

创建存储 `Caddy` 配置文件 `Caddyfile` 和 `SSL` 证书的目录
```bash
sudo mkdir /etc/caddy
sudo chown -R root:www-data /etc/caddy
sudo mkdir /etc/ssl/caddy
sudo chown -R www-data:root /etc/ssl/caddy
sudo chmod 0770 /etc/ssl/caddy
sudo touch /etc/caddy/Caddyfile
sudo mkdir /var/www
sudo chown www-data: /var/www
```

### SystemD Configuration

创建一个新的 `SystemD` 配置脚本

```bash
sudo vim /lib/systemd/system/caddy.service
```
caddy.service
```config
[Unit]
Description=Caddy HTTP/2 web server
Documentation=https://caddyserver.com/docs
After=network-online.target
Wants=network-online.target

[Service]
Restart=on-failure
StartLimitInterval=86400
StartLimitBurst=5

User=www-data
Group=www-data
; Letsencrypt-issued certificates will be written to this directory.
Environment=CADDYPATH=/etc/ssl/caddy

ExecStart=/usr/local/bin/caddy -log stdout -agree=true -conf=/etc/caddy/Caddyfile -root=/var/tmp
ExecReload=/bin/kill -USR1 $MAINPID

LimitNOFILE=1048576
LimitNPROC=64

PrivateTmp=true
PrivateDevices=true
ProtectHome=true
ProtectSystem=full
ReadWriteDirectories=/etc/ssl/caddy

; The following additional security directives only work with systemd v229 or later.
; They further retrict privileges that can be gained by caddy. Uncomment if you like.
; Note that you may have to add capabilities required by any plugins in use.
;CapabilityBoundingSet=CAP_NET_BIND_SERVICE
;AmbientCapabilities=CAP_NET_BIND_SERVICE
;NoNewPrivileges=true
[Install]
WantedBy=multi-user.target
```

启用 `Caddy`
```bash
sudo systemctl enable caddy.service
```

### 部署

1. 新建 `HTML` 文件
    ```bash
    sudo mkdir -p /var/www/blog
    sudo echo "Caddy" > /var/www/blog/index.html
    sudo chown -R www-data: /var/www/blog
    ```
2. 编辑 `Caddyfile`
    ```bash
    sudo vim /etc/caddy/Caddyfile
    ```
    :chestnut: :
    ```config
    www.domain.com {
        root /var/www/blog
    }
    ```
3. 启动 `Caddy`
    ```bash
    sudo systemctl start caddy.service
    ```
