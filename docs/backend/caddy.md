# Caddy

## 安装

### `Ubuntu` 平台

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

## SystemD Configuration

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

## 部署

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
