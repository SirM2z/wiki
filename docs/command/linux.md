# linux

## `scp` 上传文件

```bash
# 把本地的 source.txt 文件拷贝到 192.168.0.10 机器上的 /home/work 目录下
scp /home/work/source.txt work@192.168.0.10:/home/work/

# 拷贝文件夹，加 -r 参数
scp -r /home/work/sourcedir work@192.168.0.10:/home/work/

# 显示详情，加 -v 参数
scp -r -v /home/work/sourcedirwork@www.myhost.com:/home/work/
```
