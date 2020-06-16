# Service to conveniently fetch OData from given service URL

## Intro

This middleware takes care of handling authorized OData requests with a single system user on the OData Gateway side. It uses the already existing PHP session for authentication and caching of possible request - and response data. As of now, the only data to be transferred are raw OData in JSON format. This might as well be expanded to handle binary data as well, with modules like formidable. 

## Built of the server middleware

![](https://media.prod.mdn.mozit.cloud/attachments/2016/12/06/14456/6a97461a03a5329243b994347c47f12b/MVC%20Express.png)

> The built follows standard separation of routes and controls. Each http request is handled by a specific control
> The models are specific to the frontend and are yet to be implemented on the serverside, as soon as a production database is implemented
> The views are abstracted from the whole project. Any static SPA may be used to fetch the data from the middleware. 

## Naming conventions for variables and methods

- a[VARNAME] => Variable directly related to an admin config file
- o[VARNAME] => Variable directly related to an OData service
- m[VARNAME] => Variable directly related to OData - metadata
- f[VARNAME] => Variable directly related to local filesystem

## Structure of the server directory: 

### Status is only applied to the latest elements
```
|  ⚡ error  |  ✅ implemented  |  🚽 trashed   |  ☕ WIP  |  👀 Needs review              | 
--------------------------------------------------------------------------------------------|
root                            |                                                           |
|- config                       |                                                           |
|  |- axios.config              | Global configuration for the axios http client            |   ✅
|- controller                   |                                                           |
|  |- admin                     | Directory that holds controls for the admin routes        |
|  |  |- logs                   | Admin directory: Get logs                                 |   
|  |  |  |- getCombinedLog      |                                                           |   ✅
|  |  |  |- getErrLog           |                                                           |   🚽
|  |  |- routes                 | Admin directory: CRUD routes                              |   
|  |  |  |- createRoute         |                                                           |   ✅ | 👀
|  |  |  |- deleteRoute         |                                                           |   ✅ | 👀
|  |  |  |- getRoutes           |                                                           |   ✅ | 👀
|  |  |  |- updateRoute         |                                                           |   ✅ | 👀
|  |- file                      | Directory that holds controls for files and binary data.  |   ☕
|  |  |- uploadFile             |                                                           |   ☕
|  |- helpers                   | Reuseable functions for other modules                     |
|  |  |- handleCookies          |                                                           |   ☕
|  |  |- handleOdataException   |                                                           |   ✅
|  |  |- handleOdataResponse    |                                                           |   ✅
|  |  |- handlePhpSession       |                                                           |   ☕
|  |- metadata                  | Directory that holds controllers for the metadata route   |   
|  |  |- getProperties          |                                                           |   👀
|  |- odata                     | Directory that holds controllers for the OData route      |
|  |  |- deleteOData            |                                                           |   ✅
|  |  |- getOData               |                                                           |   ✅
|  |  |- postOData              |                                                           |   ✅
|  |  |- updateOData            |                                                           |   ✅
|- middleware                   | Directory that holds logic for middleware, e.g. logging   |   
|  |- logger                    |                                                           |   ✅
|- routes/api                   | Directory that holds the routes for the http server       |
|  |- admin                     |                                                           |
|  |  |- logs                   |                                                           |   ✅
|  |  |- routes                 |                                                           |   ✅
|  |- metadata                  |                                                           |   ✅
|  |- odata                     |                                                           |   ✅
|- app.js                       | Script that defines the entrypoint                        |   ✅ | 👀
```
