# Storefront Backend Project

This is a backend for store front made with node and Typescript

To access it follow the instraction below after the setup there is a guide on how to use it and what the database models are [REQUIREMENT.md](REQUIREMENTS.md)

## .env Setup

Set this values in .env

```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=store_front_dev
POSTGRES_TEST_DB=store_front_test
POSTGRES_USER=store_front_user
POSTGRES_PASSWORD=secret
ENV=dev
TOKEN_SECRET=mySecretKey
SALT=mySaltKey
```

## Database setup

```
$ CREATE DATABASE store_front_dev;
$ CREATE DATABASE store_front_test;
$ CREATE USER store_front_user WITH PASSWORD 'secret';
$ \c store_front_dev
$ GRANT ALL PRIVILEGES ON DATABASE store_front_dev TO store_front_user
$ \c store_front_test
$ GRANT ALL PRIVILEGES ON DATABASE store_front_test TO store_front_user
```

## Setup

To run this project,

```
$ npm install -g db-migrate
$ npm install
$ db-migrate up -e dev
$ npm run watch
```
![image](https://user-images.githubusercontent.com/51024415/213869095-19944286-6a61-4e04-82c2-8bf0274efc1a.png)


## Running Tests

```
$ ENV=test npm run test
```
![image](https://user-images.githubusercontent.com/51024415/213869153-402a80e1-7ea0-441d-810c-83743749d7de.png)
