(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{210:function(t,a,s){"use strict";s.r(a);var e=s(0),n=Object(e.a)({},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"服务端"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#服务端","aria-hidden":"true"}},[t._v("#")]),t._v(" 服务端")]),t._v(" "),s("h2",{attrs:{id:"nestjs"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#nestjs","aria-hidden":"true"}},[t._v("#")]),t._v(" NestJS")]),t._v(" "),s("h3",{attrs:{id:"流程图"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#流程图","aria-hidden":"true"}},[t._v("#")]),t._v(" 流程图")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://raw.githubusercontent.com/SirM2z/assets/master/nest-life.jpg",alt:"流程图"}})]),t._v(" "),s("h2",{attrs:{id:"nginx"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#nginx","aria-hidden":"true"}},[t._v("#")]),t._v(" Nginx")]),t._v(" "),s("h3",{attrs:{id:"常用命令"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#常用命令","aria-hidden":"true"}},[t._v("#")]),t._v(" 常用命令")]),t._v(" "),s("p",[s("code",[t._v("Ubuntu")]),t._v(" 平台")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 检查配置")]),t._v("\nnginx -t\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 停止")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" systemctl stop nginx\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 启动")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" systemctl start nginx\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 重启")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" systemctl restart nginx\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 仅修改配置，重新加载")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" systemctl reload nginx\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 服务器引导时自动启动（默认）")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" systemctl "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("enable")]),t._v(" nginx\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 关闭 开机启动")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" systemctl disable nginx\n")])])]),s("h3",{attrs:{id:"常用文件目录"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#常用文件目录","aria-hidden":"true"}},[t._v("#")]),t._v(" 常用文件目录")]),t._v(" "),s("ul",[s("li",[s("code",[t._v("/var/www/html")]),t._v(" 默认 "),s("code",[t._v("Web")]),t._v(" 内容目录")]),t._v(" "),s("li",[s("code",[t._v("/etc/nginx")]),t._v(" 所有 Nginx 配置文件")]),t._v(" "),s("li",[s("code",[t._v("/etc/nginx/nginx.conf")]),t._v(" 主 "),s("code",[t._v("Nginx")]),t._v(" 配置文件，修改以更改 "),s("code",[t._v("Nginx")]),t._v(" 全局配置")]),t._v(" "),s("li",[s("code",[t._v("/var/log/nginx/access.log")]),t._v(" 所有请求日志文件")]),t._v(" "),s("li",[s("code",[t._v("/var/log/nginx/error.log")]),t._v(" 所有错误日志")])]),t._v(" "),s("h3",{attrs:{id:"常用配置"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#常用配置","aria-hidden":"true"}},[t._v("#")]),t._v(" 常用配置")]),t._v(" "),s("p",[t._v("静态内容服务")]),t._v(" "),s("div",{staticClass:"language-conf extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("server {\n  listen 80;\n  server_name www.domain1.com;\n  access_log logs/domain1.access.log main;\n  location / {\n    index index.html;\n    root /var/www/domain1.com;\n    try_files $uri $uri/ /index.html; # 单页应用\n  }\n}\n")])])]),s("p",[t._v("代理端口")]),t._v(" "),s("div",{staticClass:"language-conf extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("server {\n  listen 80;\n  server_name www.domain1.com;\n  location / {\n    proxy_pass http://localhost:5000;\n    proxy_redirect default;\n  }\n}\n")])])]),s("h3",{attrs:{id:"安装"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安装","aria-hidden":"true"}},[t._v("#")]),t._v(" 安装")]),t._v(" "),s("p",[t._v("阿里云不用开启 "),s("code",[t._v("ufw")]),t._v("，可以用默认防火墙")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-16-04",target:"_blank",rel:"noopener noreferrer"}},[t._v("安装教程"),s("OutboundLink")],1)]),t._v(" "),s("p",[t._v("若启动不起来，参考如下问题（云服务器提供商做了手脚）\n"),s("a",{attrs:{href:"https://stackoverflow.com/questions/35868976/nginx-not-started-and-cant-start/40076325",target:"_blank",rel:"noopener noreferrer"}},[t._v("stackoverflow"),s("OutboundLink")],1)]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("fuser")]),t._v(" -k 80/tcp\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("fuser")]),t._v(" -k 443/tcp\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("service")]),t._v(" nginx restart\n")])])]),s("h3",{attrs:{id:"https"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#https","aria-hidden":"true"}},[t._v("#")]),t._v(" HTTPS")]),t._v(" "),s("p",[t._v("Let's Encrypt 证书申请")]),t._v(" "),s("p",[t._v("Let's Encrypt 提供了方便的命令行工具 "),s("a",{attrs:{href:"https://certbot.eff.org/lets-encrypt/ubuntuxenial-nginx",target:"_blank",rel:"noopener noreferrer"}},[t._v("certbot"),s("OutboundLink")],1),t._v("，"),s("code",[t._v("Ubuntu 16.04/18.04")]),t._v(" 执行命令:")]),t._v(" "),s("ol",[s("li",[t._v("将 "),s("code",[t._v("Certbot PPA")]),t._v(" 添加到存储库列表")])]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("apt-get")]),t._v(" update\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("apt-get")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" software-properties-common\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" add-apt-repository universe\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" add-apt-repository ppa:certbot/certbot\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("apt-get")]),t._v(" update\n")])])]),s("ol",{attrs:{start:"2"}},[s("li",[t._v("安装 "),s("code",[t._v("Certbot")])])]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("apt-get")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" certbot python-certbot-nginx\n")])])]),s("ol",{attrs:{start:"3"}},[s("li",[s("p",[s("code",[t._v("Nginx")]),t._v(" 配置好 80 端口网站以及域名 "),s("code",[t._v("server_name")]),t._v("，"),s("code",[t._v("Certbot")]),t._v(" 可以匹配 "),s("code",[t._v("Nginx")]),t._v(" 配置中的 "),s("code",[t._v("server_name")]),t._v("，并自动配置 "),s("code",[t._v("SSL")])])]),t._v(" "),s("li",[s("p",[t._v("通过防火墙允许 "),s("code",[t._v("HTTPS")]),t._v("（阿里云不用开启，可以用默认防火墙）")])])]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" ufw "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("enable")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" ufw allow "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Nginx Full'")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" ufw delete allow "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Nginx HTTP'")]),t._v("\n")])])]),s("ol",{attrs:{start:"5"}},[s("li",[t._v("获取 "),s("code",[t._v("SSL")]),t._v(" 证书")])]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" certbot --nginx -d example.com -d www.example.com\n")])])]),s("ol",{attrs:{start:"6"}},[s("li",[t._v("验证 "),s("code",[t._v("Certbot")]),t._v(" 自动续订")])]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" certbot renew --dry-run\n")])])]),s("div",{staticClass:"tip custom-block"},[s("p",[t._v("参考"),s("a",{attrs:{href:"https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04",target:"_blank",rel:"noopener noreferrer"}},[t._v("How To Secure Nginx with Let's Encrypt on Ubuntu 16.04"),s("OutboundLink")],1)])]),t._v(" "),s("h2",{attrs:{id:"caddy"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#caddy","aria-hidden":"true"}},[t._v("#")]),t._v(" Caddy")]),t._v(" "),s("h3",{attrs:{id:"安装-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安装-2","aria-hidden":"true"}},[t._v("#")]),t._v(" 安装")]),t._v(" "),s("p",[s("code",[t._v("Ubuntu")]),t._v(" 平台")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v(" https://getcaddy.com "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("bash")]),t._v(" -s personal\n")])])]),s("p",[t._v("安装完成后，我们需要将 "),s("code",[t._v("cap_net_bind_servicecapability")]),t._v(" 添加到 "),s("code",[t._v("Caddy")]),t._v(" 二进制文件中。\n此功能将允许 "),s("code",[t._v("Caddy")]),t._v(" 可执行文件绑定到小于 "),s("code",[t._v("1024")]),t._v(" 的端口。")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" setcap cap_net_bind_service"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("+ep /usr/local/bin/caddy\n")])])]),s("p",[t._v("创建存储 "),s("code",[t._v("Caddy")]),t._v(" 配置文件 "),s("code",[t._v("Caddyfile")]),t._v(" 和 "),s("code",[t._v("SSL")]),t._v(" 证书的目录")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("mkdir")]),t._v(" /etc/caddy\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("chown")]),t._v(" -R root:www-data /etc/caddy\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("mkdir")]),t._v(" /etc/ssl/caddy\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("chown")]),t._v(" -R www-data:root /etc/ssl/caddy\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("chmod")]),t._v(" 0770 /etc/ssl/caddy\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("touch")]),t._v(" /etc/caddy/Caddyfile\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("mkdir")]),t._v(" /var/www\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("chown")]),t._v(" www-data: /var/www\n")])])]),s("h3",{attrs:{id:"systemd-configuration"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#systemd-configuration","aria-hidden":"true"}},[t._v("#")]),t._v(" SystemD Configuration")]),t._v(" "),s("p",[t._v("创建一个新的 "),s("code",[t._v("SystemD")]),t._v(" 配置脚本")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("vim")]),t._v(" /lib/systemd/system/caddy.service\n")])])]),s("p",[t._v("caddy.service")]),t._v(" "),s("div",{staticClass:"language-config extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("[Unit]\nDescription=Caddy HTTP/2 web server\nDocumentation=https://caddyserver.com/docs\nAfter=network-online.target\nWants=network-online.target\n\n[Service]\nRestart=on-failure\nStartLimitInterval=86400\nStartLimitBurst=5\n\nUser=www-data\nGroup=www-data\n; Letsencrypt-issued certificates will be written to this directory.\nEnvironment=CADDYPATH=/etc/ssl/caddy\n\nExecStart=/usr/local/bin/caddy -log stdout -agree=true -conf=/etc/caddy/Caddyfile -root=/var/tmp\nExecReload=/bin/kill -USR1 $MAINPID\n\nLimitNOFILE=1048576\nLimitNPROC=64\n\nPrivateTmp=true\nPrivateDevices=true\nProtectHome=true\nProtectSystem=full\nReadWriteDirectories=/etc/ssl/caddy\n\n; The following additional security directives only work with systemd v229 or later.\n; They further retrict privileges that can be gained by caddy. Uncomment if you like.\n; Note that you may have to add capabilities required by any plugins in use.\n;CapabilityBoundingSet=CAP_NET_BIND_SERVICE\n;AmbientCapabilities=CAP_NET_BIND_SERVICE\n;NoNewPrivileges=true\n[Install]\nWantedBy=multi-user.target\n")])])]),s("p",[t._v("启用 "),s("code",[t._v("Caddy")])]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" systemctl "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("enable")]),t._v(" caddy.service\n")])])]),s("h3",{attrs:{id:"部署"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#部署","aria-hidden":"true"}},[t._v("#")]),t._v(" 部署")]),t._v(" "),s("ol",[s("li",[t._v("新建 "),s("code",[t._v("HTML")]),t._v(" 文件"),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("mkdir")]),t._v(" -p /var/www/blog\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("echo")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Caddy"')]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" /var/www/blog/index.html\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("chown")]),t._v(" -R www-data: /var/www/blog\n")])])])]),t._v(" "),s("li",[t._v("编辑 "),s("code",[t._v("Caddyfile")]),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("vim")]),t._v(" /etc/caddy/Caddyfile\n")])])]),t._v("🌰 :"),s("div",{staticClass:"language-config extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("www.domain.com {\n    root /var/www/blog\n}\n")])])])]),t._v(" "),s("li",[t._v("启动 "),s("code",[t._v("Caddy")]),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" systemctl start caddy.service\n")])])])])])])},[],!1,null,null,null);a.default=n.exports}}]);