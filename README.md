### About

Приложение для персонального планирования. Поддерживает интеграцию с различными календарями и сторонними планировщиками

### Local dev

```
npm run dev
```

### Codegen

```
npx swagger-typescript-api -p http://25.22.142.249/openapi.json -o ./src/shared/api -n restApi.ts --axios --api-class-name RestApi
```
