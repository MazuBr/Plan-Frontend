### About

https://plan-frontend.onrender.com

Приложение для персонального планирования. Поддерживает интеграцию с различными календарями и сторонними планировщиками

### Local dev

1. Установить зависимости.

```
npm install
```

2. Запустить проект

```
npm run dev
```

---

Если преследует ошибка ERR_CERT_AUTHORITY_INVALID, то можно сделать следующее:

- Запустить браузер в режиме с ограниченной безопасностью (--ignore-certificate-errors)
  или
- Добавить local.matv.planirun в хосты (%SystemRoot%/system32/drivers/etc/hosts, может потребоваться открытие от имени администратора)
- Добавить самоподписный сертификат в доверенные (certmgr.msc -> Доверенные корневые центры сертификации -> Сертификаты -> Действие -> Импорт) и с его помощью поднять дев сервер (vite.config.ts -> server -> https)

### Codegen

1. REST, требует наличие openapi.json в корне проекта

```
npx swagger-typescript-api -p ./openapi.json -o ./src/shared/api -n restApi.ts --axios --api-class-name RestApi
```

2. Graphql, требует наличие schema.json в корне проекта

```
npx graphql-codegen
```
