#!/bin/sh

# 例1：发布到测试服
# ./deploy.sh build dev

# 例2：发布到正式服
# ./deploy.sh build prod

handle=$1;  #build
env=$2;     #dev/prod

# 远程部署机 webhook
# 如果用远程机器部署的话就要用到以下方法
# preHandle(){
#     git pull orgin master
#     npm config set registry http://registry.npm.taobao.org/
#     npm install
#     npm run build-prod
# }

# 清空dist目录
emptyRemoteDist(){
    if [ $env == "prod" ]
    then
        echo "[exec]remove remote:yourip folder"
        ssh deploy@192.168.1.156:/home/deploy/nmis/prod/nmis-front "rm -rf dist"
    else
        echo "[exec]remove remote:yourip folder"
    fi
}
# 发送文件到正式服
transferFileToProSever(){
    echo "[exec]transfer file to product:yourip sever"
    scp -r dist deploy@192.168.1.156:/home/deploy/nmis/prod/nmis-front
}
# 发送文件到测试服
# transferFileToTestSever(){
#     echo "[exec]transfer file to development::yourip sever"
# }

#执行
if [ $handle == "build" ]
then
    if [ $env == "prod" ]
    then
        env='prod'
        echo "[exec]build ==> build production"
        npm run build
        emptyRemoteDist
        transferFileToProSever
    else
        echo "[exec]build ==> build development"
    fi
fi