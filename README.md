# Бэкенд дипломной работы

## Адрес сервера
https://api.diploma.hixozen.ru

## Роуты
**Авторизация/Регистрация**
* POST /signin - авторизация 
* POST /signup - регистрация
**Пользователи**
* GET /users/me - получение данных текущего пользователя
* PATCH /users/me - изменение данных текущего пользователя
**Фильмы**
* GET /movies - получить список сохраненных фильмов
* POST /movies - создать сохраненный фильм
* DELETE /movies/:id - удалить фильм

## Директории
`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки
`/middlewares` — промежуточные миддлвейры
`/utils` — вспомогательные файлы, конфиги

## Запуск проекта
`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload

## Ссылка на репозиторий
https://github.com/hixozeN/movies-explorer-api
