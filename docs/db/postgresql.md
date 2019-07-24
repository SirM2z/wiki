# PostgreSQL

## 文档

[PostgreSQL 11 Documentation](https://www.postgresql.org/docs/11/index.html)

## 安装

### `Ubuntu` 平台

安装 `Postgres` 包和一个 `contrib` 包，它可以添加一些额外的实用程序和功能
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
```

切换到 `postgres` 用户

```bash
sudo -i -u postgres
```

修改默认密码

```bash
psql

\password postgres
```

创建数据库

```sql
CREATE DATABASE name;
```

退出 `postgres` 用户

```bash
exit
```
