# Nginx

## 常用命令

### `Ubuntu` 平台

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

## 常用文件目录

- `/var/www/html` 默认 `Web` 内容目录
- `/etc/nginx` 所有 Nginx 配置文件
- `/etc/nginx/nginx.conf` 主 `Nginx` 配置文件，修改以更改 `Nginx` 全局配置
- `/var/log/nginx/access.log` 所有请求日志文件
- `/var/log/nginx/error.log` 所有错误日志

## 常用配置

### 静态内容服务
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

### 代理端口
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

## 安装

阿里云不用开启 `ufw`，可以用默认防火墙

[安装教程](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-16-04)

若启动不起来，参考如下问题（云服务器提供商做了手脚）
[stackoverflow](https://stackoverflow.com/questions/35868976/nginx-not-started-and-cant-start/40076325)

```bash
sudo fuser -k 80/tcp
sudo fuser -k 443/tcp
sudo service nginx restart
```

## HTTPS

### Let's Encrypt 证书申请

Let's Encrypt 提供了方便的命令行工具 [certbot](https://certbot.eff.org/lets-encrypt/ubuntuxenial-nginx)，`Ubuntu 16.04` 执行命令:

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
