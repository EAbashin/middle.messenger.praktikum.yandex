Приложение на Render.com: https://messenger-08me.onrender.com/

<h3 align="center">Запуск:</h3>

- запуск проекта в dev-режиме:

```bash
npm run dev
```

- запуск проекта:

```bash
npm run start
``` 

- запуск сборки проекта:

```bash
npm run build
```

`http://localhost:3000/` - URL localhost


## Sprint_1
1. Создана структура проекта
2. Свёрстан макет из Figma с использованием Handlebars

Макет: https://www.figma.com/file/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0%3A1&t=7dVOjvAXzdC8zK9D-0


## Sprint_2

1. Создана ветка sprint_2.
2. Внедрён TypeScript.
3. Добавлен ESLint и Stylelint.
4. Доделана страница со списком чатов и лентой переписки.
5. Структурирован проект в соответствии с советами по архитектуре.
6. Сделан сбор данных из форм. В console.log выводится объект со всеми заполненными полями формы.
7. Добавлена валидация на все формы.


## Sprint_3

1. Добавлен роутинг в проект

2. Внедрён HTTP API чатов, авторизации и пользователей

3. Подключён WebSocket для работы с real-time сообщениями


## Sprint_4

1. Написаны тесты для роутера (PathRouter), компонента (Block), модуля отправки запросов (Fetch) и стора (Store).

2. Настроен Webpack в проекте, а также loader для работы с TypeScript, SCSS и Handlebars.

3. Настроена Docker-сборка статического приложения.

4. Проект размещён на Render.com с Docker-сборкой. https://messenger-08me.onrender.com/

5. Настроен precommit на проект.

6. Проведён аудит пакетов, они обновлены и приведены в актуальное и безопасное состояние.
