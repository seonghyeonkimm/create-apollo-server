# `create-apollo-server`

![npm](https://img.shields.io/npm/v/@seonghyeonkimm/create-apollo-server)

create-apollo-server cli to create apollo-server template

## Requirements

* [node](https://github.com/nvm-sh/nvm)
* [pm2](https://pm2.keymetrics.io/)

## Installation

```shellscript
npm i -g @seonghyeonkimm/create-apollo-server

# with yarn
yarn add @seonghyeonkimm/create-apollo-server
```

## How to create your own apollo-server

* You can choose **Mysql** or **Postgresql** as your database
* You can choose [**Prisma**](https://www.prisma.io/docs/) or [**Sequelize**](https://sequelize.org/master/) for your orm

```shellscript
# follow the inquries from cli
create-apollo-server <YOUR_APP_FOLDER_PATH>
```

## How to start development server

```shellscript
# start development server
yarn start
```
