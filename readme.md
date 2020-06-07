# Service to conveniently fetch OData from given service URL

## Intro

This middleware takes care of handling authorized OData requests with a single system user on the OData Gateway side. It uses the already existing PHP session for authentication and caching of possible request - and response data. As of now, the only data to be transferred are raw OData in JSON format. This might as well be expanded to handle binary data as well, with modules like formidable. 

## Built of the server middleware

The server directory structure is an abbreviation to the modularized concept presented on mdn. The 'views' shown in the graphic will not be integrated, however.

![](https://media.prod.mdn.mozit.cloud/attachments/2016/12/06/14456/6a97461a03a5329243b994347c47f12b/MVC%20Express.png)

### The server uses: 

> Routes to forward the supported requests

## Naming conventions for variables and methods

> - o => Variable directly related to an OData service
> - m => Variable directly related to OData - metadata
> - f => Variable directly related to local filesystem

### Structure of the server directory: 
```
root
|- config
|  |- axios.config.js   | Global configuration for the axios http client
|- controller           | 
|  |- helpers           | Reuseable functions 
|  |- file              | Directory that holds controls for files and binary data.
|  |  |- uploadFile.js  |
|  |- odata             | Directory that holds controllers for the OData route
|  |  |- deleteOData    |
|  |  |- getOData       |
|  |  |- postOData      |
|  |  |- updateOData    |
|- middleware           | Directory that holds logic for middleware, e.g. logging
|  |- logger            |
|- routes               | Directory that holds the routes for the http server
|  |- api               |
|  |  |- odata          |
|- app.js               | Script that defines the entrypoint
```
