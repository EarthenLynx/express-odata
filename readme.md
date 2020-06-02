# Service to conveniently fetch OData from given service URL

## Naming conventions for variables and methods

> - o => Variable directly related to an OData service
> - m => Variable directly related to OData - metadata
> - f => Variable directly related to local filesystem

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
