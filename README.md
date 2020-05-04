# BinEco backend

### Доступные команды

-   `npm install` - установить зависимости
-   `npm start` - запустить встроенный сервер и следить за изменениями файлов

---
### Авторизация:
-   POST - запрос на `/api/v1/registration` - создание нового пользователя (регистрация).

    -   Сигнатура запроса: `{ email, firstName, lastName, password }`. Возвращает `Объект пользователя`.

-   POST - запрос на `/api/v1/login` - авторизация после пользователького ввода.

    -   Cигнатура запроса: `{ email, password }`. Возвращает `Объект пользователя`.

#### Объект пользователя:

```
{
    _id: String,
    email: String,
    firstName: String,
    lastName: String,
    password: String,
}
```

---
### Устройства:
-   GET - запрос на `/api/v1/devices` - возвращает все устройства данного пользователя по email.

-   POST - запрос на `/api/v1/devices/create` - создаёт новое устройство, и возвращает `Объект нового устройство`.

    -   Cигнатура запроса: 
    ```
    {
        location: {
            x: Number,
            y: Number,
        },
        fullness: String,
        isActive: Boolean,
        owner: String,
    }
    ```

-   PATCH - запрос на `/api/v1/devices/update` - обновляет данные устройство, и возвращает `Объект обновлённого устройство`.

    -   Cигнатура запроса: 
    ```
    {
        _id: String,
        location: {
            x: Number,
            y: Number,
        },
        fullness: String,
        isActive: Boolean,
        owner: String,
    }
    ```
- DELETE - запрос на `/api/v1/devices/:deviceId` - удаляет устройство, и возвращает `Объект удаленного устройства`