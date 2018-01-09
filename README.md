# qas_i18n

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

#
```

#接口使用：

## 1、常见问题接口

```
http://localhost:8080/?id=10000&name=xxx&p_name=xxx&game_id=19&acc_name=xxx&version=0.1.0&lang=en 
```
## 2、提交问题接口

```
http://localhost:8080:8080/new_ticket?id=10000&name=xxx&p_name=xxx&game_id=19&acc_name=xxx&version=0.1.0&lang=en 
```
## 3、调查问卷入口

```
http://localhost:8080/rsh?rsh_id=1&name=xxx&game_id=19&lang=en 
```
## 4、参数定义：

```
id: 账号id （必须 )
name: 角色名  
p_name:分区名
game_id: 游戏充值id (必须)
acc_name：账号名
version：客户端版本号
lang：语言 （英文（en），泰文（th）, 默认英文） 
rsh_id: 调研id
```

## 国际化

1、编辑locals下的yml文件
2、发布正式版本：
``` bash
CLI_ENV=production npm run build
```
3、发献上测试版本
``` bash
npm run build
```
4、更新到正式
``` bash
npm run deploy
```
5、更新到测试
``` bash
npm run deploy_test
```




For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
