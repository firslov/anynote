# server config

## ubuntu 配置

- 中文源

  ```sh
    sudo vim /etc/apt/sources.list # 配置源
      deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial main restricted universe multiverse
      deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-updates main restricted universe multiverse
      deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-backports main restricted universe multiverse
      deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-security main restricted universe multiverse
    sudo apt-get update # 更新源
    sudo apt-get upgrade # 更新已安装的包
  ```

- 新建用户

  ```sh
    adduser username
    sudo vim /etc/sudoers
      root ALL=(ALL) ALL
      username ALL=(ALL) ALL
  ```

## conda 配置

- 安装

  ```sh
    # 下载
    wget https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/Anaconda3-5.3.1-Linux-x86_64.sh
    # 安装
    bash  Anaconda3-5.3.1-Linux-x86_64.sh
    # vim  ~/.bashrc
    export PATH=/home/***/anaconda3/bin:$PATH
    source ~/.bashrc
    conda -V
  ```

- 中文源

  ```sh
    vim ~/.condarc
      channels:

        - https://mirrors.ustc.edu.cn/anaconda/pkgs/main/
        - https://mirrors.ustc.edu.cn/anaconda/cloud/conda-forge/
        - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
        - defaults

      show_channel_urls: true
  ```

- 虚拟环境

  ```sh
    conda create -n env-name python=3.7
    conda remove -n env-name --all
    conda env list
    conda update conda 更新conda
    conda update --all 更新本地包
    source activate env-name
    source deactivate
    conda install -n env-name package-name
    conda remove -n env-name package-name
  ```

## node 配置

- 安装 node

  ```bash
    curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash - #此处为安装node 8版本
  ```

- 安装 nodejs

  ```bash
    sudo apt-get install -y nodejs
  ```

- 查看版本

  ```sh
    node -v
    npm -v
  ```

## pm2 配置

```sh
  npm install -g pm2 # 安装
  pm2 start app.js / pm2 start app.py -x --interpreter python
  pm2 list
  pm2 start xxx / all / 0
  pm2 reload xxx / all / 0
  pm2 restart xxx / all  / 0
  pm2 stop xxx / all / 0
  pm2 delete xxx / all / 0
```

## nginx 配置

```nginx
  server {
        listen 80;
        server_name firslov.cn;
        location / {
        }
  }
```

```nginx
  upstream nodejs {
        server 127.0.0.1:3000;
        keepalive 64;
  }
  server {
        listen 80;
        server_name chat.firslov.cn;
        location / {
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $http_host;
                proxy_set_header X-Nginx-Proxy true;
                proxy_pass http://nodejs;
        }
  }
```
