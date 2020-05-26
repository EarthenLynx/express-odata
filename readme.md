# Express minimal boilerplate

Basically a minimal backbone mongodb - express boilerplate with preconfigured CRUD options. Inspired by the template on MDN.

```sh
$ git clone https://github.com/EarthenLynx/express-minimal.git
```

```sh
$ npm install
```

```sh
$ npm run dev
```

## Routes

### Root: 

> localhost/todo

### get & post

> /

### update

> /update

### delete

> /delete

### Structure of the server: 
```
root
|- config
|- controller
|  |- todo
|  |  |- deleteTodo
|  |  |- getTodo
|  |  |- saveTodo
|  |  |- updateTodo
|  |- upload
|- middleware
|  |- logger
|- models
|  |- todo
|- routes
|  |- api
|  |  |- todo
|- app.js
```
