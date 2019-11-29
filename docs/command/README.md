---
sidebarDepth: 3
sidebar: auto
---

# 命令

## PM2
- [官网](http://pm2.keymetrics.io/)
- [GitHub](https://github.com/Unitech/PM2/)
- `yarn global add pm2` 安装
```bash
pm2 list               # 显示所有进程状态
pm2 monit              # 监视所有进程
pm2 logs               # 显示所有进程日志
pm2 stop all           # 停止所有进程
pm2 restart all        # 重启所有进程
pm2 reload all         # 0 秒停机重载进程 (用于 NETWORKED 进程)
pm2 stop 0             # 停止指定的进程
pm2 restart 0          # 重启指定的进程
pm2 startup            # 产生 init 脚本 保持进程活着
pm2 save               # 保存当前应用列表
pm2 web                # 运行健壮的 computer API endpoint (http://localhost:9615)
pm2 delete 0           # 杀死指定的进程
pm2 delete all         # 杀死全部进程
```

## linux

### `cat` 显示文件内容

### `pbcopy(mac)` 将结果输出到剪贴板中
```bash
# 将 home 目录中的文件列表拷贝到系统的剪切板中
ls ~ | pbcopy
# 将文档内容拷贝到系统的剪贴板中
pbcopy < bot.txt
```

### `scp` 上传文件

```bash
# 把本地的 source.txt 文件拷贝到 192.168.0.10 机器上的 /home/work 目录下
scp -P 22 /home/work/source.txt work@192.168.0.10:/home/work/

# 拷贝文件夹，加 -r 参数
scp -P 22 -r /home/work/sourcedir work@192.168.0.10:/home/work/

# 显示详情，加 -v 参数
scp -P 22 -r -v /home/work/sourcedirwork@www.myhost.com:/home/work/
```

### `ssh` 端口修改

```bash
vi /etc/ssh/sshd_config
## content
# Port 22
# Port 60000
####
service ssh restart
```

### `ssh` 走 `socks` 代理

```bash
ssh -o "ProxyCommand nc -X 5 -x 127.0.0.1:1086 %h %p" user@server.net -p 22

#or

vi ~/.ssh/config
# 添加内容
Host www.server.com # 服务器地址
HostName www.server.com
ProxyCommand nc -X 5 -x 127.0.0.1:1086 %h %p # socks5://127.0.0.1:1086
ServerAliveInterval 30
```

### `lsof`

```bash
# 显示开启文件 abc.txt 的进程
lsof abc.txt

# 列出所有的网络连接
lsof -i

# 列出80端口目前打开的文件列表
lsof -i :80

# 列出所有的 TCP 网络连接信息
lsof -i tcp

# 列出80端口 TCP 协议的所有连接信息
lsof -i tcp:80

# 列出所有的 UDP 网络连接信息
lsof -i udp

# 列出以 ngin 开头的进程打开的文件列表
lsof -c ngin

# 列出指定进程打开的文件列表
lsof -p 20711

# 列出指定用户打开的文件列表
lsof -u uasp

# 将所有的TCP网络连接信息和指定用户打开的文件列表信息一起输出
lsof -u uasp -i tcp

# 将指定用户打开的文件列表信息，同时是TCP网络连接信息的一起输出；注意和上一条命令进行对比，-a 意思为 and
lsof -a -u uasp -i tcp

# 列出目录下被进程打开的文件列表
lsof +d /usr/local/

# 递归搜索目录下被进程打开的文件列表
lsof +D /usr/local/

# 列出目前连接到主机 peida.linux 上端口为20，21，22，25，53，80相关的所有文件信息，且每隔3秒不断的执行 lsof 指令
lsof -i @peida.linux:20,21,22,25,53,80 -r 3
```

## git

### 修改上次 commit

```shell
git commit --amend
```

## vim

### 撤销操作

```bash
u # 撤销操作
Ctrl+r # 回复操作
```

### 永久设置行号

```bash
vim ~/.vimrc
```
填写以下内容，保存退出
```file
: set number
```

## nano

```bash
ctrl + o # 保存
enter    # 确认
ctrl + x # 退出
```
