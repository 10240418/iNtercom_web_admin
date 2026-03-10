---
title: intercom
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.30"

---

# intercom

Base URLs:

# Authentication

* API Key (BearerAuth)
  * Parameter Name: **Authorization**, in: header. Enter the token with the `Bearer:` prefix

# 5/30/Admin

## GET 获取管理员列表

GET /admins

分页获取所有管理员用户列表

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer| 否 |页码, 默认为1|
|page_size|query|integer| 否 |每页条数, 默认为10|
|search|query|string| 否 |搜索关键词(用户名、电话等)|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## POST 创建管理员

POST /admins

创建一个新的管理员用户

> Body 请求参数

```json
{
  "email": "admin@example.com",
  "password": "Admin@123",
  "phone": "13800138000",
  "username": "admin123"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[controllers.CreateAdminRequest](#schemacontrollers.createadminrequest)| 否 |none|

> 返回示例

> 201 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Created|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## GET 获取管理员详情

GET /admins/{id}

根据ID获取特定管理员的详细信息

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |管理员ID|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **404**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## PUT 更新管理员

PUT /admins/{id}

更新现有管理员用户的信息

> Body 请求参数

```json
{
  "email": "admin@example.com",
  "password": "NewPassword@123",
  "phone": "13800138000"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |管理员ID|
|body|body|[controllers.UpdateAdminRequest](#schemacontrollers.updateadminrequest)| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **404**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## DELETE 删除管理员

DELETE /admins/{id}

删除指定ID的管理员用户

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |管理员ID|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **404**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

# 5/30/RTC

## POST Start Video Call

POST /api/rtc/call

Initiate a video call between a device and a resident

> Body 请求参数

```json
{
  "device_id": "string",
  "resident_id": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[controllers.CallRequest](#schemacontrollers.callrequest)| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## POST Get RTC Token

POST /api/rtc/token

Get a RTC token for real-time communication

> Body 请求参数

```json
{
  "channel_id": "room123",
  "user_id": "user456"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[controllers.TokenRequest](#schemacontrollers.tokenrequest)| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

# 5/30/Auth

## POST User Login

POST /auth/login

Process user login and return JWT token with different permissions based on user role

> Body 请求参数

```json
{
  "password": "admin123",
  "username": "admin"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[controllers.LoginRequest](#schemacontrollers.loginrequest)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {
    "created_at": "2023-01-01T00:00:00Z",
    "role": "admin",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user_id": 1,
    "username": "admin"
  },
  "message": "Login successful"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success response with token|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **401**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

# 5/30/Building

## GET 获取所有楼号

GET /buildings

获取系统中所有楼号的列表

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer| 否 |页码，默认为1|
|page_size|query|integer| 否 |每页条数，默认为10|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## POST 创建楼号

POST /buildings

创建一个新的楼号

> Body 请求参数

```json
{
  "address": "小区东南角",
  "building_code": "B001",
  "building_name": "1号楼",
  "status": "active"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[controllers.BuildingRequest](#schemacontrollers.buildingrequest)| 否 |none|

> 返回示例

> 201 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Created|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## GET 获取楼号详情

GET /buildings/{id}

根据ID获取楼号详细信息

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |楼号ID|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **404**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## PUT 更新楼号

PUT /buildings/{id}

更新楼号信息

> Body 请求参数

```json
{
  "address": "小区东南角",
  "building_code": "B001",
  "building_name": "1号楼",
  "status": "active"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |楼号ID|
|body|body|[controllers.BuildingRequest](#schemacontrollers.buildingrequest)| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **404**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## DELETE 删除楼号

DELETE /buildings/{id}

删除指定的楼号

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |楼号ID|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **404**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## GET 获取楼号关联的设备

GET /buildings/{id}/devices

获取指定楼号关联的所有设备

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |楼号ID|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **404**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## GET 获取楼号下的户号

GET /buildings/{id}/households

获取指定楼号下的所有户号

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |楼号ID|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **404**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

# 5/30/CallRecord

## GET 获取通话记录列表

GET /call_records

获取系统中所有通话记录，支持分页

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer| 否 |页码，默认为1|
|page_size|query|integer| 否 |每页条数，默认为10|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## GET 获取设备通话记录

GET /call_records/device/{deviceId}

获取特定设备的通话记录，支持分页

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|deviceId|path|integer| 是 |设备ID|
|page|query|integer| 否 |页码，默认为1|
|page_size|query|integer| 否 |每页条数，默认为10|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **404**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## GET 获取居民通话记录

GET /call_records/resident/{residentId}

获取特定居民的通话记录，支持分页

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|residentId|path|integer| 是 |居民ID|
|page|query|integer| 否 |页码，默认为1|
|page_size|query|integer| 否 |每页条数，默认为10|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **404**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## GET 通过CallID获取通话记录

GET /call_records/session

通过CallID（MQTT会话ID）获取特定通话记录的详细信息

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|call_id|query|string| 是 |通话会话ID（UUID）|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **404**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## GET 获取通话统计信息

GET /call_records/statistics

获取通话统计信息，包括总数、已接、未接等

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## GET 获取通话记录详情

GET /call_records/{id}

根据ID获取特定通话记录的详细信息

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |通话记录ID|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **404**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## POST 提交通话反馈

POST /call_records/{id}/feedback

为特定通话记录提交质量反馈

> Body 请求参数

```json
{
  "comment": "通话质量良好，声音清晰",
  "issues": "偶尔有一点延迟",
  "rating": 4
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |通话记录ID|
|body|body|[controllers.CallFeedbackRequest](#schemacontrollers.callfeedbackrequest)| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **404**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

# 5/30/device

## POST 设备健康检测

POST /device/status

设备用于报告在线状态的简单健康检测接口

> Body 请求参数

```json
{
  "device_id": "1"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[controllers.DeviceHealthRequest](#schemacontrollers.devicehealthrequest)| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **404**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## GET 获取所有设备

GET /devices

获取所有设备的列表，支持按楼号筛选

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|building_id|query|integer| 否 |楼号ID|

> 返回示例

> 200 Response

```json
[
  {
    "access_logs": [
      {
        "device": {
          "access_logs": null,
          "building": null,
          "building_id": null,
          "call_records": null,
          "created_at": null,
          "emergency_logs": null,
          "household": null,
          "household_id": null,
          "id": null,
          "location": null,
          "name": null,
          "serial_number": null,
          "staff": null,
          "status": null,
          "updated_at": null
        },
        "device_id": 0,
        "id": 0,
        "method": "remote",
        "resident": {
          "access_logs": [
            {}
          ],
          "call_records": [
            {}
          ],
          "created_at": "string",
          "email": "string",
          "emergency_logs": [
            {}
          ],
          "household": null,
          "household_id": 0,
          "id": 0,
          "name": "string",
          "phone": "string",
          "updated_at": "string"
        },
        "resident_id": 0,
        "result": "success",
        "timestamp": "string"
      }
    ],
    "building": {
      "address": "string",
      "building_code": "string",
      "building_name": "string",
      "created_at": "string",
      "devices": [
        {
          "access_logs": null,
          "building": null,
          "building_id": null,
          "call_records": null,
          "created_at": null,
          "emergency_logs": null,
          "household": null,
          "household_id": null,
          "id": null,
          "location": null,
          "name": null,
          "serial_number": null,
          "staff": null,
          "status": null,
          "updated_at": null
        }
      ],
      "households": [
        {
          "building": null,
          "building_id": null,
          "created_at": null,
          "devices": null,
          "household_number": null,
          "id": null,
          "residents": null,
          "status": null,
          "updated_at": null
        }
      ],
      "id": 0,
      "status": "string",
      "updated_at": "string"
    },
    "building_id": 0,
    "call_records": [
      {
        "call_id": "string",
        "call_status": "answered",
        "created_at": "string",
        "device": {
          "access_logs": null,
          "building": null,
          "building_id": null,
          "call_records": null,
          "created_at": null,
          "emergency_logs": null,
          "household": null,
          "household_id": null,
          "id": null,
          "location": null,
          "name": null,
          "serial_number": null,
          "staff": null,
          "status": null,
          "updated_at": null
        },
        "device_id": 0,
        "duration": 0,
        "id": 0,
        "resident": {
          "access_logs": [
            {}
          ],
          "call_records": [
            {}
          ],
          "created_at": "string",
          "email": "string",
          "emergency_logs": [
            {}
          ],
          "household": null,
          "household_id": 0,
          "id": 0,
          "name": "string",
          "phone": "string",
          "updated_at": "string"
        },
        "resident_id": 0,
        "timestamp": "string",
        "updated_at": "string"
      }
    ],
    "created_at": "string",
    "emergency_logs": [
      {
        "device": {
          "access_logs": null,
          "building": null,
          "building_id": null,
          "call_records": null,
          "created_at": null,
          "emergency_logs": null,
          "household": null,
          "household_id": null,
          "id": null,
          "location": null,
          "name": null,
          "serial_number": null,
          "staff": null,
          "status": null,
          "updated_at": null
        },
        "device_id": 0,
        "id": 0,
        "resident": {
          "access_logs": [
            {}
          ],
          "call_records": [
            {}
          ],
          "created_at": "string",
          "email": "string",
          "emergency_logs": [
            {}
          ],
          "household": null,
          "household_id": 0,
          "id": 0,
          "name": "string",
          "phone": "string",
          "updated_at": "string"
        },
        "resident_id": 0,
        "resolved_at": "string",
        "status": "pending",
        "triggered_at": "string"
      }
    ],
    "household": {
      "building": {},
      "building_id": 0,
      "created_at": "string",
      "devices": [
        {
          "access_logs": null,
          "building": null,
          "building_id": null,
          "call_records": null,
          "created_at": null,
          "emergency_logs": null,
          "household": null,
          "household_id": null,
          "id": null,
          "location": null,
          "name": null,
          "serial_number": null,
          "staff": null,
          "status": null,
          "updated_at": null
        }
      ],
      "household_number": "string",
      "id": 0,
      "residents": [
        {
          "access_logs": null,
          "call_records": null,
          "created_at": null,
          "email": null,
          "emergency_logs": null,
          "household": null,
          "household_id": null,
          "id": null,
          "name": null,
          "phone": null,
          "updated_at": null
        }
      ],
      "status": "string",
      "updated_at": "string"
    },
    "household_id": 0,
    "id": 0,
    "location": "string",
    "name": "string",
    "serial_number": "string",
    "staff": [
      {
        "created_at": "string",
        "devices": [
          {
            "access_logs": [
              null
            ],
            "building": null,
            "building_id": 0,
            "call_records": [
              null
            ],
            "created_at": "string",
            "emergency_logs": [
              null
            ],
            "household": null,
            "household_id": 0,
            "id": 0,
            "location": "string",
            "name": "string",
            "serial_number": "string",
            "staff": [
              null
            ],
            "status": "[",
            "updated_at": "string"
          }
        ],
        "id": 0,
        "phone": "string",
        "position": "string",
        "property_name": "string",
        "remark": "string",
        "role": "string",
        "status": "string",
        "updated_at": "string",
        "username": "string"
      }
    ],
    "status": "online",
    "updated_at": "string"
  }
]
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|*anonymous*|[[models.Device](#schemamodels.device)]|false|none||none|
|» access_logs|[[models.AccessLog](#schemamodels.accesslog)]|false|none||none|
|»» device|[models.Device](#schemamodels.device)|false|none||Relations|
|»»» access_logs|[[models.AccessLog](#schemamodels.accesslog)]|false|none||none|
|»»» building|[models.Building](#schemamodels.building)|false|none||关联的楼号（多对一）|
|»»»» address|string|false|none||楼号地址，如"小区东南角"|
|»»»» building_code|string|false|none||楼号编码，如"B001"|
|»»»» building_name|string|false|none||楼号名称，如"1号楼"|
|»»»» created_at|string|false|none||none|
|»»»» devices|[[models.Device](#schemamodels.device)]|false|none||楼号关联的设备（一对多）|
|»»»»» access_logs|[[models.AccessLog](#schemamodels.accesslog)]|false|none||none|
|»»»»» building|[models.Building](#schemamodels.building)|false|none||关联的楼号（多对一）|
|»»»»»» address|string|false|none||楼号地址，如"小区东南角"|
|»»»»»» building_code|string|false|none||楼号编码，如"B001"|
|»»»»»» building_name|string|false|none||楼号名称，如"1号楼"|
|»»»»»» created_at|string|false|none||none|
|»»»»»» devices|[[models.Device](#schemamodels.device)]|false|none||楼号关联的设备（一对多）|
|»»»»»» households|[[models.Household](#schemamodels.household)]|false|none||关联关系|
|»»»»»»» building|[models.Building](#schemamodels.building)|false|none||Relations - 关联关系|
|»»»»»»»» address|string|false|none||楼号地址，如"小区东南角"|
|»»»»»»»» building_code|string|false|none||楼号编码，如"B001"|
|»»»»»»»» building_name|string|false|none||楼号名称，如"1号楼"|
|»»»»»»»» created_at|string|false|none||none|
|»»»»»»»» devices|[[models.Device](#schemamodels.device)]|false|none||楼号关联的设备（一对多）|
|»»»»»»»» households|[[models.Household](#schemamodels.household)]|false|none||关联关系|
|»»»»»»»» id|integer|false|none||none|
|»»»»»»»» status|string|false|none||状态：active, inactive|
|»»»»»»»» updated_at|string|false|none||none|
|»»»»»»» building_id|integer|false|none||关联的楼号ID|
|»»»»»»» created_at|string|false|none||none|
|»»»»»»» devices|[[models.Device](#schemamodels.device)]|false|none||关联的设备（一对多）|
|»»»»»»»» access_logs|[[models.AccessLog](#schemamodels.accesslog)]|false|none||none|
|»»»»»»»» building|[models.Building](#schemamodels.building)|false|none||关联的楼号（多对一）|
|»»»»»»»»» address|string|false|none||楼号地址，如"小区东南角"|
|»»»»»»»»» building_code|string|false|none||楼号编码，如"B001"|
|»»»»»»»»» building_name|string|false|none||楼号名称，如"1号楼"|
|»»»»»»»»» created_at|string|false|none||none|
|»»»»»»»»» devices|[[models.Device](#schemamodels.device)]|false|none||楼号关联的设备（一对多）|
|»»»»»»»»» households|[[models.Household](#schemamodels.household)]|false|none||关联关系|
|»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»» status|string|false|none||状态：active, inactive|
|»»»»»»»»» updated_at|string|false|none||none|
|»»»»»»»» building_id|integer|false|none||关联的楼号ID|
|»»»»»»»» call_records|[[models.CallRecord](#schemamodels.callrecord)]|false|none||none|
|»»»»»»»»» call_id|string|false|none||通话唯一标识|
|»»»»»»»»» call_status|[models.CallStatus](#schemamodels.callstatus)|false|none||none|
|»»»»»»»»» created_at|string|false|none||none|
|»»»»»»»»» device|[models.Device](#schemamodels.device)|false|none||Relations|
|»»»»»»»»»» access_logs|[[models.AccessLog](#schemamodels.accesslog)]|false|none||none|
|»»»»»»»»»» building|[models.Building](#schemamodels.building)|false|none||关联的楼号（多对一）|
|»»»»»»»»»»» address|string|false|none||楼号地址，如"小区东南角"|
|»»»»»»»»»»» building_code|string|false|none||楼号编码，如"B001"|
|»»»»»»»»»»» building_name|string|false|none||楼号名称，如"1号楼"|
|»»»»»»»»»»» created_at|string|false|none||none|
|»»»»»»»»»»» devices|[[models.Device](#schemamodels.device)]|false|none||楼号关联的设备（一对多）|
|»»»»»»»»»»» households|[[models.Household](#schemamodels.household)]|false|none||关联关系|
|»»»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»»»» status|string|false|none||状态：active, inactive|
|»»»»»»»»»»» updated_at|string|false|none||none|
|»»»»»»»»»» building_id|integer|false|none||关联的楼号ID|
|»»»»»»»»»» call_records|[[models.CallRecord](#schemamodels.callrecord)]|false|none||none|
|»»»»»»»»»» created_at|string|false|none||none|
|»»»»»»»»»» emergency_logs|[[models.EmergencyLog](#schemamodels.emergencylog)]|false|none||none|
|»»»»»»»»»»» device|[models.Device](#schemamodels.device)|false|none||Relations|
|»»»»»»»»»»»» access_logs|[[models.AccessLog](#schemamodels.accesslog)]|false|none||none|
|»»»»»»»»»»»» building|[models.Building](#schemamodels.building)|false|none||关联的楼号（多对一）|
|»»»»»»»»»»»»» address|string|false|none||楼号地址，如"小区东南角"|
|»»»»»»»»»»»»» building_code|string|false|none||楼号编码，如"B001"|
|»»»»»»»»»»»»» building_name|string|false|none||楼号名称，如"1号楼"|
|»»»»»»»»»»»»» created_at|string|false|none||none|
|»»»»»»»»»»»»» devices|[[models.Device](#schemamodels.device)]|false|none||楼号关联的设备（一对多）|
|»»»»»»»»»»»»» households|[[models.Household](#schemamodels.household)]|false|none||关联关系|
|»»»»»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»»»»»» status|string|false|none||状态：active, inactive|
|»»»»»»»»»»»»» updated_at|string|false|none||none|
|»»»»»»»»»»»» building_id|integer|false|none||关联的楼号ID|
|»»»»»»»»»»»» call_records|[[models.CallRecord](#schemamodels.callrecord)]|false|none||none|
|»»»»»»»»»»»» created_at|string|false|none||none|
|»»»»»»»»»»»» emergency_logs|[[models.EmergencyLog](#schemamodels.emergencylog)]|false|none||none|
|»»»»»»»»»»»» household|[models.Household](#schemamodels.household)|false|none||关联的户号（多对一）|
|»»»»»»»»»»»»» building|[models.Building](#schemamodels.building)|false|none||Relations - 关联关系|
|»»»»»»»»»»»»»» address|string|false|none||楼号地址，如"小区东南角"|
|»»»»»»»»»»»»»» building_code|string|false|none||楼号编码，如"B001"|
|»»»»»»»»»»»»»» building_name|string|false|none||楼号名称，如"1号楼"|
|»»»»»»»»»»»»»» created_at|string|false|none||none|
|»»»»»»»»»»»»»» devices|[[models.Device](#schemamodels.device)]|false|none||楼号关联的设备（一对多）|
|»»»»»»»»»»»»»» households|[[models.Household](#schemamodels.household)]|false|none||关联关系|
|»»»»»»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»»»»»»» status|string|false|none||状态：active, inactive|
|»»»»»»»»»»»»»» updated_at|string|false|none||none|
|»»»»»»»»»»»»» building_id|integer|false|none||关联的楼号ID|
|»»»»»»»»»»»»» created_at|string|false|none||none|
|»»»»»»»»»»»»» devices|[[models.Device](#schemamodels.device)]|false|none||关联的设备（一对多）|
|»»»»»»»»»»»»» household_number|string|false|none||户号编号，如"1-1-101"|
|»»»»»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»»»»»» residents|[[models.Resident](#schemamodels.resident)]|false|none||关联的居民（一对多）|
|»»»»»»»»»»»»»» access_logs|[[models.AccessLog](#schemamodels.accesslog)]|false|none||none|
|»»»»»»»»»»»»»»» device|[models.Device](#schemamodels.device)|false|none||Relations|
|»»»»»»»»»»»»»»»» access_logs|[[models.AccessLog](#schemamodels.accesslog)]|false|none||none|
|»»»»»»»»»»»»»»»» building|[models.Building](#schemamodels.building)|false|none||关联的楼号（多对一）|
|»»»»»»»»»»»»»»»»» address|string|false|none||楼号地址，如"小区东南角"|
|»»»»»»»»»»»»»»»»» building_code|string|false|none||楼号编码，如"B001"|
|»»»»»»»»»»»»»»»»» building_name|string|false|none||楼号名称，如"1号楼"|
|»»»»»»»»»»»»»»»»» created_at|string|false|none||none|
|»»»»»»»»»»»»»»»»» devices|[[models.Device](#schemamodels.device)]|false|none||楼号关联的设备（一对多）|
|»»»»»»»»»»»»»»»»» households|[[models.Household](#schemamodels.household)]|false|none||关联关系|
|»»»»»»»»»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»»»»»»»»»» status|string|false|none||状态：active, inactive|
|»»»»»»»»»»»»»»»»» updated_at|string|false|none||none|
|»»»»»»»»»»»»»»»» building_id|integer|false|none||关联的楼号ID|
|»»»»»»»»»»»»»»»» call_records|[[models.CallRecord](#schemamodels.callrecord)]|false|none||none|
|»»»»»»»»»»»»»»»» created_at|string|false|none||none|
|»»»»»»»»»»»»»»»» emergency_logs|[[models.EmergencyLog](#schemamodels.emergencylog)]|false|none||none|
|»»»»»»»»»»»»»»»» household|[models.Household](#schemamodels.household)|false|none||关联的户号（多对一）|
|»»»»»»»»»»»»»»»»» building|[models.Building](#schemamodels.building)|false|none||Relations - 关联关系|
|»»»»»»»»»»»»»»»»»» address|string|false|none||楼号地址，如"小区东南角"|
|»»»»»»»»»»»»»»»»»» building_code|string|false|none||楼号编码，如"B001"|
|»»»»»»»»»»»»»»»»»» building_name|string|false|none||楼号名称，如"1号楼"|
|»»»»»»»»»»»»»»»»»» created_at|string|false|none||none|
|»»»»»»»»»»»»»»»»»» devices|[[models.Device](#schemamodels.device)]|false|none||楼号关联的设备（一对多）|
|»»»»»»»»»»»»»»»»»» households|[[models.Household](#schemamodels.household)]|false|none||关联关系|
|»»»»»»»»»»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»»»»»»»»»»» status|string|false|none||状态：active, inactive|
|»»»»»»»»»»»»»»»»»» updated_at|string|false|none||none|
|»»»»»»»»»»»»»»»»» building_id|integer|false|none||关联的楼号ID|
|»»»»»»»»»»»»»»»»» created_at|string|false|none||none|
|»»»»»»»»»»»»»»»»» devices|[[models.Device](#schemamodels.device)]|false|none||关联的设备（一对多）|
|»»»»»»»»»»»»»»»»» household_number|string|false|none||户号编号，如"1-1-101"|
|»»»»»»»»»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»»»»»»»»»» residents|[[models.Resident](#schemamodels.resident)]|false|none||关联的居民（一对多）|
|»»»»»»»»»»»»»»»»» status|string|false|none||状态：active, inactive|
|»»»»»»»»»»»»»»»»» updated_at|string|false|none||none|
|»»»»»»»»»»»»»»»» household_id|integer|false|none||关联的户号ID|
|»»»»»»»»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»»»»»»»»» location|string|false|none||none|
|»»»»»»»»»»»»»»»» name|string|false|none||none|
|»»»»»»»»»»»»»»»» serial_number|string|false|none||none|
|»»»»»»»»»»»»»»»» staff|[[models.PropertyStaff](#schemamodels.propertystaff)]|false|none||Relations - 关联关系|
|»»»»»»»»»»»»»»»»» created_at|string|false|none||none|
|»»»»»»»»»»»»»»»»» devices|[[models.Device](#schemamodels.device)]|false|none||关联关系 - 使用多对多关系替代直接关联|
|»»»»»»»»»»»»»»»»»» access_logs|[[models.AccessLog](#schemamodels.accesslog)]|false|none||none|
|»»»»»»»»»»»»»»»»»» building|[models.Building](#schemamodels.building)|false|none||关联的楼号（多对一）|
|»»»»»»»»»»»»»»»»»»» address|string|false|none||楼号地址，如"小区东南角"|
|»»»»»»»»»»»»»»»»»»» building_code|string|false|none||楼号编码，如"B001"|
|»»»»»»»»»»»»»»»»»»» building_name|string|false|none||楼号名称，如"1号楼"|
|»»»»»»»»»»»»»»»»»»» created_at|string|false|none||none|
|»»»»»»»»»»»»»»»»»»» devices|[[models.Device](#schemamodels.device)]|false|none||楼号关联的设备（一对多）|
|»»»»»»»»»»»»»»»»»»» households|[[models.Household](#schemamodels.household)]|false|none||关联关系|
|»»»»»»»»»»»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»»»»»»»»»»»» status|string|false|none||状态：active, inactive|
|»»»»»»»»»»»»»»»»»»» updated_at|string|false|none||none|
|»»»»»»»»»»»»»»»»»» building_id|integer|false|none||关联的楼号ID|
|»»»»»»»»»»»»»»»»»» call_records|[[models.CallRecord](#schemamodels.callrecord)]|false|none||none|
|»»»»»»»»»»»»»»»»»» created_at|string|false|none||none|
|»»»»»»»»»»»»»»»»»» emergency_logs|[[models.EmergencyLog](#schemamodels.emergencylog)]|false|none||none|
|»»»»»»»»»»»»»»»»»» household|[models.Household](#schemamodels.household)|false|none||关联的户号（多对一）|
|»»»»»»»»»»»»»»»»»»» building|[models.Building](#schemamodels.building)|false|none||Relations - 关联关系|
|»»»»»»»»»»»»»»»»»»»» address|string|false|none||楼号地址，如"小区东南角"|
|»»»»»»»»»»»»»»»»»»»» building_code|string|false|none||楼号编码，如"B001"|
|»»»»»»»»»»»»»»»»»»»» building_name|string|false|none||楼号名称，如"1号楼"|
|»»»»»»»»»»»»»»»»»»»» created_at|string|false|none||none|
|»»»»»»»»»»»»»»»»»»»» devices|[[models.Device](#schemamodels.device)]|false|none||楼号关联的设备（一对多）|
|»»»»»»»»»»»»»»»»»»»» households|[[models.Household](#schemamodels.household)]|false|none||关联关系|
|»»»»»»»»»»»»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»»»»»»»»»»»»» status|string|false|none||状态：active, inactive|
|»»»»»»»»»»»»»»»»»»»» updated_at|string|false|none||none|
|»»»»»»»»»»»»»»»»»»» building_id|integer|false|none||关联的楼号ID|
|»»»»»»»»»»»»»»»»»»» created_at|string|false|none||none|
|»»»»»»»»»»»»»»»»»»» devices|[[models.Device](#schemamodels.device)]|false|none||关联的设备（一对多）|
|»»»»»»»»»»»»»»»»»»» household_number|string|false|none||户号编号，如"1-1-101"|
|»»»»»»»»»»»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»»»»»»»»»»»» residents|[[models.Resident](#schemamodels.resident)]|false|none||关联的居民（一对多）|
|»»»»»»»»»»»»»»»»»»» status|string|false|none||状态：active, inactive|
|»»»»»»»»»»»»»»»»»»» updated_at|string|false|none||none|
|»»»»»»»»»»»»»»»»»» household_id|integer|false|none||关联的户号ID|
|»»»»»»»»»»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»»»»»»»»»»» location|string|false|none||none|
|»»»»»»»»»»»»»»»»»» name|string|false|none||none|
|»»»»»»»»»»»»»»»»»» serial_number|string|false|none||none|
|»»»»»»»»»»»»»»»»»» staff|[[models.PropertyStaff](#schemamodels.propertystaff)]|false|none||Relations - 关联关系|
|»»»»»»»»»»»»»»»»»» status|[models.DeviceStatus](#schemamodels.devicestatus)|false|none||none|
|»»»»»»»»»»»»»»»»»» updated_at|string|false|none||none|
|»»»»»»»»»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»»»»»»»»»» phone|string|false|none||none|
|»»»»»»»»»»»»»»»»» position|string|false|none||none|
|»»»»»»»»»»»»»»»»» property_name|string|false|none||none|
|»»»»»»»»»»»»»»»»» remark|string|false|none||none|
|»»»»»»»»»»»»»»»»» role|string|false|none||manager, staff, etc.|
|»»»»»»»»»»»»»»»»» status|string|false|none||none|
|»»»»»»»»»»»»»»»»» updated_at|string|false|none||none|
|»»»»»»»»»»»»»»»»» username|string|false|none||none|
|»»»»»»»»»»»»»»»» status|[models.DeviceStatus](#schemamodels.devicestatus)|false|none||none|
|»»»»»»»»»»»»»»»» updated_at|string|false|none||none|
|»»»»»»»»»»»»»»» device_id|integer|false|none||none|
|»»»»»»»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»»»»»»»» method|[models.AccessMethod](#schemamodels.accessmethod)|false|none||none|
|»»»»»»»»»»»»»»» resident|[models.Resident](#schemamodels.resident)|false|none||none|
|»»»»»»»»»»»»»»»» access_logs|[[models.AccessLog](#schemamodels.accesslog)]|false|none||none|
|»»»»»»»»»»»»»»»» call_records|[[models.CallRecord](#schemamodels.callrecord)]|false|none||none|
|»»»»»»»»»»»»»»»»» call_id|string|false|none||通话唯一标识|
|»»»»»»»»»»»»»»»»» call_status|[models.CallStatus](#schemamodels.callstatus)|false|none||none|
|»»»»»»»»»»»»»»»»» created_at|string|false|none||none|
|»»»»»»»»»»»»»»»»» device|[models.Device](#schemamodels.device)|false|none||Relations|
|»»»»»»»»»»»»»»»»»» access_logs|[[models.AccessLog](#schemamodels.accesslog)]|false|none||none|
|»»»»»»»»»»»»»»»»»» building|[models.Building](#schemamodels.building)|false|none||关联的楼号（多对一）|
|»»»»»»»»»»»»»»»»»»» address|string|false|none||楼号地址，如"小区东南角"|
|»»»»»»»»»»»»»»»»»»» building_code|string|false|none||楼号编码，如"B001"|
|»»»»»»»»»»»»»»»»»»» building_name|string|false|none||楼号名称，如"1号楼"|
|»»»»»»»»»»»»»»»»»»» created_at|string|false|none||none|
|»»»»»»»»»»»»»»»»»»» devices|[[models.Device](#schemamodels.device)]|false|none||楼号关联的设备（一对多）|
|»»»»»»»»»»»»»»»»»»» households|[[models.Household](#schemamodels.household)]|false|none||关联关系|
|»»»»»»»»»»»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»»»»»»»»»»»» status|string|false|none||状态：active, inactive|
|»»»»»»»»»»»»»»»»»»» updated_at|string|false|none||none|
|»»»»»»»»»»»»»»»»»» building_id|integer|false|none||关联的楼号ID|
|»»»»»»»»»»»»»»»»»» call_records|[[models.CallRecord](#schemamodels.callrecord)]|false|none||none|
|»»»»»»»»»»»»»»»»»» created_at|string|false|none||none|
|»»»»»»»»»»»»»»»»»» emergency_logs|[[models.EmergencyLog](#schemamodels.emergencylog)]|false|none||none|
|»»»»»»»»»»»»»»»»»» household|[models.Household](#schemamodels.household)|false|none||关联的户号（多对一）|
|»»»»»»»»»»»»»»»»»»» building|[models.Building](#schemamodels.building)|false|none||Relations - 关联关系|
|»»»»»»»»»»»»»»»»»»»» address|string|false|none||楼号地址，如"小区东南角"|
|»»»»»»»»»»»»»»»»»»»» building_code|string|false|none||楼号编码，如"B001"|
|»»»»»»»»»»»»»»»»»»»» building_name|string|false|none||楼号名称，如"1号楼"|
|»»»»»»»»»»»»»»»»»»»» created_at|string|false|none||none|
|»»»»»»»»»»»»»»»»»»»» devices|[[models.Device](#schemamodels.device)]|false|none||楼号关联的设备（一对多）|
|»»»»»»»»»»»»»»»»»»»» households|[[models.Household](#schemamodels.household)]|false|none||关联关系|
|»»»»»»»»»»»»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»»»»»»»»»»»»» status|string|false|none||状态：active, inactive|
|»»»»»»»»»»»»»»»»»»»» updated_at|string|false|none||none|
|»»»»»»»»»»»»»»»»»»» building_id|integer|false|none||关联的楼号ID|
|»»»»»»»»»»»»»»»»»»» created_at|string|false|none||none|
|»»»»»»»»»»»»»»»»»»» devices|[[models.Device](#schemamodels.device)]|false|none||关联的设备（一对多）|
|»»»»»»»»»»»»»»»»»»» household_number|string|false|none||户号编号，如"1-1-101"|
|»»»»»»»»»»»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»»»»»»»»»»»» residents|[[models.Resident](#schemamodels.resident)]|false|none||关联的居民（一对多）|
|»»»»»»»»»»»»»»»»»»» status|string|false|none||状态：active, inactive|
|»»»»»»»»»»»»»»»»»»» updated_at|string|false|none||none|
|»»»»»»»»»»»»»»»»»» household_id|integer|false|none||关联的户号ID|
|»»»»»»»»»»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»»»»»»»»»»» location|string|false|none||none|
|»»»»»»»»»»»»»»»»»» name|string|false|none||none|
|»»»»»»»»»»»»»»»»»» serial_number|string|false|none||none|
|»»»»»»»»»»»»»»»»»» staff|[[models.PropertyStaff](#schemamodels.propertystaff)]|false|none||Relations - 关联关系|
|»»»»»»»»»»»»»»»»»» status|[models.DeviceStatus](#schemamodels.devicestatus)|false|none||none|
|»»»»»»»»»»»»»»»»»» updated_at|string|false|none||none|
|»»»»»»»»»»»»»»»»» device_id|integer|false|none||none|
|»»»»»»»»»»»»»»»»» duration|integer|false|none||通话时长|
|»»»»»»»»»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»»»»»»»»»» resident|[models.Resident](#schemamodels.resident)|false|none||none|
|»»»»»»»»»»»»»»»»»» access_logs|[[models.AccessLog](#schemamodels.accesslog)]|false|none||none|
|»»»»»»»»»»»»»»»»»» call_records|[[models.CallRecord](#schemamodels.callrecord)]|false|none||none|
|»»»»»»»»»»»»»»»»»» created_at|string|false|none||none|
|»»»»»»»»»»»»»»»»»» email|string|false|none||none|
|»»»»»»»»»»»»»»»»»» emergency_logs|[[models.EmergencyLog](#schemamodels.emergencylog)]|false|none||none|
|»»»»»»»»»»»»»»»»»»» device|[models.Device](#schemamodels.device)|false|none||Relations|
|»»»»»»»»»»»»»»»»»»»» access_logs|[[models.AccessLog](#schemamodels.accesslog)]|false|none||none|
|»»»»»»»»»»»»»»»»»»»» building|[models.Building](#schemamodels.building)|false|none||关联的楼号（多对一）|
|»»»»»»»»»»»»»»»»»»»»» address|string|false|none||楼号地址，如"小区东南角"|
|»»»»»»»»»»»»»»»»»»»»» building_code|string|false|none||楼号编码，如"B001"|
|»»»»»»»»»»»»»»»»»»»»» building_name|string|false|none||楼号名称，如"1号楼"|
|»»»»»»»»»»»»»»»»»»»»» created_at|string|false|none||none|
|»»»»»»»»»»»»»»»»»»»»» devices|[[models.Device](#schemamodels.device)]|false|none||楼号关联的设备（一对多）|
|»»»»»»»»»»»»»»»»»»»»» households|[[models.Household](#schemamodels.household)]|false|none||关联关系|
|»»»»»»»»»»»»»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»»»»»»»»»»»»»» status|string|false|none||状态：active, inactive|
|»»»»»»»»»»»»»»»»»»»»» updated_at|string|false|none||none|
|»»»»»»»»»»»»»»»»»»»» building_id|integer|false|none||关联的楼号ID|
|»»»»»»»»»»»»»»»»»»»» call_records|[[models.CallRecord](#schemamodels.callrecord)]|false|none||none|
|»»»»»»»»»»»»»»»»»»»» created_at|string|false|none||none|
|»»»»»»»»»»»»»»»»»»»» emergency_logs|[[models.EmergencyLog](#schemamodels.emergencylog)]|false|none||none|
|»»»»»»»»»»»»»»»»»»»» household|[models.Household](#schemamodels.household)|false|none||关联的户号（多对一）|
|»»»»»»»»»»»»»»»»»»»»» building|[models.Building](#schemamodels.building)|false|none||Relations - 关联关系|
|»»»»»»»»»»»»»»»»»»»»»» address|string|false|none||楼号地址，如"小区东南角"|
|»»»»»»»»»»»»»»»»»»»»»» building_code|string|false|none||楼号编码，如"B001"|
|»»»»»»»»»»»»»»»»»»»»»» building_name|string|false|none||楼号名称，如"1号楼"|
|»»»»»»»»»»»»»»»»»»»»»» created_at|string|false|none||none|
|»»»»»»»»»»»»»»»»»»»»»» devices|[[models.Device](#schemamodels.device)]|false|none||楼号关联的设备（一对多）|
|»»»»»»»»»»»»»»»»»»»»»» households|[[models.Household](#schemamodels.household)]|false|none||关联关系|
|»»»»»»»»»»»»»»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»»»»»»»»»»»»»»» status|string|false|none||状态：active, inactive|
|»»»»»»»»»»»»»»»»»»»»»» updated_at|string|false|none||none|
|»»»»»»»»»»»»»»»»»»»»» building_id|integer|false|none||关联的楼号ID|
|»»»»»»»»»»»»»»»»»»»»» created_at|string|false|none||none|
|»»»»»»»»»»»»»»»»»»»»» devices|[[models.Device](#schemamodels.device)]|false|none||关联的设备（一对多）|
|»»»»»»»»»»»»»»»»»»»»» household_number|string|false|none||户号编号，如"1-1-101"|
|»»»»»»»»»»»»»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»»»»»»»»»»»»»» residents|[[models.Resident](#schemamodels.resident)]|false|none||关联的居民（一对多）|
|»»»»»»»»»»»»»»»»»»»»» status|string|false|none||状态：active, inactive|
|»»»»»»»»»»»»»»»»»»»»» updated_at|string|false|none||none|
|»»»»»»»»»»»»»»»»»»»» household_id|integer|false|none||关联的户号ID|
|»»»»»»»»»»»»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»»»»»»»»»»»»» location|string|false|none||none|
|»»»»»»»»»»»»»»»»»»»» name|string|false|none||none|
|»»»»»»»»»»»»»»»»»»»» serial_number|string|false|none||none|
|»»»»»»»»»»»»»»»»»»»» staff|[[models.PropertyStaff](#schemamodels.propertystaff)]|false|none||Relations - 关联关系|
|»»»»»»»»»»»»»»»»»»»» status|[models.DeviceStatus](#schemamodels.devicestatus)|false|none||none|
|»»»»»»»»»»»»»»»»»»»» updated_at|string|false|none||none|
|»»»»»»»»»»»»»»»»»»» device_id|integer|false|none||none|
|»»»»»»»»»»»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»»»»»»»»»»»» resident|[models.Resident](#schemamodels.resident)|false|none||none|
|»»»»»»»»»»»»»»»»»»»» access_logs|[[models.AccessLog](#schemamodels.accesslog)]|false|none||none|
|»»»»»»»»»»»»»»»»»»»» call_records|[[models.CallRecord](#schemamodels.callrecord)]|false|none||none|
|»»»»»»»»»»»»»»»»»»»» created_at|string|false|none||none|
|»»»»»»»»»»»»»»»»»»»» email|string|false|none||none|
|»»»»»»»»»»»»»»»»»»»» emergency_logs|[[models.EmergencyLog](#schemamodels.emergencylog)]|false|none||none|
|»»»»»»»»»»»»»»»»»»»» household|[models.Household](#schemamodels.household)|false|none||Relations|
|»»»»»»»»»»»»»»»»»»»»» building|[models.Building](#schemamodels.building)|false|none||Relations - 关联关系|
|»»»»»»»»»»»»»»»»»»»»»» address|string|false|none||楼号地址，如"小区东南角"|
|»»»»»»»»»»»»»»»»»»»»»» building_code|string|false|none||楼号编码，如"B001"|
|»»»»»»»»»»»»»»»»»»»»»» building_name|string|false|none||楼号名称，如"1号楼"|
|»»»»»»»»»»»»»»»»»»»»»» created_at|string|false|none||none|
|»»»»»»»»»»»»»»»»»»»»»» devices|[[models.Device](#schemamodels.device)]|false|none||楼号关联的设备（一对多）|
|»»»»»»»»»»»»»»»»»»»»»» households|[[models.Household](#schemamodels.household)]|false|none||关联关系|
|»»»»»»»»»»»»»»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»»»»»»»»»»»»»»» status|string|false|none||状态：active, inactive|
|»»»»»»»»»»»»»»»»»»»»»» updated_at|string|false|none||none|
|»»»»»»»»»»»»»»»»»»»»» building_id|integer|false|none||关联的楼号ID|
|»»»»»»»»»»»»»»»»»»»»» created_at|string|false|none||none|
|»»»»»»»»»»»»»»»»»»»»» devices|[[models.Device](#schemamodels.device)]|false|none||关联的设备（一对多）|
|»»»»»»»»»»»»»»»»»»»»» household_number|string|false|none||户号编号，如"1-1-101"|
|»»»»»»»»»»»»»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»»»»»»»»»»»»»» residents|[[models.Resident](#schemamodels.resident)]|false|none||关联的居民（一对多）|
|»»»»»»»»»»»»»»»»»»»»» status|string|false|none||状态：active, inactive|
|»»»»»»»»»»»»»»»»»»»»» updated_at|string|false|none||none|
|»»»»»»»»»»»»»»»»»»»» household_id|integer|false|none||关联的户号ID|
|»»»»»»»»»»»»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»»»»»»»»»»»»» name|string|false|none||none|
|»»»»»»»»»»»»»»»»»»»» phone|string|false|none||none|
|»»»»»»»»»»»»»»»»»»»» updated_at|string|false|none||none|
|»»»»»»»»»»»»»»»»»»» resident_id|integer|false|none||none|
|»»»»»»»»»»»»»»»»»»» resolved_at|string|false|none||可空字段|
|»»»»»»»»»»»»»»»»»»» status|[models.EmergencyStatus](#schemamodels.emergencystatus)|false|none||none|
|»»»»»»»»»»»»»»»»»»» triggered_at|string|false|none||none|
|»»»»»»»»»»»»»»»»»» household|[models.Household](#schemamodels.household)|false|none||Relations|
|»»»»»»»»»»»»»»»»»»» building|[models.Building](#schemamodels.building)|false|none||Relations - 关联关系|
|»»»»»»»»»»»»»»»»»»»» address|string|false|none||楼号地址，如"小区东南角"|
|»»»»»»»»»»»»»»»»»»»» building_code|string|false|none||楼号编码，如"B001"|
|»»»»»»»»»»»»»»»»»»»» building_name|string|false|none||楼号名称，如"1号楼"|
|»»»»»»»»»»»»»»»»»»»» created_at|string|false|none||none|
|»»»»»»»»»»»»»»»»»»»» devices|[[models.Device](#schemamodels.device)]|false|none||楼号关联的设备（一对多）|
|»»»»»»»»»»»»»»»»»»»» households|[[models.Household](#schemamodels.household)]|false|none||关联关系|
|»»»»»»»»»»»»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»»»»»»»»»»»»» status|string|false|none||状态：active, inactive|
|»»»»»»»»»»»»»»»»»»»» updated_at|string|false|none||none|
|»»»»»»»»»»»»»»»»»»» building_id|integer|false|none||关联的楼号ID|
|»»»»»»»»»»»»»»»»»»» created_at|string|false|none||none|
|»»»»»»»»»»»»»»»»»»» devices|[[models.Device](#schemamodels.device)]|false|none||关联的设备（一对多）|
|»»»»»»»»»»»»»»»»»»» household_number|string|false|none||户号编号，如"1-1-101"|
|»»»»»»»»»»»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»»»»»»»»»»»» residents|[[models.Resident](#schemamodels.resident)]|false|none||关联的居民（一对多）|
|»»»»»»»»»»»»»»»»»»» status|string|false|none||状态：active, inactive|
|»»»»»»»»»»»»»»»»»»» updated_at|string|false|none||none|
|»»»»»»»»»»»»»»»»»» household_id|integer|false|none||关联的户号ID|
|»»»»»»»»»»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»»»»»»»»»»» name|string|false|none||none|
|»»»»»»»»»»»»»»»»»» phone|string|false|none||none|
|»»»»»»»»»»»»»»»»»» updated_at|string|false|none||none|
|»»»»»»»»»»»»»»»»» resident_id|integer|false|none||none|
|»»»»»»»»»»»»»»»»» timestamp|string|false|none||通话开始时间|
|»»»»»»»»»»»»»»»»» updated_at|string|false|none||none|
|»»»»»»»»»»»»»»»» created_at|string|false|none||none|
|»»»»»»»»»»»»»»»» email|string|false|none||none|
|»»»»»»»»»»»»»»»» emergency_logs|[[models.EmergencyLog](#schemamodels.emergencylog)]|false|none||none|
|»»»»»»»»»»»»»»»» household|[models.Household](#schemamodels.household)|false|none||Relations|
|»»»»»»»»»»»»»»»»» building|[models.Building](#schemamodels.building)|false|none||Relations - 关联关系|
|»»»»»»»»»»»»»»»»»» address|string|false|none||楼号地址，如"小区东南角"|
|»»»»»»»»»»»»»»»»»» building_code|string|false|none||楼号编码，如"B001"|
|»»»»»»»»»»»»»»»»»» building_name|string|false|none||楼号名称，如"1号楼"|
|»»»»»»»»»»»»»»»»»» created_at|string|false|none||none|
|»»»»»»»»»»»»»»»»»» devices|[[models.Device](#schemamodels.device)]|false|none||楼号关联的设备（一对多）|
|»»»»»»»»»»»»»»»»»» households|[[models.Household](#schemamodels.household)]|false|none||关联关系|
|»»»»»»»»»»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»»»»»»»»»»» status|string|false|none||状态：active, inactive|
|»»»»»»»»»»»»»»»»»» updated_at|string|false|none||none|
|»»»»»»»»»»»»»»»»» building_id|integer|false|none||关联的楼号ID|
|»»»»»»»»»»»»»»»»» created_at|string|false|none||none|
|»»»»»»»»»»»»»»»»» devices|[[models.Device](#schemamodels.device)]|false|none||关联的设备（一对多）|
|»»»»»»»»»»»»»»»»» household_number|string|false|none||户号编号，如"1-1-101"|
|»»»»»»»»»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»»»»»»»»»» residents|[[models.Resident](#schemamodels.resident)]|false|none||关联的居民（一对多）|
|»»»»»»»»»»»»»»»»» status|string|false|none||状态：active, inactive|
|»»»»»»»»»»»»»»»»» updated_at|string|false|none||none|
|»»»»»»»»»»»»»»»» household_id|integer|false|none||关联的户号ID|
|»»»»»»»»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»»»»»»»»» name|string|false|none||none|
|»»»»»»»»»»»»»»»» phone|string|false|none||none|
|»»»»»»»»»»»»»»»» updated_at|string|false|none||none|
|»»»»»»»»»»»»»»» resident_id|integer|false|none||none|
|»»»»»»»»»»»»»»» result|[models.AccessResult](#schemamodels.accessresult)|false|none||none|
|»»»»»»»»»»»»»»» timestamp|string|false|none||none|
|»»»»»»»»»»»»»» call_records|[[models.CallRecord](#schemamodels.callrecord)]|false|none||none|
|»»»»»»»»»»»»»» created_at|string|false|none||none|
|»»»»»»»»»»»»»» email|string|false|none||none|
|»»»»»»»»»»»»»» emergency_logs|[[models.EmergencyLog](#schemamodels.emergencylog)]|false|none||none|
|»»»»»»»»»»»»»» household|[models.Household](#schemamodels.household)|false|none||Relations|
|»»»»»»»»»»»»»»» building|[models.Building](#schemamodels.building)|false|none||Relations - 关联关系|
|»»»»»»»»»»»»»»»» address|string|false|none||楼号地址，如"小区东南角"|
|»»»»»»»»»»»»»»»» building_code|string|false|none||楼号编码，如"B001"|
|»»»»»»»»»»»»»»»» building_name|string|false|none||楼号名称，如"1号楼"|
|»»»»»»»»»»»»»»»» created_at|string|false|none||none|
|»»»»»»»»»»»»»»»» devices|[[models.Device](#schemamodels.device)]|false|none||楼号关联的设备（一对多）|
|»»»»»»»»»»»»»»»» households|[[models.Household](#schemamodels.household)]|false|none||关联关系|
|»»»»»»»»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»»»»»»»»» status|string|false|none||状态：active, inactive|
|»»»»»»»»»»»»»»»» updated_at|string|false|none||none|
|»»»»»»»»»»»»»»» building_id|integer|false|none||关联的楼号ID|
|»»»»»»»»»»»»»»» created_at|string|false|none||none|
|»»»»»»»»»»»»»»» devices|[[models.Device](#schemamodels.device)]|false|none||关联的设备（一对多）|
|»»»»»»»»»»»»»»» household_number|string|false|none||户号编号，如"1-1-101"|
|»»»»»»»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»»»»»»»» residents|[[models.Resident](#schemamodels.resident)]|false|none||关联的居民（一对多）|
|»»»»»»»»»»»»»»» status|string|false|none||状态：active, inactive|
|»»»»»»»»»»»»»»» updated_at|string|false|none||none|
|»»»»»»»»»»»»»» household_id|integer|false|none||关联的户号ID|
|»»»»»»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»»»»»»» name|string|false|none||none|
|»»»»»»»»»»»»»» phone|string|false|none||none|
|»»»»»»»»»»»»»» updated_at|string|false|none||none|
|»»»»»»»»»»»»» status|string|false|none||状态：active, inactive|
|»»»»»»»»»»»»» updated_at|string|false|none||none|
|»»»»»»»»»»»» household_id|integer|false|none||关联的户号ID|
|»»»»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»»»»» location|string|false|none||none|
|»»»»»»»»»»»» name|string|false|none||none|
|»»»»»»»»»»»» serial_number|string|false|none||none|
|»»»»»»»»»»»» staff|[[models.PropertyStaff](#schemamodels.propertystaff)]|false|none||Relations - 关联关系|
|»»»»»»»»»»»» status|[models.DeviceStatus](#schemamodels.devicestatus)|false|none||none|
|»»»»»»»»»»»» updated_at|string|false|none||none|
|»»»»»»»»»»» device_id|integer|false|none||none|
|»»»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»»»» resident|[models.Resident](#schemamodels.resident)|false|none||none|
|»»»»»»»»»»» resident_id|integer|false|none||none|
|»»»»»»»»»»» resolved_at|string|false|none||可空字段|
|»»»»»»»»»»» status|[models.EmergencyStatus](#schemamodels.emergencystatus)|false|none||none|
|»»»»»»»»»»» triggered_at|string|false|none||none|
|»»»»»»»»»» household|[models.Household](#schemamodels.household)|false|none||关联的户号（多对一）|
|»»»»»»»»»»» building|[models.Building](#schemamodels.building)|false|none||Relations - 关联关系|
|»»»»»»»»»»»» address|string|false|none||楼号地址，如"小区东南角"|
|»»»»»»»»»»»» building_code|string|false|none||楼号编码，如"B001"|
|»»»»»»»»»»»» building_name|string|false|none||楼号名称，如"1号楼"|
|»»»»»»»»»»»» created_at|string|false|none||none|
|»»»»»»»»»»»» devices|[[models.Device](#schemamodels.device)]|false|none||楼号关联的设备（一对多）|
|»»»»»»»»»»»» households|[[models.Household](#schemamodels.household)]|false|none||关联关系|
|»»»»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»»»»» status|string|false|none||状态：active, inactive|
|»»»»»»»»»»»» updated_at|string|false|none||none|
|»»»»»»»»»»» building_id|integer|false|none||关联的楼号ID|
|»»»»»»»»»»» created_at|string|false|none||none|
|»»»»»»»»»»» devices|[[models.Device](#schemamodels.device)]|false|none||关联的设备（一对多）|
|»»»»»»»»»»» household_number|string|false|none||户号编号，如"1-1-101"|
|»»»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»»»» residents|[[models.Resident](#schemamodels.resident)]|false|none||关联的居民（一对多）|
|»»»»»»»»»»» status|string|false|none||状态：active, inactive|
|»»»»»»»»»»» updated_at|string|false|none||none|
|»»»»»»»»»» household_id|integer|false|none||关联的户号ID|
|»»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»»» location|string|false|none||none|
|»»»»»»»»»» name|string|false|none||none|
|»»»»»»»»»» serial_number|string|false|none||none|
|»»»»»»»»»» staff|[[models.PropertyStaff](#schemamodels.propertystaff)]|false|none||Relations - 关联关系|
|»»»»»»»»»» status|[models.DeviceStatus](#schemamodels.devicestatus)|false|none||none|
|»»»»»»»»»» updated_at|string|false|none||none|
|»»»»»»»»» device_id|integer|false|none||none|
|»»»»»»»»» duration|integer|false|none||通话时长|
|»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»» resident|[models.Resident](#schemamodels.resident)|false|none||none|
|»»»»»»»»» resident_id|integer|false|none||none|
|»»»»»»»»» timestamp|string|false|none||通话开始时间|
|»»»»»»»»» updated_at|string|false|none||none|
|»»»»»»»» created_at|string|false|none||none|
|»»»»»»»» emergency_logs|[[models.EmergencyLog](#schemamodels.emergencylog)]|false|none||none|
|»»»»»»»» household|[models.Household](#schemamodels.household)|false|none||关联的户号（多对一）|
|»»»»»»»»» building|[models.Building](#schemamodels.building)|false|none||Relations - 关联关系|
|»»»»»»»»»» address|string|false|none||楼号地址，如"小区东南角"|
|»»»»»»»»»» building_code|string|false|none||楼号编码，如"B001"|
|»»»»»»»»»» building_name|string|false|none||楼号名称，如"1号楼"|
|»»»»»»»»»» created_at|string|false|none||none|
|»»»»»»»»»» devices|[[models.Device](#schemamodels.device)]|false|none||楼号关联的设备（一对多）|
|»»»»»»»»»» households|[[models.Household](#schemamodels.household)]|false|none||关联关系|
|»»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»»» status|string|false|none||状态：active, inactive|
|»»»»»»»»»» updated_at|string|false|none||none|
|»»»»»»»»» building_id|integer|false|none||关联的楼号ID|
|»»»»»»»»» created_at|string|false|none||none|
|»»»»»»»»» devices|[[models.Device](#schemamodels.device)]|false|none||关联的设备（一对多）|
|»»»»»»»»» household_number|string|false|none||户号编号，如"1-1-101"|
|»»»»»»»»» id|integer|false|none||none|
|»»»»»»»»» residents|[[models.Resident](#schemamodels.resident)]|false|none||关联的居民（一对多）|
|»»»»»»»»» status|string|false|none||状态：active, inactive|
|»»»»»»»»» updated_at|string|false|none||none|
|»»»»»»»» household_id|integer|false|none||关联的户号ID|
|»»»»»»»» id|integer|false|none||none|
|»»»»»»»» location|string|false|none||none|
|»»»»»»»» name|string|false|none||none|
|»»»»»»»» serial_number|string|false|none||none|
|»»»»»»»» staff|[[models.PropertyStaff](#schemamodels.propertystaff)]|false|none||Relations - 关联关系|
|»»»»»»»» status|[models.DeviceStatus](#schemamodels.devicestatus)|false|none||none|
|»»»»»»»» updated_at|string|false|none||none|
|»»»»»»» household_number|string|false|none||户号编号，如"1-1-101"|
|»»»»»»» id|integer|false|none||none|
|»»»»»»» residents|[[models.Resident](#schemamodels.resident)]|false|none||关联的居民（一对多）|
|»»»»»»» status|string|false|none||状态：active, inactive|
|»»»»»»» updated_at|string|false|none||none|
|»»»»»» id|integer|false|none||none|
|»»»»»» status|string|false|none||状态：active, inactive|
|»»»»»» updated_at|string|false|none||none|
|»»»»» building_id|integer|false|none||关联的楼号ID|
|»»»»» call_records|[[models.CallRecord](#schemamodels.callrecord)]|false|none||none|
|»»»»» created_at|string|false|none||none|
|»»»»» emergency_logs|[[models.EmergencyLog](#schemamodels.emergencylog)]|false|none||none|
|»»»»» household|[models.Household](#schemamodels.household)|false|none||关联的户号（多对一）|
|»»»»»» building|[models.Building](#schemamodels.building)|false|none||Relations - 关联关系|
|»»»»»»» address|string|false|none||楼号地址，如"小区东南角"|
|»»»»»»» building_code|string|false|none||楼号编码，如"B001"|
|»»»»»»» building_name|string|false|none||楼号名称，如"1号楼"|
|»»»»»»» created_at|string|false|none||none|
|»»»»»»» devices|[[models.Device](#schemamodels.device)]|false|none||楼号关联的设备（一对多）|
|»»»»»»» households|[[models.Household](#schemamodels.household)]|false|none||关联关系|
|»»»»»»» id|integer|false|none||none|
|»»»»»»» status|string|false|none||状态：active, inactive|
|»»»»»»» updated_at|string|false|none||none|
|»»»»»» building_id|integer|false|none||关联的楼号ID|
|»»»»»» created_at|string|false|none||none|
|»»»»»» devices|[[models.Device](#schemamodels.device)]|false|none||关联的设备（一对多）|
|»»»»»» household_number|string|false|none||户号编号，如"1-1-101"|
|»»»»»» id|integer|false|none||none|
|»»»»»» residents|[[models.Resident](#schemamodels.resident)]|false|none||关联的居民（一对多）|
|»»»»»» status|string|false|none||状态：active, inactive|
|»»»»»» updated_at|string|false|none||none|
|»»»»» household_id|integer|false|none||关联的户号ID|
|»»»»» id|integer|false|none||none|
|»»»»» location|string|false|none||none|
|»»»»» name|string|false|none||none|
|»»»»» serial_number|string|false|none||none|
|»»»»» staff|[[models.PropertyStaff](#schemamodels.propertystaff)]|false|none||Relations - 关联关系|
|»»»»» status|[models.DeviceStatus](#schemamodels.devicestatus)|false|none||none|
|»»»»» updated_at|string|false|none||none|
|»»»» households|[[models.Household](#schemamodels.household)]|false|none||关联关系|
|»»»» id|integer|false|none||none|
|»»»» status|string|false|none||状态：active, inactive|
|»»»» updated_at|string|false|none||none|
|»»» building_id|integer|false|none||关联的楼号ID|
|»»» call_records|[[models.CallRecord](#schemamodels.callrecord)]|false|none||none|
|»»» created_at|string|false|none||none|
|»»» emergency_logs|[[models.EmergencyLog](#schemamodels.emergencylog)]|false|none||none|
|»»» household|[models.Household](#schemamodels.household)|false|none||关联的户号（多对一）|
|»»»» building|[models.Building](#schemamodels.building)|false|none||Relations - 关联关系|
|»»»»» address|string|false|none||楼号地址，如"小区东南角"|
|»»»»» building_code|string|false|none||楼号编码，如"B001"|
|»»»»» building_name|string|false|none||楼号名称，如"1号楼"|
|»»»»» created_at|string|false|none||none|
|»»»»» devices|[[models.Device](#schemamodels.device)]|false|none||楼号关联的设备（一对多）|
|»»»»» households|[[models.Household](#schemamodels.household)]|false|none||关联关系|
|»»»»» id|integer|false|none||none|
|»»»»» status|string|false|none||状态：active, inactive|
|»»»»» updated_at|string|false|none||none|
|»»»» building_id|integer|false|none||关联的楼号ID|
|»»»» created_at|string|false|none||none|
|»»»» devices|[[models.Device](#schemamodels.device)]|false|none||关联的设备（一对多）|
|»»»» household_number|string|false|none||户号编号，如"1-1-101"|
|»»»» id|integer|false|none||none|
|»»»» residents|[[models.Resident](#schemamodels.resident)]|false|none||关联的居民（一对多）|
|»»»» status|string|false|none||状态：active, inactive|
|»»»» updated_at|string|false|none||none|
|»»» household_id|integer|false|none||关联的户号ID|
|»»» id|integer|false|none||none|
|»»» location|string|false|none||none|
|»»» name|string|false|none||none|
|»»» serial_number|string|false|none||none|
|»»» staff|[[models.PropertyStaff](#schemamodels.propertystaff)]|false|none||Relations - 关联关系|
|»»» status|[models.DeviceStatus](#schemamodels.devicestatus)|false|none||none|
|»»» updated_at|string|false|none||none|
|»» device_id|integer|false|none||none|
|»» id|integer|false|none||none|
|»» method|[models.AccessMethod](#schemamodels.accessmethod)|false|none||none|
|»» resident|[models.Resident](#schemamodels.resident)|false|none||none|
|»» resident_id|integer|false|none||none|
|»» result|[models.AccessResult](#schemamodels.accessresult)|false|none||none|
|»» timestamp|string|false|none||none|
|» building|[models.Building](#schemamodels.building)|false|none||关联的楼号（多对一）|
|»» address|string|false|none||楼号地址，如"小区东南角"|
|»» building_code|string|false|none||楼号编码，如"B001"|
|»» building_name|string|false|none||楼号名称，如"1号楼"|
|»» created_at|string|false|none||none|
|»» devices|[[models.Device](#schemamodels.device)]|false|none||楼号关联的设备（一对多）|
|»» households|[[models.Household](#schemamodels.household)]|false|none||关联关系|
|»» id|integer|false|none||none|
|»» status|string|false|none||状态：active, inactive|
|»» updated_at|string|false|none||none|
|» building_id|integer|false|none||关联的楼号ID|
|» call_records|[[models.CallRecord](#schemamodels.callrecord)]|false|none||none|
|» created_at|string|false|none||none|
|» emergency_logs|[[models.EmergencyLog](#schemamodels.emergencylog)]|false|none||none|
|» household|[models.Household](#schemamodels.household)|false|none||关联的户号（多对一）|
|»» building|[models.Building](#schemamodels.building)|false|none||Relations - 关联关系|
|»»» address|string|false|none||楼号地址，如"小区东南角"|
|»»» building_code|string|false|none||楼号编码，如"B001"|
|»»» building_name|string|false|none||楼号名称，如"1号楼"|
|»»» created_at|string|false|none||none|
|»»» devices|[[models.Device](#schemamodels.device)]|false|none||楼号关联的设备（一对多）|
|»»» households|[[models.Household](#schemamodels.household)]|false|none||关联关系|
|»»» id|integer|false|none||none|
|»»» status|string|false|none||状态：active, inactive|
|»»» updated_at|string|false|none||none|
|»» building_id|integer|false|none||关联的楼号ID|
|»» created_at|string|false|none||none|
|»» devices|[[models.Device](#schemamodels.device)]|false|none||关联的设备（一对多）|
|»» household_number|string|false|none||户号编号，如"1-1-101"|
|»» id|integer|false|none||none|
|»» residents|[[models.Resident](#schemamodels.resident)]|false|none||关联的居民（一对多）|
|»» status|string|false|none||状态：active, inactive|
|»» updated_at|string|false|none||none|
|» household_id|integer|false|none||关联的户号ID|
|» id|integer|false|none||none|
|» location|string|false|none||none|
|» name|string|false|none||none|
|» serial_number|string|false|none||none|
|» staff|[[models.PropertyStaff](#schemamodels.propertystaff)]|false|none||Relations - 关联关系|
|» status|[models.DeviceStatus](#schemamodels.devicestatus)|false|none||none|
|» updated_at|string|false|none||none|

#### 枚举值

|属性|值|
|---|---|
|call_status|answered|
|call_status|missed|
|call_status|timeout|
|status|online|
|status|offline|
|status|fault|
|status|online|
|status|offline|
|status|fault|
|method|remote|
|method|code|
|method|face|
|method|fingerprint|
|call_status|answered|
|call_status|missed|
|call_status|timeout|
|status|online|
|status|offline|
|status|fault|
|status|online|
|status|offline|
|status|fault|
|status|pending|
|status|responded|
|status|escalated|
|status|resolved|
|result|success|
|result|failure|
|status|online|
|status|offline|
|status|fault|
|status|pending|
|status|responded|
|status|escalated|
|status|resolved|
|status|online|
|status|offline|
|status|fault|
|status|online|
|status|offline|
|status|fault|
|status|online|
|status|offline|
|status|fault|
|status|online|
|status|offline|
|status|fault|
|method|remote|
|method|code|
|method|face|
|method|fingerprint|
|result|success|
|result|failure|
|status|online|
|status|offline|
|status|fault|

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## POST 创建新设备

POST /devices

创建一个新的门禁设备，支持设备类型和关联

> Body 请求参数

```json
{
  "building_id": 1,
  "household_ids": [
    1,
    2
  ],
  "location": "小区北门入口",
  "name": "门禁1号",
  "serial_number": "SN12345678",
  "staff_ids": [
    1,
    2,
    3
  ],
  "status": "online"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[controllers.DeviceRequestInput](#schemacontrollers.devicerequestinput)| 否 |none|

> 返回示例

> 201 Response

```json
{
  "access_logs": [
    {
      "device": {
        "access_logs": [
          null
        ],
        "building": null,
        "building_id": 0,
        "call_records": [
          null
        ],
        "created_at": "string",
        "emergency_logs": [
          null
        ],
        "household": null,
        "household_id": 0,
        "id": 0,
        "location": "string",
        "name": "string",
        "serial_number": "string",
        "staff": [
          null
        ],
        "status": "[",
        "updated_at": "string"
      },
      "device_id": 0,
      "id": 0,
      "method": "remote",
      "resident": {
        "access_logs": [
          {
            "device": null,
            "device_id": null,
            "id": null,
            "method": null,
            "resident": null,
            "resident_id": null,
            "result": null,
            "timestamp": null
          }
        ],
        "call_records": [
          {
            "call_id": null,
            "call_status": null,
            "created_at": null,
            "device": null,
            "device_id": null,
            "duration": null,
            "id": null,
            "resident": null,
            "resident_id": null,
            "timestamp": null,
            "updated_at": null
          }
        ],
        "created_at": "string",
        "email": "string",
        "emergency_logs": [
          {
            "device": null,
            "device_id": null,
            "id": null,
            "resident": null,
            "resident_id": null,
            "resolved_at": null,
            "status": null,
            "triggered_at": null
          }
        ],
        "household": {},
        "household_id": 0,
        "id": 0,
        "name": "string",
        "phone": "string",
        "updated_at": "string"
      },
      "resident_id": 0,
      "result": "success",
      "timestamp": "string"
    }
  ],
  "building": {
    "address": "string",
    "building_code": "string",
    "building_name": "string",
    "created_at": "string",
    "devices": [
      {
        "access_logs": [
          null
        ],
        "building": null,
        "building_id": 0,
        "call_records": [
          null
        ],
        "created_at": "string",
        "emergency_logs": [
          null
        ],
        "household": null,
        "household_id": 0,
        "id": 0,
        "location": "string",
        "name": "string",
        "serial_number": "string",
        "staff": [
          null
        ],
        "status": "[",
        "updated_at": "string"
      }
    ],
    "households": [
      {
        "building": null,
        "building_id": 0,
        "created_at": "string",
        "devices": [
          null
        ],
        "household_number": "string",
        "id": 0,
        "residents": [
          null
        ],
        "status": "string",
        "updated_at": "string"
      }
    ],
    "id": 0,
    "status": "string",
    "updated_at": "string"
  },
  "building_id": 0,
  "call_records": [
    {
      "call_id": "string",
      "call_status": "answered",
      "created_at": "string",
      "device": {
        "access_logs": [
          null
        ],
        "building": null,
        "building_id": 0,
        "call_records": [
          null
        ],
        "created_at": "string",
        "emergency_logs": [
          null
        ],
        "household": null,
        "household_id": 0,
        "id": 0,
        "location": "string",
        "name": "string",
        "serial_number": "string",
        "staff": [
          null
        ],
        "status": "[",
        "updated_at": "string"
      },
      "device_id": 0,
      "duration": 0,
      "id": 0,
      "resident": {
        "access_logs": [
          {
            "device": null,
            "device_id": null,
            "id": null,
            "method": null,
            "resident": null,
            "resident_id": null,
            "result": null,
            "timestamp": null
          }
        ],
        "call_records": [
          {
            "call_id": null,
            "call_status": null,
            "created_at": null,
            "device": null,
            "device_id": null,
            "duration": null,
            "id": null,
            "resident": null,
            "resident_id": null,
            "timestamp": null,
            "updated_at": null
          }
        ],
        "created_at": "string",
        "email": "string",
        "emergency_logs": [
          {
            "device": null,
            "device_id": null,
            "id": null,
            "resident": null,
            "resident_id": null,
            "resolved_at": null,
            "status": null,
            "triggered_at": null
          }
        ],
        "household": {},
        "household_id": 0,
        "id": 0,
        "name": "string",
        "phone": "string",
        "updated_at": "string"
      },
      "resident_id": 0,
      "timestamp": "string",
      "updated_at": "string"
    }
  ],
  "created_at": "string",
  "emergency_logs": [
    {
      "device": {
        "access_logs": [
          null
        ],
        "building": null,
        "building_id": 0,
        "call_records": [
          null
        ],
        "created_at": "string",
        "emergency_logs": [
          null
        ],
        "household": null,
        "household_id": 0,
        "id": 0,
        "location": "string",
        "name": "string",
        "serial_number": "string",
        "staff": [
          null
        ],
        "status": "[",
        "updated_at": "string"
      },
      "device_id": 0,
      "id": 0,
      "resident": {
        "access_logs": [
          {
            "device": null,
            "device_id": null,
            "id": null,
            "method": null,
            "resident": null,
            "resident_id": null,
            "result": null,
            "timestamp": null
          }
        ],
        "call_records": [
          {
            "call_id": null,
            "call_status": null,
            "created_at": null,
            "device": null,
            "device_id": null,
            "duration": null,
            "id": null,
            "resident": null,
            "resident_id": null,
            "timestamp": null,
            "updated_at": null
          }
        ],
        "created_at": "string",
        "email": "string",
        "emergency_logs": [
          {
            "device": null,
            "device_id": null,
            "id": null,
            "resident": null,
            "resident_id": null,
            "resolved_at": null,
            "status": null,
            "triggered_at": null
          }
        ],
        "household": {},
        "household_id": 0,
        "id": 0,
        "name": "string",
        "phone": "string",
        "updated_at": "string"
      },
      "resident_id": 0,
      "resolved_at": "string",
      "status": "pending",
      "triggered_at": "string"
    }
  ],
  "household": {
    "building": {
      "address": null,
      "building_code": null,
      "building_name": null,
      "created_at": null,
      "devices": null,
      "households": null,
      "id": null,
      "status": null,
      "updated_at": null
    },
    "building_id": 0,
    "created_at": "string",
    "devices": [
      {
        "access_logs": [
          null
        ],
        "building": null,
        "building_id": 0,
        "call_records": [
          null
        ],
        "created_at": "string",
        "emergency_logs": [
          null
        ],
        "household": null,
        "household_id": 0,
        "id": 0,
        "location": "string",
        "name": "string",
        "serial_number": "string",
        "staff": [
          null
        ],
        "status": "[",
        "updated_at": "string"
      }
    ],
    "household_number": "string",
    "id": 0,
    "residents": [
      {
        "access_logs": [
          null
        ],
        "call_records": [
          null
        ],
        "created_at": "string",
        "email": "string",
        "emergency_logs": [
          null
        ],
        "household": null,
        "household_id": 0,
        "id": 0,
        "name": "string",
        "phone": "string",
        "updated_at": "string"
      }
    ],
    "status": "string",
    "updated_at": "string"
  },
  "household_id": 0,
  "id": 0,
  "location": "string",
  "name": "string",
  "serial_number": "string",
  "staff": [
    {
      "created_at": "string",
      "devices": [
        {
          "access_logs": [
            {}
          ],
          "building": null,
          "building_id": 0,
          "call_records": [
            {}
          ],
          "created_at": "string",
          "emergency_logs": [
            {}
          ],
          "household": null,
          "household_id": 0,
          "id": 0,
          "location": "string",
          "name": "string",
          "serial_number": "string",
          "staff": [
            {}
          ],
          "status": "online",
          "updated_at": "string"
        }
      ],
      "id": 0,
      "phone": "string",
      "position": "string",
      "property_name": "string",
      "remark": "string",
      "role": "string",
      "status": "string",
      "updated_at": "string",
      "username": "string"
    }
  ],
  "status": "online",
  "updated_at": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|成功创建的设备信息|[models.Device](#schemamodels.device)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|请求参数错误，如缺少必填字段或格式不正确|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|服务器内部错误，可能是数据库操作失败等|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

## GET 获取单个设备

GET /devices/{id}

根据ID获取设备信息

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |设备ID|

> 返回示例

> 200 Response

```json
{
  "access_logs": [
    {
      "device": {
        "access_logs": [
          null
        ],
        "building": null,
        "building_id": 0,
        "call_records": [
          null
        ],
        "created_at": "string",
        "emergency_logs": [
          null
        ],
        "household": null,
        "household_id": 0,
        "id": 0,
        "location": "string",
        "name": "string",
        "serial_number": "string",
        "staff": [
          null
        ],
        "status": "[",
        "updated_at": "string"
      },
      "device_id": 0,
      "id": 0,
      "method": "remote",
      "resident": {
        "access_logs": [
          {
            "device": null,
            "device_id": null,
            "id": null,
            "method": null,
            "resident": null,
            "resident_id": null,
            "result": null,
            "timestamp": null
          }
        ],
        "call_records": [
          {
            "call_id": null,
            "call_status": null,
            "created_at": null,
            "device": null,
            "device_id": null,
            "duration": null,
            "id": null,
            "resident": null,
            "resident_id": null,
            "timestamp": null,
            "updated_at": null
          }
        ],
        "created_at": "string",
        "email": "string",
        "emergency_logs": [
          {
            "device": null,
            "device_id": null,
            "id": null,
            "resident": null,
            "resident_id": null,
            "resolved_at": null,
            "status": null,
            "triggered_at": null
          }
        ],
        "household": {},
        "household_id": 0,
        "id": 0,
        "name": "string",
        "phone": "string",
        "updated_at": "string"
      },
      "resident_id": 0,
      "result": "success",
      "timestamp": "string"
    }
  ],
  "building": {
    "address": "string",
    "building_code": "string",
    "building_name": "string",
    "created_at": "string",
    "devices": [
      {
        "access_logs": [
          null
        ],
        "building": null,
        "building_id": 0,
        "call_records": [
          null
        ],
        "created_at": "string",
        "emergency_logs": [
          null
        ],
        "household": null,
        "household_id": 0,
        "id": 0,
        "location": "string",
        "name": "string",
        "serial_number": "string",
        "staff": [
          null
        ],
        "status": "[",
        "updated_at": "string"
      }
    ],
    "households": [
      {
        "building": null,
        "building_id": 0,
        "created_at": "string",
        "devices": [
          null
        ],
        "household_number": "string",
        "id": 0,
        "residents": [
          null
        ],
        "status": "string",
        "updated_at": "string"
      }
    ],
    "id": 0,
    "status": "string",
    "updated_at": "string"
  },
  "building_id": 0,
  "call_records": [
    {
      "call_id": "string",
      "call_status": "answered",
      "created_at": "string",
      "device": {
        "access_logs": [
          null
        ],
        "building": null,
        "building_id": 0,
        "call_records": [
          null
        ],
        "created_at": "string",
        "emergency_logs": [
          null
        ],
        "household": null,
        "household_id": 0,
        "id": 0,
        "location": "string",
        "name": "string",
        "serial_number": "string",
        "staff": [
          null
        ],
        "status": "[",
        "updated_at": "string"
      },
      "device_id": 0,
      "duration": 0,
      "id": 0,
      "resident": {
        "access_logs": [
          {
            "device": null,
            "device_id": null,
            "id": null,
            "method": null,
            "resident": null,
            "resident_id": null,
            "result": null,
            "timestamp": null
          }
        ],
        "call_records": [
          {
            "call_id": null,
            "call_status": null,
            "created_at": null,
            "device": null,
            "device_id": null,
            "duration": null,
            "id": null,
            "resident": null,
            "resident_id": null,
            "timestamp": null,
            "updated_at": null
          }
        ],
        "created_at": "string",
        "email": "string",
        "emergency_logs": [
          {
            "device": null,
            "device_id": null,
            "id": null,
            "resident": null,
            "resident_id": null,
            "resolved_at": null,
            "status": null,
            "triggered_at": null
          }
        ],
        "household": {},
        "household_id": 0,
        "id": 0,
        "name": "string",
        "phone": "string",
        "updated_at": "string"
      },
      "resident_id": 0,
      "timestamp": "string",
      "updated_at": "string"
    }
  ],
  "created_at": "string",
  "emergency_logs": [
    {
      "device": {
        "access_logs": [
          null
        ],
        "building": null,
        "building_id": 0,
        "call_records": [
          null
        ],
        "created_at": "string",
        "emergency_logs": [
          null
        ],
        "household": null,
        "household_id": 0,
        "id": 0,
        "location": "string",
        "name": "string",
        "serial_number": "string",
        "staff": [
          null
        ],
        "status": "[",
        "updated_at": "string"
      },
      "device_id": 0,
      "id": 0,
      "resident": {
        "access_logs": [
          {
            "device": null,
            "device_id": null,
            "id": null,
            "method": null,
            "resident": null,
            "resident_id": null,
            "result": null,
            "timestamp": null
          }
        ],
        "call_records": [
          {
            "call_id": null,
            "call_status": null,
            "created_at": null,
            "device": null,
            "device_id": null,
            "duration": null,
            "id": null,
            "resident": null,
            "resident_id": null,
            "timestamp": null,
            "updated_at": null
          }
        ],
        "created_at": "string",
        "email": "string",
        "emergency_logs": [
          {
            "device": null,
            "device_id": null,
            "id": null,
            "resident": null,
            "resident_id": null,
            "resolved_at": null,
            "status": null,
            "triggered_at": null
          }
        ],
        "household": {},
        "household_id": 0,
        "id": 0,
        "name": "string",
        "phone": "string",
        "updated_at": "string"
      },
      "resident_id": 0,
      "resolved_at": "string",
      "status": "pending",
      "triggered_at": "string"
    }
  ],
  "household": {
    "building": {
      "address": null,
      "building_code": null,
      "building_name": null,
      "created_at": null,
      "devices": null,
      "households": null,
      "id": null,
      "status": null,
      "updated_at": null
    },
    "building_id": 0,
    "created_at": "string",
    "devices": [
      {
        "access_logs": [
          null
        ],
        "building": null,
        "building_id": 0,
        "call_records": [
          null
        ],
        "created_at": "string",
        "emergency_logs": [
          null
        ],
        "household": null,
        "household_id": 0,
        "id": 0,
        "location": "string",
        "name": "string",
        "serial_number": "string",
        "staff": [
          null
        ],
        "status": "[",
        "updated_at": "string"
      }
    ],
    "household_number": "string",
    "id": 0,
    "residents": [
      {
        "access_logs": [
          null
        ],
        "call_records": [
          null
        ],
        "created_at": "string",
        "email": "string",
        "emergency_logs": [
          null
        ],
        "household": null,
        "household_id": 0,
        "id": 0,
        "name": "string",
        "phone": "string",
        "updated_at": "string"
      }
    ],
    "status": "string",
    "updated_at": "string"
  },
  "household_id": 0,
  "id": 0,
  "location": "string",
  "name": "string",
  "serial_number": "string",
  "staff": [
    {
      "created_at": "string",
      "devices": [
        {
          "access_logs": [
            {}
          ],
          "building": null,
          "building_id": 0,
          "call_records": [
            {}
          ],
          "created_at": "string",
          "emergency_logs": [
            {}
          ],
          "household": null,
          "household_id": 0,
          "id": 0,
          "location": "string",
          "name": "string",
          "serial_number": "string",
          "staff": [
            {}
          ],
          "status": "online",
          "updated_at": "string"
        }
      ],
      "id": 0,
      "phone": "string",
      "position": "string",
      "property_name": "string",
      "remark": "string",
      "role": "string",
      "status": "string",
      "updated_at": "string",
      "username": "string"
    }
  ],
  "status": "online",
  "updated_at": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[models.Device](#schemamodels.device)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

## PUT 更新设备信息

PUT /devices/{id}

根据ID更新设备信息，支持更新关联

> Body 请求参数

```json
{
  "building_id": 1,
  "household_ids": [
    1,
    2
  ],
  "location": "小区北门入口",
  "name": "门禁1号",
  "serial_number": "SN12345678",
  "staff_ids": [
    1,
    2,
    3
  ],
  "status": "online"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |设备ID|
|body|body|[controllers.DeviceRequestInput](#schemacontrollers.devicerequestinput)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "access_logs": [
    {
      "device": {
        "access_logs": [
          null
        ],
        "building": null,
        "building_id": 0,
        "call_records": [
          null
        ],
        "created_at": "string",
        "emergency_logs": [
          null
        ],
        "household": null,
        "household_id": 0,
        "id": 0,
        "location": "string",
        "name": "string",
        "serial_number": "string",
        "staff": [
          null
        ],
        "status": "[",
        "updated_at": "string"
      },
      "device_id": 0,
      "id": 0,
      "method": "remote",
      "resident": {
        "access_logs": [
          {
            "device": null,
            "device_id": null,
            "id": null,
            "method": null,
            "resident": null,
            "resident_id": null,
            "result": null,
            "timestamp": null
          }
        ],
        "call_records": [
          {
            "call_id": null,
            "call_status": null,
            "created_at": null,
            "device": null,
            "device_id": null,
            "duration": null,
            "id": null,
            "resident": null,
            "resident_id": null,
            "timestamp": null,
            "updated_at": null
          }
        ],
        "created_at": "string",
        "email": "string",
        "emergency_logs": [
          {
            "device": null,
            "device_id": null,
            "id": null,
            "resident": null,
            "resident_id": null,
            "resolved_at": null,
            "status": null,
            "triggered_at": null
          }
        ],
        "household": {},
        "household_id": 0,
        "id": 0,
        "name": "string",
        "phone": "string",
        "updated_at": "string"
      },
      "resident_id": 0,
      "result": "success",
      "timestamp": "string"
    }
  ],
  "building": {
    "address": "string",
    "building_code": "string",
    "building_name": "string",
    "created_at": "string",
    "devices": [
      {
        "access_logs": [
          null
        ],
        "building": null,
        "building_id": 0,
        "call_records": [
          null
        ],
        "created_at": "string",
        "emergency_logs": [
          null
        ],
        "household": null,
        "household_id": 0,
        "id": 0,
        "location": "string",
        "name": "string",
        "serial_number": "string",
        "staff": [
          null
        ],
        "status": "[",
        "updated_at": "string"
      }
    ],
    "households": [
      {
        "building": null,
        "building_id": 0,
        "created_at": "string",
        "devices": [
          null
        ],
        "household_number": "string",
        "id": 0,
        "residents": [
          null
        ],
        "status": "string",
        "updated_at": "string"
      }
    ],
    "id": 0,
    "status": "string",
    "updated_at": "string"
  },
  "building_id": 0,
  "call_records": [
    {
      "call_id": "string",
      "call_status": "answered",
      "created_at": "string",
      "device": {
        "access_logs": [
          null
        ],
        "building": null,
        "building_id": 0,
        "call_records": [
          null
        ],
        "created_at": "string",
        "emergency_logs": [
          null
        ],
        "household": null,
        "household_id": 0,
        "id": 0,
        "location": "string",
        "name": "string",
        "serial_number": "string",
        "staff": [
          null
        ],
        "status": "[",
        "updated_at": "string"
      },
      "device_id": 0,
      "duration": 0,
      "id": 0,
      "resident": {
        "access_logs": [
          {
            "device": null,
            "device_id": null,
            "id": null,
            "method": null,
            "resident": null,
            "resident_id": null,
            "result": null,
            "timestamp": null
          }
        ],
        "call_records": [
          {
            "call_id": null,
            "call_status": null,
            "created_at": null,
            "device": null,
            "device_id": null,
            "duration": null,
            "id": null,
            "resident": null,
            "resident_id": null,
            "timestamp": null,
            "updated_at": null
          }
        ],
        "created_at": "string",
        "email": "string",
        "emergency_logs": [
          {
            "device": null,
            "device_id": null,
            "id": null,
            "resident": null,
            "resident_id": null,
            "resolved_at": null,
            "status": null,
            "triggered_at": null
          }
        ],
        "household": {},
        "household_id": 0,
        "id": 0,
        "name": "string",
        "phone": "string",
        "updated_at": "string"
      },
      "resident_id": 0,
      "timestamp": "string",
      "updated_at": "string"
    }
  ],
  "created_at": "string",
  "emergency_logs": [
    {
      "device": {
        "access_logs": [
          null
        ],
        "building": null,
        "building_id": 0,
        "call_records": [
          null
        ],
        "created_at": "string",
        "emergency_logs": [
          null
        ],
        "household": null,
        "household_id": 0,
        "id": 0,
        "location": "string",
        "name": "string",
        "serial_number": "string",
        "staff": [
          null
        ],
        "status": "[",
        "updated_at": "string"
      },
      "device_id": 0,
      "id": 0,
      "resident": {
        "access_logs": [
          {
            "device": null,
            "device_id": null,
            "id": null,
            "method": null,
            "resident": null,
            "resident_id": null,
            "result": null,
            "timestamp": null
          }
        ],
        "call_records": [
          {
            "call_id": null,
            "call_status": null,
            "created_at": null,
            "device": null,
            "device_id": null,
            "duration": null,
            "id": null,
            "resident": null,
            "resident_id": null,
            "timestamp": null,
            "updated_at": null
          }
        ],
        "created_at": "string",
        "email": "string",
        "emergency_logs": [
          {
            "device": null,
            "device_id": null,
            "id": null,
            "resident": null,
            "resident_id": null,
            "resolved_at": null,
            "status": null,
            "triggered_at": null
          }
        ],
        "household": {},
        "household_id": 0,
        "id": 0,
        "name": "string",
        "phone": "string",
        "updated_at": "string"
      },
      "resident_id": 0,
      "resolved_at": "string",
      "status": "pending",
      "triggered_at": "string"
    }
  ],
  "household": {
    "building": {
      "address": null,
      "building_code": null,
      "building_name": null,
      "created_at": null,
      "devices": null,
      "households": null,
      "id": null,
      "status": null,
      "updated_at": null
    },
    "building_id": 0,
    "created_at": "string",
    "devices": [
      {
        "access_logs": [
          null
        ],
        "building": null,
        "building_id": 0,
        "call_records": [
          null
        ],
        "created_at": "string",
        "emergency_logs": [
          null
        ],
        "household": null,
        "household_id": 0,
        "id": 0,
        "location": "string",
        "name": "string",
        "serial_number": "string",
        "staff": [
          null
        ],
        "status": "[",
        "updated_at": "string"
      }
    ],
    "household_number": "string",
    "id": 0,
    "residents": [
      {
        "access_logs": [
          null
        ],
        "call_records": [
          null
        ],
        "created_at": "string",
        "email": "string",
        "emergency_logs": [
          null
        ],
        "household": null,
        "household_id": 0,
        "id": 0,
        "name": "string",
        "phone": "string",
        "updated_at": "string"
      }
    ],
    "status": "string",
    "updated_at": "string"
  },
  "household_id": 0,
  "id": 0,
  "location": "string",
  "name": "string",
  "serial_number": "string",
  "staff": [
    {
      "created_at": "string",
      "devices": [
        {
          "access_logs": [
            {}
          ],
          "building": null,
          "building_id": 0,
          "call_records": [
            {}
          ],
          "created_at": "string",
          "emergency_logs": [
            {}
          ],
          "household": null,
          "household_id": 0,
          "id": 0,
          "location": "string",
          "name": "string",
          "serial_number": "string",
          "staff": [
            {}
          ],
          "status": "online",
          "updated_at": "string"
        }
      ],
      "id": 0,
      "phone": "string",
      "position": "string",
      "property_name": "string",
      "remark": "string",
      "role": "string",
      "status": "string",
      "updated_at": "string",
      "username": "string"
    }
  ],
  "status": "online",
  "updated_at": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|更新后的设备信息|[models.Device](#schemamodels.device)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|请求参数错误|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|设备不存在|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|服务器内部错误|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

## DELETE 删除设备

DELETE /devices/{id}

根据ID删除设备

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |设备ID|

> 返回示例

> 204 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|No Content|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **404**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## GET 获取设备状态

GET /devices/{id}/status

获取设备的当前状态信息，包括在线状态、最后更新时间等

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |设备ID|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|设备状态信息，包含ID、名称、状态、位置、最后在线时间等|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|设备不存在|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|服务器内部错误，可能是数据库查询失败等|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **404**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## POST 关联设备与楼号

POST /devices/{id}/building

将指定设备关联到楼号

> Body 请求参数

```json
{
  "building_id": 1
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |设备ID|
|body|body|[controllers.DeviceBuildingRequest](#schemacontrollers.devicebuildingrequest)| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **404**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## GET 获取设备关联的户号

GET /devices/{id}/households

获取指定设备关联的所有户号

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |设备ID|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **404**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## POST 关联设备与户号

POST /devices/{id}/households

将指定设备关联到户号

> Body 请求参数

```json
{
  "household_id": 1
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |设备ID|
|body|body|[controllers.DeviceHouseholdRequest](#schemacontrollers.devicehouseholdrequest)| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **404**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## DELETE 解除设备与户号的关联

DELETE /devices/{id}/households/{household_id}

解除指定设备与户号的关联

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |设备ID|
|household_id|path|integer| 是 |户号ID|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **404**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

# 5/30/Emergency

## POST Trigger Emergency Alarm

POST /emergency/alarm

Trigger an emergency alarm and notify relevant personnel

> Body 请求参数

```json
{
  "description": "火灾警报被触发，疑似厨房起火",
  "location": "Building A, Floor 3",
  "property_id": 1,
  "reported_by": 1,
  "type": "fire"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[controllers.EmergencyAlarmRequest](#schemacontrollers.emergencyalarmrequest)| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## GET Get Emergency Contacts

GET /emergency/contacts

Get a list of all emergency contacts in the system

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## POST Notify All Users

POST /emergency/notify-all

Send notification to all users during an emergency

> Body 请求参数

```json
{
  "content": "A栋3楼发生火灾，请所有居民立即疏散。",
  "expires_at": "2023-07-01T15:00:00Z",
  "is_public": false,
  "property_id": 1,
  "severity": "high",
  "target_type": "all",
  "title": "紧急通知：小区火灾警报"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[controllers.EmergencyNotificationRequest](#schemacontrollers.emergencynotificationrequest)| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## POST Emergency Unlock All Doors

POST /emergency/unlock-all

Unlock all doors in the system during an emergency

> Body 请求参数

```json
{
  "reason": "火灾疏散"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[controllers.EmergencyUnlockRequest](#schemacontrollers.emergencyunlockrequest)| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

# 5/30/Household

## DELETE 解除户号与设备的关联

DELETE /devices/{id}/households

解除指定户号与设备的关联

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **404**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## GET 获取所有户号

GET /households

获取系统中所有户号的列表

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer| 否 |页码，默认为1|
|page_size|query|integer| 否 |每页条数，默认为10|
|building_id|query|integer| 否 |楼号ID，用于筛选特定楼号下的户号|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## POST 创建户号

POST /households

创建一个新的户号，需要关联到楼号

> Body 请求参数

```json
{
  "building_id": 1,
  "household_number": "1-1-101",
  "status": "active"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[controllers.HouseholdRequest](#schemacontrollers.householdrequest)| 否 |none|

> 返回示例

> 201 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Created|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## GET 获取户号详情

GET /households/{id}

根据ID获取户号详细信息

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |户号ID|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **404**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## PUT 更新户号

PUT /households/{id}

更新户号信息

> Body 请求参数

```json
{
  "building_id": 1,
  "household_number": "1-1-101",
  "status": "active"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |户号ID|
|body|body|[controllers.HouseholdRequest](#schemacontrollers.householdrequest)| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **404**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## DELETE 删除户号

DELETE /households/{id}

删除指定的户号

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |户号ID|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **404**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## GET 获取户号关联的设备

GET /households/{id}/devices

获取指定户号关联的所有设备

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |户号ID|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **404**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## POST 关联户号与设备

POST /households/{id}/devices

将指定户号关联到设备

> Body 请求参数

```json
{
  "device_id": 1
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |户号ID|
|body|body|[controllers.HouseholdDeviceRequest](#schemacontrollers.householddevicerequest)| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **404**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## DELETE 解除户号与设备的关联

DELETE /households/{id}/devices/{device_id}

解除指定户号与设备的关联

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |户号ID|
|device_id|path|integer| 是 |设备ID|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **404**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## GET 获取户号下的居民

GET /households/{id}/residents

获取指定户号下的所有居民

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |户号ID|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **404**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

# 5/30/MQTT

## POST 发起MQTT通话

POST /mqtt/call

通过MQTT向设备关联的住户发起视频通话请求。如果提供了household_number参数，则呼叫该户号下的所有住户；如果未提供，则呼叫该设备绑定的户号下的所有住户。

> Body 请求参数

```json
{
  "device_id": "5",
  "household_number": "MQTT-101",
  "timestamp": 1651234567890
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[controllers.InitiateCallRequest](#schemacontrollers.initiatecallrequest)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "call_id": "mqtt-call-20250510-abcdef123456",
  "call_info": {
    "action": "answered",
    "call_id": "mqtt-call-20250510-abcdef123456",
    "reason": "user_busy",
    "timestamp": 1651234567890
  },
  "device_device_id": "5",
  "target_resident_ids": [
    "[\"6\"",
    "\"7\"]"
  ],
  "tencen_rtc": {
    "room_id": "room_5_6_1746870072",
    "room_id_type": "string",
    "sdk_app_id": 1400000001,
    "user_id": "5",
    "user_sig": "eJwtzM1Og0AUhmG..."
  },
  "timestamp": 1651234567890
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[controllers.InitiateCallResponse](#schemacontrollers.initiatecallresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

## POST 处理MQTT呼叫方动作

POST /mqtt/controller/device

处理设备端通话动作，支持的动作类型包括：hangup(挂断)、cancelled(取消呼叫)

> Body 请求参数

```json
{
  "action": "answered",
  "call_id": "mqtt-call-20250510-abcdef123456",
  "reason": "user_busy",
  "timestamp": 1651234567890
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[controllers.CallActionRequest](#schemacontrollers.callactionrequest)| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## POST 处理MQTT被呼叫方动作

POST /mqtt/controller/resident

处理居民端通话动作，支持的动作类型包括：rejected(拒绝)、answered(接听)、hangup(挂断)、timeout(超时)

> Body 请求参数

```json
{
  "action": "answered",
  "call_id": "mqtt-call-20250510-abcdef123456",
  "reason": "user_busy",
  "timestamp": 1651234567890
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[controllers.CallActionRequest](#schemacontrollers.callactionrequest)| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## POST 结束MQTT通话会话

POST /mqtt/end-session

强制结束通话会话并通知所有参与方，适用于系统管理或异常情况下的通话强制终止

> Body 请求参数

```json
{
  "call_id": "mqtt-call-20250510-abcdef123456",
  "reason": "call_completed"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[controllers.EndCallSessionRequest](#schemacontrollers.endcallsessionrequest)| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## GET 获取MQTT通话会话

GET /mqtt/session

获取通话会话信息及TRTC房间详情，包括设备ID、住户ID、通话状态、开始时间等

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|call_id|query|string| 是 |通话会话ID|

> 返回示例

> 200 Response

```json
{
  "call_id": "mqtt-call-20250510-abcdef123456",
  "device_id": "5",
  "last_activity": "2025-05-10T15:09:10Z",
  "resident_id": "6",
  "start_time": "2025-05-10T15:04:05Z",
  "status": "connected",
  "tencen_rtc": {
    "room_id": "room_5_6_1746870072",
    "room_id_type": "string",
    "sdk_app_id": 1400000001,
    "user_id": "5",
    "user_sig": "eJwtzM1Og0AUhmG..."
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[controllers.CallSessionResponse](#schemacontrollers.callsessionresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

## POST 发布系统消息

POST /mqtt/system/message

通过MQTT发布系统消息，支持info、warning、error三种级别，消息会推送给所有订阅相关主题的客户端

> Body 请求参数

```json
{
  "data": {},
  "level": "info",
  "message": "系统将于今晚22:00进行升级维护",
  "timestamp": 1651234567890,
  "type": "notification"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[controllers.PublishSystemMessageRequest](#schemacontrollers.publishsystemmessagerequest)| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

# 5/30/Device

## POST 更新设备状态

POST /mqtt/device/status

更新设备状态信息，包括在线状态、电池电量和其他自定义属性，无需MQTT连接，系统会通过MQTT推送给相关订阅方

> Body 请求参数

```json
{
  "battery": 85,
  "device_id": "5",
  "online": true,
  "properties": {}
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[controllers.PublishDeviceStatusRequest](#schemacontrollers.publishdevicestatusrequest)| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **404**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

# 5/30/Resident

## GET 获取居民列表

GET /residents

获取系统中所有居民的列表

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer| 否 |页码，默认为1|
|page_size|query|integer| 否 |每页条数，默认为10|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **401**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## POST 创建居民

POST /residents

创建新的居民账户，需要关联到特定设备

> Body 请求参数

```json
{
  "email": "zhangsan@resident.com",
  "household_id": 1,
  "name": "张三",
  "phone": "13812345678"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[controllers.ResidentRequest](#schemacontrollers.residentrequest)| 否 |none|

> 返回示例

> 201 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|成功响应，包含创建的居民详情|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|请求错误，设备不存在或电话号码已被使用|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|服务器错误|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## GET 获取居民详情

GET /residents/{id}

根据ID获取特定居民的详细信息

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |居民ID|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **404**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## PUT 更新居民

PUT /residents/{id}

更新现有居民的信息

> Body 请求参数

```json
{
  "email": "lisi@resident.com",
  "household_id": 1,
  "name": "李四",
  "phone": "13987654321"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |居民ID|
|body|body|[controllers.UpdateResidentRequest](#schemacontrollers.updateresidentrequest)| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **404**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## DELETE 删除居民

DELETE /residents/{id}

删除指定ID的居民

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |居民ID|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **404**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

# 5/30/Staff

## GET 获取物业员工列表

GET /staffs

获取所有物业员工的列表，支持分页和搜索

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer| 否 |页码，默认为1|
|page_size|query|integer| 否 |每页条数，默认为10|
|search|query|string| 否 |搜索关键词(姓名、电话等)|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## POST 创建物业员工

POST /staffs

创建一个新的物业员工

> Body 请求参数

```json
{
  "device_ids": [
    1,
    2,
    3
  ],
  "name": "王物业",
  "password": "Property@123",
  "phone": "13700001234",
  "position": "物业经理",
  "property_name": "阳光花园小区",
  "remark": "负责A区日常管理工作",
  "role": "manager",
  "status": "active",
  "username": "wangwuye"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[controllers.CreateStaffRequest](#schemacontrollers.createstaffrequest)| 否 |none|

> 返回示例

> 201 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Created|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## GET 获取带设备信息的物业员工列表

GET /staffs/with-devices

获取所有物业员工的列表及其关联的设备信息

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer| 否 |页码，默认为1|
|page_size|query|integer| 否 |每页条数，默认为10|
|search|query|string| 否 |搜索关键词(姓名、电话等)|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## GET 获取物业员工详情

GET /staffs/{id}

根据ID获取特定物业员工的详细信息

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |物业员工ID|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **404**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## PUT 更新物业员工

PUT /staffs/{id}

更新现有物业员工的信息

> Body 请求参数

```json
{
  "device_ids": [
    1,
    3,
    5
  ],
  "name": "李物业",
  "password": "NewProperty@456",
  "phone": "13700005678",
  "position": "前台客服",
  "property_name": "幸福家园小区",
  "remark": "负责接待访客和处理居民投诉",
  "role": "staff",
  "status": "active",
  "username": "liwuye"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |物业员工ID|
|body|body|[controllers.UpdateStaffRequest](#schemacontrollers.updatestaffrequest)| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **404**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## DELETE 删除物业员工

DELETE /staffs/{id}

删除指定ID的物业员工

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |物业员工ID|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **404**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

# 5/30/TencentRTC

## POST Start Tencent Video Call

POST /trtc/call

Initiate a Tencent Cloud video call between a device and a resident

> Body 请求参数

```json
{
  "device_id": "string",
  "resident_id": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[controllers.TencentCallRequest](#schemacontrollers.tencentcallrequest)| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

## POST Get Tencent TRTC UserSig

POST /trtc/usersig

Get a UserSig credential for Tencent Cloud real-time communication

> Body 请求参数

```json
{
  "user_id": "user123"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[controllers.GetUserSigRequest](#schemacontrollers.getusersigrequest)| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[controllers.ErrorResponse](#schemacontrollers.errorresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||none|
|» data|string|false|none||none|
|» message|string|false|none||none|

# 数据模型

<h2 id="tocS_Pet">Pet</h2>

<a id="schemapet"></a>
<a id="schema_Pet"></a>
<a id="tocSpet"></a>
<a id="tocspet"></a>

```json
{
  "id": 1,
  "category": {
    "id": 1,
    "name": "string"
  },
  "name": "doggie",
  "photoUrls": [
    "string"
  ],
  "tags": [
    {
      "id": 1,
      "name": "string"
    }
  ],
  "status": "available"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|true|none||宠物ID编号|
|category|[Category](#schemacategory)|true|none||分组|
|name|string|true|none||名称|
|photoUrls|[string]|true|none||照片URL|
|tags|[[Tag](#schematag)]|true|none||标签|
|status|string|true|none||宠物销售状态|

#### 枚举值

|属性|值|
|---|---|
|status|available|
|status|pending|
|status|sold|

<h2 id="tocS_Category">Category</h2>

<a id="schemacategory"></a>
<a id="schema_Category"></a>
<a id="tocScategory"></a>
<a id="tocscategory"></a>

```json
{
  "id": 1,
  "name": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||分组ID编号|
|name|string|false|none||分组名称|

<h2 id="tocS_Tag">Tag</h2>

<a id="schematag"></a>
<a id="schema_Tag"></a>
<a id="tocStag"></a>
<a id="tocstag"></a>

```json
{
  "id": 1,
  "name": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||标签ID编号|
|name|string|false|none||标签名称|

<h2 id="tocS_controllers.CallActionRequest">controllers.CallActionRequest</h2>

<a id="schemacontrollers.callactionrequest"></a>
<a id="schema_controllers.CallActionRequest"></a>
<a id="tocScontrollers.callactionrequest"></a>
<a id="tocscontrollers.callactionrequest"></a>

```json
{
  "action": "answered",
  "call_id": "mqtt-call-20250510-abcdef123456",
  "reason": "user_busy",
  "timestamp": 1651234567890
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|action|string|true|none||none|
|call_id|string|true|none||none|
|reason|string|false|none||none|
|timestamp|integer|false|none||none|

<h2 id="tocS_controllers.BuildingRequest">controllers.BuildingRequest</h2>

<a id="schemacontrollers.buildingrequest"></a>
<a id="schema_controllers.BuildingRequest"></a>
<a id="tocScontrollers.buildingrequest"></a>
<a id="tocscontrollers.buildingrequest"></a>

```json
{
  "address": "小区东南角",
  "building_code": "B001",
  "building_name": "1号楼",
  "status": "active"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|address|string|false|none||none|
|building_code|string|true|none||none|
|building_name|string|true|none||none|
|status|string|false|none||active, inactive|

<h2 id="tocS_controllers.CallFeedbackRequest">controllers.CallFeedbackRequest</h2>

<a id="schemacontrollers.callfeedbackrequest"></a>
<a id="schema_controllers.CallFeedbackRequest"></a>
<a id="tocScontrollers.callfeedbackrequest"></a>
<a id="tocscontrollers.callfeedbackrequest"></a>

```json
{
  "comment": "通话质量良好，声音清晰",
  "issues": "偶尔有一点延迟",
  "rating": 4
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|comment|string|false|none||可选评论|
|issues|string|false|none||问题描述|
|rating|integer|true|none||1-5 星评分|

<h2 id="tocS_controllers.CallInfo">controllers.CallInfo</h2>

<a id="schemacontrollers.callinfo"></a>
<a id="schema_controllers.CallInfo"></a>
<a id="tocScontrollers.callinfo"></a>
<a id="tocscontrollers.callinfo"></a>

```json
{
  "action": "answered",
  "call_id": "mqtt-call-20250510-abcdef123456",
  "reason": "user_busy",
  "timestamp": 1651234567890
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|action|string|false|none||none|
|call_id|string|false|none||none|
|reason|string|false|none||none|
|timestamp|integer|false|none||none|

<h2 id="tocS_controllers.CallRequest">controllers.CallRequest</h2>

<a id="schemacontrollers.callrequest"></a>
<a id="schema_controllers.CallRequest"></a>
<a id="tocScontrollers.callrequest"></a>
<a id="tocscontrollers.callrequest"></a>

```json
{
  "device_id": "string",
  "resident_id": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|device_id|string|true|none||none|
|resident_id|string|true|none||none|

<h2 id="tocS_controllers.CallSessionResponse">controllers.CallSessionResponse</h2>

<a id="schemacontrollers.callsessionresponse"></a>
<a id="schema_controllers.CallSessionResponse"></a>
<a id="tocScontrollers.callsessionresponse"></a>
<a id="tocscontrollers.callsessionresponse"></a>

```json
{
  "call_id": "mqtt-call-20250510-abcdef123456",
  "device_id": "5",
  "last_activity": "2025-05-10T15:09:10Z",
  "resident_id": "6",
  "start_time": "2025-05-10T15:04:05Z",
  "status": "connected",
  "tencen_rtc": {
    "room_id": "room_5_6_1746870072",
    "room_id_type": "string",
    "sdk_app_id": 1400000001,
    "user_id": "5",
    "user_sig": "eJwtzM1Og0AUhmG..."
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|call_id|string|false|none||none|
|device_id|string|false|none||none|
|last_activity|string|false|none||none|
|resident_id|string|false|none||none|
|start_time|string|false|none||none|
|status|string|false|none||none|
|tencen_rtc|[controllers.TRTCInfo](#schemacontrollers.trtcinfo)|false|none||none|

<h2 id="tocS_controllers.CreateAdminRequest">controllers.CreateAdminRequest</h2>

<a id="schemacontrollers.createadminrequest"></a>
<a id="schema_controllers.CreateAdminRequest"></a>
<a id="tocScontrollers.createadminrequest"></a>
<a id="tocscontrollers.createadminrequest"></a>

```json
{
  "email": "admin@example.com",
  "password": "Admin@123",
  "phone": "13800138000",
  "username": "admin123"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|email|string|true|none||none|
|password|string|true|none||none|
|phone|string|true|none||none|
|username|string|true|none||none|

<h2 id="tocS_controllers.CreateStaffRequest">controllers.CreateStaffRequest</h2>

<a id="schemacontrollers.createstaffrequest"></a>
<a id="schema_controllers.CreateStaffRequest"></a>
<a id="tocScontrollers.createstaffrequest"></a>
<a id="tocscontrollers.createstaffrequest"></a>

```json
{
  "device_ids": [
    1,
    2,
    3
  ],
  "name": "王物业",
  "password": "Property@123",
  "phone": "13700001234",
  "position": "物业经理",
  "property_name": "阳光花园小区",
  "remark": "负责A区日常管理工作",
  "role": "manager",
  "status": "active",
  "username": "wangwuye"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|device_ids|[integer]|false|none||关联的设备ID列表|
|name|string|false|none||注意: 已从模型中移除，但保留请求结构以兼容前端|
|password|string|true|none||none|
|phone|string|true|none||none|
|position|string|false|none||none|
|property_name|string|false|none||none|
|remark|string|false|none||none|
|role|string|true|none||可选值: manager, staff, security|
|status|string|false|none||可选值: active, inactive, suspended|
|username|string|true|none||none|

<h2 id="tocS_controllers.DeviceHealthRequest">controllers.DeviceHealthRequest</h2>

<a id="schemacontrollers.devicehealthrequest"></a>
<a id="schema_controllers.DeviceHealthRequest"></a>
<a id="tocScontrollers.devicehealthrequest"></a>
<a id="tocscontrollers.devicehealthrequest"></a>

```json
{
  "device_id": "1"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|device_id|string|true|none||none|

<h2 id="tocS_controllers.DeviceRequestInput">controllers.DeviceRequestInput</h2>

<a id="schemacontrollers.devicerequestinput"></a>
<a id="schema_controllers.DeviceRequestInput"></a>
<a id="tocScontrollers.devicerequestinput"></a>
<a id="tocscontrollers.devicerequestinput"></a>

```json
{
  "building_id": 1,
  "household_ids": [
    1,
    2
  ],
  "location": "小区北门入口",
  "name": "门禁1号",
  "serial_number": "SN12345678",
  "staff_ids": [
    1,
    2,
    3
  ],
  "status": "online"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|building_id|integer|false|none||关联的楼号ID|
|household_ids|[integer]|false|none||关联的户号ID列表|
|location|string|false|none||none|
|name|string|true|none||none|
|serial_number|string|true|none||none|
|staff_ids|[integer]|false|none||关联的物业员工ID列表(可选)|
|status|string|false|none||online, offline, fault|

<h2 id="tocS_controllers.DeviceBuildingRequest">controllers.DeviceBuildingRequest</h2>

<a id="schemacontrollers.devicebuildingrequest"></a>
<a id="schema_controllers.DeviceBuildingRequest"></a>
<a id="tocScontrollers.devicebuildingrequest"></a>
<a id="tocscontrollers.devicebuildingrequest"></a>

```json
{
  "building_id": 1
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|building_id|integer|true|none||none|

<h2 id="tocS_controllers.DeviceStatusRequest">controllers.DeviceStatusRequest</h2>

<a id="schemacontrollers.devicestatusrequest"></a>
<a id="schema_controllers.DeviceStatusRequest"></a>
<a id="tocScontrollers.devicestatusrequest"></a>
<a id="tocscontrollers.devicestatusrequest"></a>

```json
{
  "battery": 85,
  "device_id": 1,
  "properties": {},
  "status": "online"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|battery|integer|false|none||none|
|device_id|integer|true|none||none|
|properties|object|false|none||none|
|status|string|false|none||none|

<h2 id="tocS_controllers.EmergencyAlarmRequest">controllers.EmergencyAlarmRequest</h2>

<a id="schemacontrollers.emergencyalarmrequest"></a>
<a id="schema_controllers.EmergencyAlarmRequest"></a>
<a id="tocScontrollers.emergencyalarmrequest"></a>
<a id="tocscontrollers.emergencyalarmrequest"></a>

```json
{
  "description": "火灾警报被触发，疑似厨房起火",
  "location": "Building A, Floor 3",
  "property_id": 1,
  "reported_by": 1,
  "type": "fire"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|description|string|false|none||none|
|location|string|true|none||none|
|property_id|integer|true|none||物业ID|
|reported_by|integer|false|none||报告人ID|
|type|string|true|none||如：fire(火灾)、intrusion(入侵)、medical(医疗)等|

<h2 id="tocS_controllers.DeviceHouseholdRequest">controllers.DeviceHouseholdRequest</h2>

<a id="schemacontrollers.devicehouseholdrequest"></a>
<a id="schema_controllers.DeviceHouseholdRequest"></a>
<a id="tocScontrollers.devicehouseholdrequest"></a>
<a id="tocscontrollers.devicehouseholdrequest"></a>

```json
{
  "household_id": 1
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|household_id|integer|true|none||none|

<h2 id="tocS_controllers.EmergencyNotificationRequest">controllers.EmergencyNotificationRequest</h2>

<a id="schemacontrollers.emergencynotificationrequest"></a>
<a id="schema_controllers.EmergencyNotificationRequest"></a>
<a id="tocScontrollers.emergencynotificationrequest"></a>
<a id="tocscontrollers.emergencynotificationrequest"></a>

```json
{
  "content": "A栋3楼发生火灾，请所有居民立即疏散。",
  "expires_at": "2023-07-01T15:00:00Z",
  "is_public": false,
  "property_id": 1,
  "severity": "high",
  "target_type": "all",
  "title": "紧急通知：小区火灾警报"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|content|string|true|none||none|
|expires_at|string|false|none||可选，不提供则默认24小时|
|is_public|boolean|false|none||是否为公开通知|
|property_id|integer|false|none||关联的物业ID，可以为空表示全局通知|
|severity|string|true|none||high, medium, low|
|target_type|string|false|none||all, residents, staff|
|title|string|true|none||none|

<h2 id="tocS_controllers.EmergencyUnlockRequest">controllers.EmergencyUnlockRequest</h2>

<a id="schemacontrollers.emergencyunlockrequest"></a>
<a id="schema_controllers.EmergencyUnlockRequest"></a>
<a id="tocScontrollers.emergencyunlockrequest"></a>
<a id="tocscontrollers.emergencyunlockrequest"></a>

```json
{
  "reason": "火灾疏散"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|reason|string|true|none||none|

<h2 id="tocS_controllers.EndCallSessionRequest">controllers.EndCallSessionRequest</h2>

<a id="schemacontrollers.endcallsessionrequest"></a>
<a id="schema_controllers.EndCallSessionRequest"></a>
<a id="tocScontrollers.endcallsessionrequest"></a>
<a id="tocscontrollers.endcallsessionrequest"></a>

```json
{
  "call_id": "mqtt-call-20250510-abcdef123456",
  "reason": "call_completed"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|call_id|string|true|none||none|
|reason|string|false|none||none|

<h2 id="tocS_controllers.ErrorResponse">controllers.ErrorResponse</h2>

<a id="schemacontrollers.errorresponse"></a>
<a id="schema_controllers.ErrorResponse"></a>
<a id="tocScontrollers.errorresponse"></a>
<a id="tocscontrollers.errorresponse"></a>

```json
{
  "code": 401,
  "data": "string",
  "message": "Invalid username or password"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||none|
|data|string|false|none||none|
|message|string|false|none||none|

<h2 id="tocS_controllers.GetUserSigRequest">controllers.GetUserSigRequest</h2>

<a id="schemacontrollers.getusersigrequest"></a>
<a id="schema_controllers.GetUserSigRequest"></a>
<a id="tocScontrollers.getusersigrequest"></a>
<a id="tocscontrollers.getusersigrequest"></a>

```json
{
  "user_id": "user123"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|user_id|string|true|none||none|

<h2 id="tocS_controllers.InitiateCallRequest">controllers.InitiateCallRequest</h2>

<a id="schemacontrollers.initiatecallrequest"></a>
<a id="schema_controllers.InitiateCallRequest"></a>
<a id="tocScontrollers.initiatecallrequest"></a>
<a id="tocscontrollers.initiatecallrequest"></a>

```json
{
  "device_id": "5",
  "household_number": "MQTT-101",
  "timestamp": 1651234567890
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|device_id|string|true|none||设备ID|
|household_number|string|false|none||可选，指定户号|
|timestamp|integer|false|none||可选时间戳|

<h2 id="tocS_controllers.InitiateCallResponse">controllers.InitiateCallResponse</h2>

<a id="schemacontrollers.initiatecallresponse"></a>
<a id="schema_controllers.InitiateCallResponse"></a>
<a id="tocScontrollers.initiatecallresponse"></a>
<a id="tocscontrollers.initiatecallresponse"></a>

```json
{
  "call_id": "mqtt-call-20250510-abcdef123456",
  "call_info": {
    "action": "answered",
    "call_id": "mqtt-call-20250510-abcdef123456",
    "reason": "user_busy",
    "timestamp": 1651234567890
  },
  "device_device_id": "5",
  "target_resident_ids": [
    "[\"6\"",
    "\"7\"]"
  ],
  "tencen_rtc": {
    "room_id": "room_5_6_1746870072",
    "room_id_type": "string",
    "sdk_app_id": 1400000001,
    "user_id": "5",
    "user_sig": "eJwtzM1Og0AUhmG..."
  },
  "timestamp": 1651234567890
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|call_id|string|false|none||none|
|call_info|[controllers.CallInfo](#schemacontrollers.callinfo)|false|none||none|
|device_device_id|string|false|none||none|
|target_resident_ids|[string]|false|none||none|
|tencen_rtc|[controllers.TRTCInfo](#schemacontrollers.trtcinfo)|false|none||none|
|timestamp|integer|false|none||none|

<h2 id="tocS_controllers.LoginData">controllers.LoginData</h2>

<a id="schemacontrollers.logindata"></a>
<a id="schema_controllers.LoginData"></a>
<a id="tocScontrollers.logindata"></a>
<a id="tocscontrollers.logindata"></a>

```json
{
  "created_at": "2023-01-01T00:00:00Z",
  "role": "admin",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user_id": 1,
  "username": "admin"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|created_at|string|false|none||none|
|role|string|false|none||none|
|token|string|false|none||none|
|user_id|integer|false|none||none|
|username|string|false|none||none|

<h2 id="tocS_controllers.HouseholdDeviceRequest">controllers.HouseholdDeviceRequest</h2>

<a id="schemacontrollers.householddevicerequest"></a>
<a id="schema_controllers.HouseholdDeviceRequest"></a>
<a id="tocScontrollers.householddevicerequest"></a>
<a id="tocscontrollers.householddevicerequest"></a>

```json
{
  "device_id": 1
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|device_id|integer|true|none||none|

<h2 id="tocS_controllers.LoginRequest">controllers.LoginRequest</h2>

<a id="schemacontrollers.loginrequest"></a>
<a id="schema_controllers.LoginRequest"></a>
<a id="tocScontrollers.loginrequest"></a>
<a id="tocscontrollers.loginrequest"></a>

```json
{
  "password": "admin123",
  "username": "admin"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|password|string|true|none||none|
|username|string|true|none||none|

<h2 id="tocS_controllers.HouseholdRequest">controllers.HouseholdRequest</h2>

<a id="schemacontrollers.householdrequest"></a>
<a id="schema_controllers.HouseholdRequest"></a>
<a id="tocScontrollers.householdrequest"></a>
<a id="tocscontrollers.householdrequest"></a>

```json
{
  "building_id": 1,
  "household_number": "1-1-101",
  "status": "active"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|building_id|integer|true|none||none|
|household_number|string|true|none||none|
|status|string|false|none||active, inactive|

<h2 id="tocS_controllers.LoginResponse">controllers.LoginResponse</h2>

<a id="schemacontrollers.loginresponse"></a>
<a id="schema_controllers.LoginResponse"></a>
<a id="tocScontrollers.loginresponse"></a>
<a id="tocscontrollers.loginresponse"></a>

```json
{
  "code": 0,
  "data": "string",
  "message": "Login successful"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||none|
|data|string|false|none||none|
|message|string|false|none||none|

<h2 id="tocS_controllers.PublishDeviceStatusRequest">controllers.PublishDeviceStatusRequest</h2>

<a id="schemacontrollers.publishdevicestatusrequest"></a>
<a id="schema_controllers.PublishDeviceStatusRequest"></a>
<a id="tocScontrollers.publishdevicestatusrequest"></a>
<a id="tocscontrollers.publishdevicestatusrequest"></a>

```json
{
  "battery": 85,
  "device_id": "5",
  "online": true,
  "properties": {}
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|battery|integer|false|none||none|
|device_id|string|true|none||none|
|online|boolean|false|none||none|
|properties|object|false|none||none|

<h2 id="tocS_controllers.PublishSystemMessageRequest">controllers.PublishSystemMessageRequest</h2>

<a id="schemacontrollers.publishsystemmessagerequest"></a>
<a id="schema_controllers.PublishSystemMessageRequest"></a>
<a id="tocScontrollers.publishsystemmessagerequest"></a>
<a id="tocscontrollers.publishsystemmessagerequest"></a>

```json
{
  "data": {},
  "level": "info",
  "message": "系统将于今晚22:00进行升级维护",
  "timestamp": 1651234567890,
  "type": "notification"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|data|object|false|none||none|
|level|string|true|none||none|
|message|string|true|none||none|
|timestamp|integer|false|none||none|
|type|string|true|none||none|

<h2 id="tocS_controllers.ResidentRequest">controllers.ResidentRequest</h2>

<a id="schemacontrollers.residentrequest"></a>
<a id="schema_controllers.ResidentRequest"></a>
<a id="tocScontrollers.residentrequest"></a>
<a id="tocscontrollers.residentrequest"></a>

```json
{
  "email": "zhangsan@resident.com",
  "household_id": 1,
  "name": "张三",
  "phone": "13812345678"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|email|string|false|none||none|
|household_id|integer|true|none||必填，关联的户号ID|
|name|string|true|none||none|
|phone|string|true|none||none|

<h2 id="tocS_controllers.TRTCInfo">controllers.TRTCInfo</h2>

<a id="schemacontrollers.trtcinfo"></a>
<a id="schema_controllers.TRTCInfo"></a>
<a id="tocScontrollers.trtcinfo"></a>
<a id="tocscontrollers.trtcinfo"></a>

```json
{
  "room_id": "room_5_6_1746870072",
  "room_id_type": "string",
  "sdk_app_id": 1400000001,
  "user_id": "5",
  "user_sig": "eJwtzM1Og0AUhmG..."
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|room_id|string|false|none||none|
|room_id_type|string|false|none||none|
|sdk_app_id|integer|false|none||none|
|user_id|string|false|none||none|
|user_sig|string|false|none||none|

<h2 id="tocS_controllers.TencentCallRequest">controllers.TencentCallRequest</h2>

<a id="schemacontrollers.tencentcallrequest"></a>
<a id="schema_controllers.TencentCallRequest"></a>
<a id="tocScontrollers.tencentcallrequest"></a>
<a id="tocscontrollers.tencentcallrequest"></a>

```json
{
  "device_id": "string",
  "resident_id": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|device_id|string|true|none||none|
|resident_id|string|true|none||none|

<h2 id="tocS_controllers.TokenRequest">controllers.TokenRequest</h2>

<a id="schemacontrollers.tokenrequest"></a>
<a id="schema_controllers.TokenRequest"></a>
<a id="tocScontrollers.tokenrequest"></a>
<a id="tocscontrollers.tokenrequest"></a>

```json
{
  "channel_id": "room123",
  "user_id": "user456"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|channel_id|string|true|none||none|
|user_id|string|true|none||none|

<h2 id="tocS_controllers.UpdateAdminRequest">controllers.UpdateAdminRequest</h2>

<a id="schemacontrollers.updateadminrequest"></a>
<a id="schema_controllers.UpdateAdminRequest"></a>
<a id="tocScontrollers.updateadminrequest"></a>
<a id="tocscontrollers.updateadminrequest"></a>

```json
{
  "email": "admin@example.com",
  "password": "NewPassword@123",
  "phone": "13800138000"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|email|string|false|none||none|
|password|string|false|none||none|
|phone|string|false|none||none|

<h2 id="tocS_controllers.UpdateResidentRequest">controllers.UpdateResidentRequest</h2>

<a id="schemacontrollers.updateresidentrequest"></a>
<a id="schema_controllers.UpdateResidentRequest"></a>
<a id="tocScontrollers.updateresidentrequest"></a>
<a id="tocscontrollers.updateresidentrequest"></a>

```json
{
  "email": "lisi@resident.com",
  "household_id": 1,
  "name": "李四",
  "phone": "13987654321"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|email|string|false|none||none|
|household_id|integer|false|none||可选，关联的户号ID，使用指针允许设置为null|
|name|string|false|none||none|
|phone|string|false|none||none|

<h2 id="tocS_controllers.UpdateStaffRequest">controllers.UpdateStaffRequest</h2>

<a id="schemacontrollers.updatestaffrequest"></a>
<a id="schema_controllers.UpdateStaffRequest"></a>
<a id="tocScontrollers.updatestaffrequest"></a>
<a id="tocscontrollers.updatestaffrequest"></a>

```json
{
  "device_ids": [
    1,
    3,
    5
  ],
  "name": "李物业",
  "password": "NewProperty@456",
  "phone": "13700005678",
  "position": "前台客服",
  "property_name": "幸福家园小区",
  "remark": "负责接待访客和处理居民投诉",
  "role": "staff",
  "status": "active",
  "username": "liwuye"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|device_ids|[integer]|false|none||更新关联的设备ID列表|
|name|string|false|none||none|
|password|string|false|none||none|
|phone|string|false|none||none|
|position|string|false|none||none|
|property_name|string|false|none||none|
|remark|string|false|none||none|
|role|string|false|none||可选值: manager, staff, security|
|status|string|false|none||可选值: active, inactive, suspended|
|username|string|false|none||none|

<h2 id="tocS_models.AccessLog">models.AccessLog</h2>

<a id="schemamodels.accesslog"></a>
<a id="schema_models.AccessLog"></a>
<a id="tocSmodels.accesslog"></a>
<a id="tocsmodels.accesslog"></a>

```json
{
  "device": {
    "access_logs": [
      {
        "device": null,
        "device_id": 0,
        "id": 0,
        "method": "[",
        "resident": {},
        "resident_id": 0,
        "result": "[",
        "timestamp": "string"
      }
    ],
    "building": {
      "address": null,
      "building_code": null,
      "building_name": null,
      "created_at": null,
      "devices": null,
      "households": null,
      "id": null,
      "status": null,
      "updated_at": null
    },
    "building_id": 0,
    "call_records": [
      {
        "call_id": "string",
        "call_status": "[",
        "created_at": "string",
        "device": null,
        "device_id": 0,
        "duration": 0,
        "id": 0,
        "resident": {},
        "resident_id": 0,
        "timestamp": "string",
        "updated_at": "string"
      }
    ],
    "created_at": "string",
    "emergency_logs": [
      {
        "device": null,
        "device_id": 0,
        "id": 0,
        "resident": {},
        "resident_id": 0,
        "resolved_at": "string",
        "status": "[",
        "triggered_at": "string"
      }
    ],
    "household": {
      "building": null,
      "building_id": null,
      "created_at": null,
      "devices": null,
      "household_number": null,
      "id": null,
      "residents": null,
      "status": null,
      "updated_at": null
    },
    "household_id": 0,
    "id": 0,
    "location": "string",
    "name": "string",
    "serial_number": "string",
    "staff": [
      {
        "created_at": "string",
        "devices": [
          null
        ],
        "id": 0,
        "phone": "string",
        "position": "string",
        "property_name": "string",
        "remark": "string",
        "role": "string",
        "status": "string",
        "updated_at": "string",
        "username": "string"
      }
    ],
    "status": "online",
    "updated_at": "string"
  },
  "device_id": 0,
  "id": 0,
  "method": "remote",
  "resident": {
    "access_logs": [
      {
        "device": {},
        "device_id": 0,
        "id": 0,
        "method": "remote",
        "resident": {
          "access_logs": [
            null
          ],
          "call_records": [
            null
          ],
          "created_at": "string",
          "email": "string",
          "emergency_logs": [
            null
          ],
          "household": null,
          "household_id": 0,
          "id": 0,
          "name": "string",
          "phone": "string",
          "updated_at": "string"
        },
        "resident_id": 0,
        "result": "success",
        "timestamp": "string"
      }
    ],
    "call_records": [
      {
        "call_id": "string",
        "call_status": "answered",
        "created_at": "string",
        "device": {},
        "device_id": 0,
        "duration": 0,
        "id": 0,
        "resident": {
          "access_logs": [
            null
          ],
          "call_records": [
            null
          ],
          "created_at": "string",
          "email": "string",
          "emergency_logs": [
            null
          ],
          "household": null,
          "household_id": 0,
          "id": 0,
          "name": "string",
          "phone": "string",
          "updated_at": "string"
        },
        "resident_id": 0,
        "timestamp": "string",
        "updated_at": "string"
      }
    ],
    "created_at": "string",
    "email": "string",
    "emergency_logs": [
      {
        "device": {},
        "device_id": 0,
        "id": 0,
        "resident": {
          "access_logs": [
            null
          ],
          "call_records": [
            null
          ],
          "created_at": "string",
          "email": "string",
          "emergency_logs": [
            null
          ],
          "household": null,
          "household_id": 0,
          "id": 0,
          "name": "string",
          "phone": "string",
          "updated_at": "string"
        },
        "resident_id": 0,
        "resolved_at": "string",
        "status": "pending",
        "triggered_at": "string"
      }
    ],
    "household": {
      "building": null,
      "building_id": 0,
      "created_at": "string",
      "devices": [
        {}
      ],
      "household_number": "string",
      "id": 0,
      "residents": [
        {}
      ],
      "status": "string",
      "updated_at": "string"
    },
    "household_id": 0,
    "id": 0,
    "name": "string",
    "phone": "string",
    "updated_at": "string"
  },
  "resident_id": 0,
  "result": "success",
  "timestamp": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|device|[models.Device](#schemamodels.device)|false|none||Relations|
|device_id|integer|false|none||none|
|id|integer|false|none||none|
|method|[models.AccessMethod](#schemamodels.accessmethod)|false|none||none|
|resident|[models.Resident](#schemamodels.resident)|false|none||none|
|resident_id|integer|false|none||none|
|result|[models.AccessResult](#schemamodels.accessresult)|false|none||none|
|timestamp|string|false|none||none|

<h2 id="tocS_models.AccessMethod">models.AccessMethod</h2>

<a id="schemamodels.accessmethod"></a>
<a id="schema_models.AccessMethod"></a>
<a id="tocSmodels.accessmethod"></a>
<a id="tocsmodels.accessmethod"></a>

```json
"remote"

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|*anonymous*|string|false|none||none|

#### 枚举值

|属性|值|
|---|---|
|*anonymous*|remote|
|*anonymous*|code|
|*anonymous*|face|
|*anonymous*|fingerprint|

<h2 id="tocS_models.AccessResult">models.AccessResult</h2>

<a id="schemamodels.accessresult"></a>
<a id="schema_models.AccessResult"></a>
<a id="tocSmodels.accessresult"></a>
<a id="tocsmodels.accessresult"></a>

```json
"success"

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|*anonymous*|string|false|none||none|

#### 枚举值

|属性|值|
|---|---|
|*anonymous*|success|
|*anonymous*|failure|

<h2 id="tocS_models.CallRecord">models.CallRecord</h2>

<a id="schemamodels.callrecord"></a>
<a id="schema_models.CallRecord"></a>
<a id="tocSmodels.callrecord"></a>
<a id="tocsmodels.callrecord"></a>

```json
{
  "call_id": "string",
  "call_status": "answered",
  "created_at": "string",
  "device": {
    "access_logs": [
      {
        "device": null,
        "device_id": 0,
        "id": 0,
        "method": "[",
        "resident": {},
        "resident_id": 0,
        "result": "[",
        "timestamp": "string"
      }
    ],
    "building": {
      "address": null,
      "building_code": null,
      "building_name": null,
      "created_at": null,
      "devices": null,
      "households": null,
      "id": null,
      "status": null,
      "updated_at": null
    },
    "building_id": 0,
    "call_records": [
      {
        "call_id": "string",
        "call_status": "[",
        "created_at": "string",
        "device": null,
        "device_id": 0,
        "duration": 0,
        "id": 0,
        "resident": {},
        "resident_id": 0,
        "timestamp": "string",
        "updated_at": "string"
      }
    ],
    "created_at": "string",
    "emergency_logs": [
      {
        "device": null,
        "device_id": 0,
        "id": 0,
        "resident": {},
        "resident_id": 0,
        "resolved_at": "string",
        "status": "[",
        "triggered_at": "string"
      }
    ],
    "household": {
      "building": null,
      "building_id": null,
      "created_at": null,
      "devices": null,
      "household_number": null,
      "id": null,
      "residents": null,
      "status": null,
      "updated_at": null
    },
    "household_id": 0,
    "id": 0,
    "location": "string",
    "name": "string",
    "serial_number": "string",
    "staff": [
      {
        "created_at": "string",
        "devices": [
          null
        ],
        "id": 0,
        "phone": "string",
        "position": "string",
        "property_name": "string",
        "remark": "string",
        "role": "string",
        "status": "string",
        "updated_at": "string",
        "username": "string"
      }
    ],
    "status": "online",
    "updated_at": "string"
  },
  "device_id": 0,
  "duration": 0,
  "id": 0,
  "resident": {
    "access_logs": [
      {
        "device": {},
        "device_id": 0,
        "id": 0,
        "method": "remote",
        "resident": {
          "access_logs": [
            null
          ],
          "call_records": [
            null
          ],
          "created_at": "string",
          "email": "string",
          "emergency_logs": [
            null
          ],
          "household": null,
          "household_id": 0,
          "id": 0,
          "name": "string",
          "phone": "string",
          "updated_at": "string"
        },
        "resident_id": 0,
        "result": "success",
        "timestamp": "string"
      }
    ],
    "call_records": [
      {
        "call_id": "string",
        "call_status": "answered",
        "created_at": "string",
        "device": {},
        "device_id": 0,
        "duration": 0,
        "id": 0,
        "resident": {
          "access_logs": [
            null
          ],
          "call_records": [
            null
          ],
          "created_at": "string",
          "email": "string",
          "emergency_logs": [
            null
          ],
          "household": null,
          "household_id": 0,
          "id": 0,
          "name": "string",
          "phone": "string",
          "updated_at": "string"
        },
        "resident_id": 0,
        "timestamp": "string",
        "updated_at": "string"
      }
    ],
    "created_at": "string",
    "email": "string",
    "emergency_logs": [
      {
        "device": {},
        "device_id": 0,
        "id": 0,
        "resident": {
          "access_logs": [
            null
          ],
          "call_records": [
            null
          ],
          "created_at": "string",
          "email": "string",
          "emergency_logs": [
            null
          ],
          "household": null,
          "household_id": 0,
          "id": 0,
          "name": "string",
          "phone": "string",
          "updated_at": "string"
        },
        "resident_id": 0,
        "resolved_at": "string",
        "status": "pending",
        "triggered_at": "string"
      }
    ],
    "household": {
      "building": null,
      "building_id": 0,
      "created_at": "string",
      "devices": [
        {}
      ],
      "household_number": "string",
      "id": 0,
      "residents": [
        {}
      ],
      "status": "string",
      "updated_at": "string"
    },
    "household_id": 0,
    "id": 0,
    "name": "string",
    "phone": "string",
    "updated_at": "string"
  },
  "resident_id": 0,
  "timestamp": "string",
  "updated_at": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|call_id|string|false|none||通话唯一标识|
|call_status|[models.CallStatus](#schemamodels.callstatus)|false|none||none|
|created_at|string|false|none||none|
|device|[models.Device](#schemamodels.device)|false|none||Relations|
|device_id|integer|false|none||none|
|duration|integer|false|none||通话时长|
|id|integer|false|none||none|
|resident|[models.Resident](#schemamodels.resident)|false|none||none|
|resident_id|integer|false|none||none|
|timestamp|string|false|none||通话开始时间|
|updated_at|string|false|none||none|

<h2 id="tocS_models.Device">models.Device</h2>

<a id="schemamodels.device"></a>
<a id="schema_models.Device"></a>
<a id="tocSmodels.device"></a>
<a id="tocsmodels.device"></a>

```json
{
  "access_logs": [
    {
      "device": {
        "access_logs": [
          null
        ],
        "building": null,
        "building_id": 0,
        "call_records": [
          null
        ],
        "created_at": "string",
        "emergency_logs": [
          null
        ],
        "household": null,
        "household_id": 0,
        "id": 0,
        "location": "string",
        "name": "string",
        "serial_number": "string",
        "staff": [
          null
        ],
        "status": "[",
        "updated_at": "string"
      },
      "device_id": 0,
      "id": 0,
      "method": "remote",
      "resident": {
        "access_logs": [
          {
            "device": null,
            "device_id": null,
            "id": null,
            "method": null,
            "resident": null,
            "resident_id": null,
            "result": null,
            "timestamp": null
          }
        ],
        "call_records": [
          {
            "call_id": null,
            "call_status": null,
            "created_at": null,
            "device": null,
            "device_id": null,
            "duration": null,
            "id": null,
            "resident": null,
            "resident_id": null,
            "timestamp": null,
            "updated_at": null
          }
        ],
        "created_at": "string",
        "email": "string",
        "emergency_logs": [
          {
            "device": null,
            "device_id": null,
            "id": null,
            "resident": null,
            "resident_id": null,
            "resolved_at": null,
            "status": null,
            "triggered_at": null
          }
        ],
        "household": {},
        "household_id": 0,
        "id": 0,
        "name": "string",
        "phone": "string",
        "updated_at": "string"
      },
      "resident_id": 0,
      "result": "success",
      "timestamp": "string"
    }
  ],
  "building": {
    "address": "string",
    "building_code": "string",
    "building_name": "string",
    "created_at": "string",
    "devices": [
      {
        "access_logs": [
          null
        ],
        "building": null,
        "building_id": 0,
        "call_records": [
          null
        ],
        "created_at": "string",
        "emergency_logs": [
          null
        ],
        "household": null,
        "household_id": 0,
        "id": 0,
        "location": "string",
        "name": "string",
        "serial_number": "string",
        "staff": [
          null
        ],
        "status": "[",
        "updated_at": "string"
      }
    ],
    "households": [
      {
        "building": null,
        "building_id": 0,
        "created_at": "string",
        "devices": [
          null
        ],
        "household_number": "string",
        "id": 0,
        "residents": [
          null
        ],
        "status": "string",
        "updated_at": "string"
      }
    ],
    "id": 0,
    "status": "string",
    "updated_at": "string"
  },
  "building_id": 0,
  "call_records": [
    {
      "call_id": "string",
      "call_status": "answered",
      "created_at": "string",
      "device": {
        "access_logs": [
          null
        ],
        "building": null,
        "building_id": 0,
        "call_records": [
          null
        ],
        "created_at": "string",
        "emergency_logs": [
          null
        ],
        "household": null,
        "household_id": 0,
        "id": 0,
        "location": "string",
        "name": "string",
        "serial_number": "string",
        "staff": [
          null
        ],
        "status": "[",
        "updated_at": "string"
      },
      "device_id": 0,
      "duration": 0,
      "id": 0,
      "resident": {
        "access_logs": [
          {
            "device": null,
            "device_id": null,
            "id": null,
            "method": null,
            "resident": null,
            "resident_id": null,
            "result": null,
            "timestamp": null
          }
        ],
        "call_records": [
          {
            "call_id": null,
            "call_status": null,
            "created_at": null,
            "device": null,
            "device_id": null,
            "duration": null,
            "id": null,
            "resident": null,
            "resident_id": null,
            "timestamp": null,
            "updated_at": null
          }
        ],
        "created_at": "string",
        "email": "string",
        "emergency_logs": [
          {
            "device": null,
            "device_id": null,
            "id": null,
            "resident": null,
            "resident_id": null,
            "resolved_at": null,
            "status": null,
            "triggered_at": null
          }
        ],
        "household": {},
        "household_id": 0,
        "id": 0,
        "name": "string",
        "phone": "string",
        "updated_at": "string"
      },
      "resident_id": 0,
      "timestamp": "string",
      "updated_at": "string"
    }
  ],
  "created_at": "string",
  "emergency_logs": [
    {
      "device": {
        "access_logs": [
          null
        ],
        "building": null,
        "building_id": 0,
        "call_records": [
          null
        ],
        "created_at": "string",
        "emergency_logs": [
          null
        ],
        "household": null,
        "household_id": 0,
        "id": 0,
        "location": "string",
        "name": "string",
        "serial_number": "string",
        "staff": [
          null
        ],
        "status": "[",
        "updated_at": "string"
      },
      "device_id": 0,
      "id": 0,
      "resident": {
        "access_logs": [
          {
            "device": null,
            "device_id": null,
            "id": null,
            "method": null,
            "resident": null,
            "resident_id": null,
            "result": null,
            "timestamp": null
          }
        ],
        "call_records": [
          {
            "call_id": null,
            "call_status": null,
            "created_at": null,
            "device": null,
            "device_id": null,
            "duration": null,
            "id": null,
            "resident": null,
            "resident_id": null,
            "timestamp": null,
            "updated_at": null
          }
        ],
        "created_at": "string",
        "email": "string",
        "emergency_logs": [
          {
            "device": null,
            "device_id": null,
            "id": null,
            "resident": null,
            "resident_id": null,
            "resolved_at": null,
            "status": null,
            "triggered_at": null
          }
        ],
        "household": {},
        "household_id": 0,
        "id": 0,
        "name": "string",
        "phone": "string",
        "updated_at": "string"
      },
      "resident_id": 0,
      "resolved_at": "string",
      "status": "pending",
      "triggered_at": "string"
    }
  ],
  "household": {
    "building": {
      "address": null,
      "building_code": null,
      "building_name": null,
      "created_at": null,
      "devices": null,
      "households": null,
      "id": null,
      "status": null,
      "updated_at": null
    },
    "building_id": 0,
    "created_at": "string",
    "devices": [
      {
        "access_logs": [
          null
        ],
        "building": null,
        "building_id": 0,
        "call_records": [
          null
        ],
        "created_at": "string",
        "emergency_logs": [
          null
        ],
        "household": null,
        "household_id": 0,
        "id": 0,
        "location": "string",
        "name": "string",
        "serial_number": "string",
        "staff": [
          null
        ],
        "status": "[",
        "updated_at": "string"
      }
    ],
    "household_number": "string",
    "id": 0,
    "residents": [
      {
        "access_logs": [
          null
        ],
        "call_records": [
          null
        ],
        "created_at": "string",
        "email": "string",
        "emergency_logs": [
          null
        ],
        "household": null,
        "household_id": 0,
        "id": 0,
        "name": "string",
        "phone": "string",
        "updated_at": "string"
      }
    ],
    "status": "string",
    "updated_at": "string"
  },
  "household_id": 0,
  "id": 0,
  "location": "string",
  "name": "string",
  "serial_number": "string",
  "staff": [
    {
      "created_at": "string",
      "devices": [
        {
          "access_logs": [
            {}
          ],
          "building": null,
          "building_id": 0,
          "call_records": [
            {}
          ],
          "created_at": "string",
          "emergency_logs": [
            {}
          ],
          "household": null,
          "household_id": 0,
          "id": 0,
          "location": "string",
          "name": "string",
          "serial_number": "string",
          "staff": [
            {}
          ],
          "status": "online",
          "updated_at": "string"
        }
      ],
      "id": 0,
      "phone": "string",
      "position": "string",
      "property_name": "string",
      "remark": "string",
      "role": "string",
      "status": "string",
      "updated_at": "string",
      "username": "string"
    }
  ],
  "status": "online",
  "updated_at": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|access_logs|[[models.AccessLog](#schemamodels.accesslog)]|false|none||none|
|building|[models.Building](#schemamodels.building)|false|none||关联的楼号（多对一）|
|building_id|integer|false|none||关联的楼号ID|
|call_records|[[models.CallRecord](#schemamodels.callrecord)]|false|none||none|
|created_at|string|false|none||none|
|emergency_logs|[[models.EmergencyLog](#schemamodels.emergencylog)]|false|none||none|
|household|[models.Household](#schemamodels.household)|false|none||关联的户号（多对一）|
|household_id|integer|false|none||关联的户号ID|
|id|integer|false|none||none|
|location|string|false|none||none|
|name|string|false|none||none|
|serial_number|string|false|none||none|
|staff|[[models.PropertyStaff](#schemamodels.propertystaff)]|false|none||Relations - 关联关系|
|status|[models.DeviceStatus](#schemamodels.devicestatus)|false|none||none|
|updated_at|string|false|none||none|

<h2 id="tocS_models.DeviceStatus">models.DeviceStatus</h2>

<a id="schemamodels.devicestatus"></a>
<a id="schema_models.DeviceStatus"></a>
<a id="tocSmodels.devicestatus"></a>
<a id="tocsmodels.devicestatus"></a>

```json
"online"

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|*anonymous*|string|false|none||none|

#### 枚举值

|属性|值|
|---|---|
|*anonymous*|online|
|*anonymous*|offline|
|*anonymous*|fault|

<h2 id="tocS_models.EmergencyLog">models.EmergencyLog</h2>

<a id="schemamodels.emergencylog"></a>
<a id="schema_models.EmergencyLog"></a>
<a id="tocSmodels.emergencylog"></a>
<a id="tocsmodels.emergencylog"></a>

```json
{
  "device": {
    "access_logs": [
      {
        "device": null,
        "device_id": 0,
        "id": 0,
        "method": "[",
        "resident": {},
        "resident_id": 0,
        "result": "[",
        "timestamp": "string"
      }
    ],
    "building": {
      "address": null,
      "building_code": null,
      "building_name": null,
      "created_at": null,
      "devices": null,
      "households": null,
      "id": null,
      "status": null,
      "updated_at": null
    },
    "building_id": 0,
    "call_records": [
      {
        "call_id": "string",
        "call_status": "[",
        "created_at": "string",
        "device": null,
        "device_id": 0,
        "duration": 0,
        "id": 0,
        "resident": {},
        "resident_id": 0,
        "timestamp": "string",
        "updated_at": "string"
      }
    ],
    "created_at": "string",
    "emergency_logs": [
      {
        "device": null,
        "device_id": 0,
        "id": 0,
        "resident": {},
        "resident_id": 0,
        "resolved_at": "string",
        "status": "[",
        "triggered_at": "string"
      }
    ],
    "household": {
      "building": null,
      "building_id": null,
      "created_at": null,
      "devices": null,
      "household_number": null,
      "id": null,
      "residents": null,
      "status": null,
      "updated_at": null
    },
    "household_id": 0,
    "id": 0,
    "location": "string",
    "name": "string",
    "serial_number": "string",
    "staff": [
      {
        "created_at": "string",
        "devices": [
          null
        ],
        "id": 0,
        "phone": "string",
        "position": "string",
        "property_name": "string",
        "remark": "string",
        "role": "string",
        "status": "string",
        "updated_at": "string",
        "username": "string"
      }
    ],
    "status": "online",
    "updated_at": "string"
  },
  "device_id": 0,
  "id": 0,
  "resident": {
    "access_logs": [
      {
        "device": {},
        "device_id": 0,
        "id": 0,
        "method": "remote",
        "resident": {
          "access_logs": [
            null
          ],
          "call_records": [
            null
          ],
          "created_at": "string",
          "email": "string",
          "emergency_logs": [
            null
          ],
          "household": null,
          "household_id": 0,
          "id": 0,
          "name": "string",
          "phone": "string",
          "updated_at": "string"
        },
        "resident_id": 0,
        "result": "success",
        "timestamp": "string"
      }
    ],
    "call_records": [
      {
        "call_id": "string",
        "call_status": "answered",
        "created_at": "string",
        "device": {},
        "device_id": 0,
        "duration": 0,
        "id": 0,
        "resident": {
          "access_logs": [
            null
          ],
          "call_records": [
            null
          ],
          "created_at": "string",
          "email": "string",
          "emergency_logs": [
            null
          ],
          "household": null,
          "household_id": 0,
          "id": 0,
          "name": "string",
          "phone": "string",
          "updated_at": "string"
        },
        "resident_id": 0,
        "timestamp": "string",
        "updated_at": "string"
      }
    ],
    "created_at": "string",
    "email": "string",
    "emergency_logs": [
      {
        "device": {},
        "device_id": 0,
        "id": 0,
        "resident": {
          "access_logs": [
            null
          ],
          "call_records": [
            null
          ],
          "created_at": "string",
          "email": "string",
          "emergency_logs": [
            null
          ],
          "household": null,
          "household_id": 0,
          "id": 0,
          "name": "string",
          "phone": "string",
          "updated_at": "string"
        },
        "resident_id": 0,
        "resolved_at": "string",
        "status": "pending",
        "triggered_at": "string"
      }
    ],
    "household": {
      "building": null,
      "building_id": 0,
      "created_at": "string",
      "devices": [
        {}
      ],
      "household_number": "string",
      "id": 0,
      "residents": [
        {}
      ],
      "status": "string",
      "updated_at": "string"
    },
    "household_id": 0,
    "id": 0,
    "name": "string",
    "phone": "string",
    "updated_at": "string"
  },
  "resident_id": 0,
  "resolved_at": "string",
  "status": "pending",
  "triggered_at": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|device|[models.Device](#schemamodels.device)|false|none||Relations|
|device_id|integer|false|none||none|
|id|integer|false|none||none|
|resident|[models.Resident](#schemamodels.resident)|false|none||none|
|resident_id|integer|false|none||none|
|resolved_at|string|false|none||可空字段|
|status|[models.EmergencyStatus](#schemamodels.emergencystatus)|false|none||none|
|triggered_at|string|false|none||none|

<h2 id="tocS_models.EmergencyStatus">models.EmergencyStatus</h2>

<a id="schemamodels.emergencystatus"></a>
<a id="schema_models.EmergencyStatus"></a>
<a id="tocSmodels.emergencystatus"></a>
<a id="tocsmodels.emergencystatus"></a>

```json
"pending"

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|*anonymous*|string|false|none||none|

#### 枚举值

|属性|值|
|---|---|
|*anonymous*|pending|
|*anonymous*|responded|
|*anonymous*|escalated|
|*anonymous*|resolved|

<h2 id="tocS_models.Building">models.Building</h2>

<a id="schemamodels.building"></a>
<a id="schema_models.Building"></a>
<a id="tocSmodels.building"></a>
<a id="tocsmodels.building"></a>

```json
{
  "address": "string",
  "building_code": "string",
  "building_name": "string",
  "created_at": "string",
  "devices": [
    {
      "access_logs": [
        {
          "device": null,
          "device_id": 0,
          "id": 0,
          "method": "remote",
          "resident": {
            "access_logs": null,
            "call_records": null,
            "created_at": null,
            "email": null,
            "emergency_logs": null,
            "household": null,
            "household_id": null,
            "id": null,
            "name": null,
            "phone": null,
            "updated_at": null
          },
          "resident_id": 0,
          "result": "success",
          "timestamp": "string"
        }
      ],
      "building": {
        "address": "string",
        "building_code": "string",
        "building_name": "string",
        "created_at": "string",
        "devices": [
          null
        ],
        "households": [
          null
        ],
        "id": 0,
        "status": "string",
        "updated_at": "string"
      },
      "building_id": 0,
      "call_records": [
        {
          "call_id": "string",
          "call_status": "answered",
          "created_at": "string",
          "device": null,
          "device_id": 0,
          "duration": 0,
          "id": 0,
          "resident": {
            "access_logs": null,
            "call_records": null,
            "created_at": null,
            "email": null,
            "emergency_logs": null,
            "household": null,
            "household_id": null,
            "id": null,
            "name": null,
            "phone": null,
            "updated_at": null
          },
          "resident_id": 0,
          "timestamp": "string",
          "updated_at": "string"
        }
      ],
      "created_at": "string",
      "emergency_logs": [
        {
          "device": null,
          "device_id": 0,
          "id": 0,
          "resident": {
            "access_logs": null,
            "call_records": null,
            "created_at": null,
            "email": null,
            "emergency_logs": null,
            "household": null,
            "household_id": null,
            "id": null,
            "name": null,
            "phone": null,
            "updated_at": null
          },
          "resident_id": 0,
          "resolved_at": "string",
          "status": "pending",
          "triggered_at": "string"
        }
      ],
      "household": {
        "building": null,
        "building_id": 0,
        "created_at": "string",
        "devices": [
          null
        ],
        "household_number": "string",
        "id": 0,
        "residents": [
          null
        ],
        "status": "string",
        "updated_at": "string"
      },
      "household_id": 0,
      "id": 0,
      "location": "string",
      "name": "string",
      "serial_number": "string",
      "staff": [
        {
          "created_at": "string",
          "devices": [
            {}
          ],
          "id": 0,
          "phone": "string",
          "position": "string",
          "property_name": "string",
          "remark": "string",
          "role": "string",
          "status": "string",
          "updated_at": "string",
          "username": "string"
        }
      ],
      "status": "online",
      "updated_at": "string"
    }
  ],
  "households": [
    {
      "building": {
        "address": "string",
        "building_code": "string",
        "building_name": "string",
        "created_at": "string",
        "devices": [
          null
        ],
        "households": [
          null
        ],
        "id": 0,
        "status": "string",
        "updated_at": "string"
      },
      "building_id": 0,
      "created_at": "string",
      "devices": [
        {
          "access_logs": [
            {}
          ],
          "building": null,
          "building_id": 0,
          "call_records": [
            {}
          ],
          "created_at": "string",
          "emergency_logs": [
            {}
          ],
          "household": null,
          "household_id": 0,
          "id": 0,
          "location": "string",
          "name": "string",
          "serial_number": "string",
          "staff": [
            {}
          ],
          "status": "online",
          "updated_at": "string"
        }
      ],
      "household_number": "string",
      "id": 0,
      "residents": [
        {
          "access_logs": [
            {}
          ],
          "call_records": [
            {}
          ],
          "created_at": "string",
          "email": "string",
          "emergency_logs": [
            {}
          ],
          "household": null,
          "household_id": 0,
          "id": 0,
          "name": "string",
          "phone": "string",
          "updated_at": "string"
        }
      ],
      "status": "string",
      "updated_at": "string"
    }
  ],
  "id": 0,
  "status": "string",
  "updated_at": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|address|string|false|none||楼号地址，如"小区东南角"|
|building_code|string|false|none||楼号编码，如"B001"|
|building_name|string|false|none||楼号名称，如"1号楼"|
|created_at|string|false|none||none|
|devices|[[models.Device](#schemamodels.device)]|false|none||楼号关联的设备（一对多）|
|households|[[models.Household](#schemamodels.household)]|false|none||关联关系|
|id|integer|false|none||none|
|status|string|false|none||状态：active, inactive|
|updated_at|string|false|none||none|

<h2 id="tocS_models.PropertyStaff">models.PropertyStaff</h2>

<a id="schemamodels.propertystaff"></a>
<a id="schema_models.PropertyStaff"></a>
<a id="tocSmodels.propertystaff"></a>
<a id="tocsmodels.propertystaff"></a>

```json
{
  "created_at": "string",
  "devices": [
    {
      "access_logs": [
        {
          "device": null,
          "device_id": 0,
          "id": 0,
          "method": "remote",
          "resident": {
            "access_logs": null,
            "call_records": null,
            "created_at": null,
            "email": null,
            "emergency_logs": null,
            "household": null,
            "household_id": null,
            "id": null,
            "name": null,
            "phone": null,
            "updated_at": null
          },
          "resident_id": 0,
          "result": "success",
          "timestamp": "string"
        }
      ],
      "building": {
        "address": "string",
        "building_code": "string",
        "building_name": "string",
        "created_at": "string",
        "devices": [
          null
        ],
        "households": [
          null
        ],
        "id": 0,
        "status": "string",
        "updated_at": "string"
      },
      "building_id": 0,
      "call_records": [
        {
          "call_id": "string",
          "call_status": "answered",
          "created_at": "string",
          "device": null,
          "device_id": 0,
          "duration": 0,
          "id": 0,
          "resident": {
            "access_logs": null,
            "call_records": null,
            "created_at": null,
            "email": null,
            "emergency_logs": null,
            "household": null,
            "household_id": null,
            "id": null,
            "name": null,
            "phone": null,
            "updated_at": null
          },
          "resident_id": 0,
          "timestamp": "string",
          "updated_at": "string"
        }
      ],
      "created_at": "string",
      "emergency_logs": [
        {
          "device": null,
          "device_id": 0,
          "id": 0,
          "resident": {
            "access_logs": null,
            "call_records": null,
            "created_at": null,
            "email": null,
            "emergency_logs": null,
            "household": null,
            "household_id": null,
            "id": null,
            "name": null,
            "phone": null,
            "updated_at": null
          },
          "resident_id": 0,
          "resolved_at": "string",
          "status": "pending",
          "triggered_at": "string"
        }
      ],
      "household": {
        "building": null,
        "building_id": 0,
        "created_at": "string",
        "devices": [
          null
        ],
        "household_number": "string",
        "id": 0,
        "residents": [
          null
        ],
        "status": "string",
        "updated_at": "string"
      },
      "household_id": 0,
      "id": 0,
      "location": "string",
      "name": "string",
      "serial_number": "string",
      "staff": [
        {
          "created_at": "string",
          "devices": [
            {}
          ],
          "id": 0,
          "phone": "string",
          "position": "string",
          "property_name": "string",
          "remark": "string",
          "role": "string",
          "status": "string",
          "updated_at": "string",
          "username": "string"
        }
      ],
      "status": "online",
      "updated_at": "string"
    }
  ],
  "id": 0,
  "phone": "string",
  "position": "string",
  "property_name": "string",
  "remark": "string",
  "role": "string",
  "status": "string",
  "updated_at": "string",
  "username": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|created_at|string|false|none||none|
|devices|[[models.Device](#schemamodels.device)]|false|none||关联关系 - 使用多对多关系替代直接关联|
|id|integer|false|none||none|
|phone|string|false|none||none|
|position|string|false|none||none|
|property_name|string|false|none||none|
|remark|string|false|none||none|
|role|string|false|none||manager, staff, etc.|
|status|string|false|none||none|
|updated_at|string|false|none||none|
|username|string|false|none||none|

<h2 id="tocS_models.Resident">models.Resident</h2>

<a id="schemamodels.resident"></a>
<a id="schema_models.Resident"></a>
<a id="tocSmodels.resident"></a>
<a id="tocsmodels.resident"></a>

```json
{
  "access_logs": [
    {
      "device": {
        "access_logs": [
          null
        ],
        "building": null,
        "building_id": 0,
        "call_records": [
          null
        ],
        "created_at": "string",
        "emergency_logs": [
          null
        ],
        "household": null,
        "household_id": 0,
        "id": 0,
        "location": "string",
        "name": "string",
        "serial_number": "string",
        "staff": [
          null
        ],
        "status": "[",
        "updated_at": "string"
      },
      "device_id": 0,
      "id": 0,
      "method": "remote",
      "resident": {
        "access_logs": [
          {
            "device": null,
            "device_id": null,
            "id": null,
            "method": null,
            "resident": null,
            "resident_id": null,
            "result": null,
            "timestamp": null
          }
        ],
        "call_records": [
          {
            "call_id": null,
            "call_status": null,
            "created_at": null,
            "device": null,
            "device_id": null,
            "duration": null,
            "id": null,
            "resident": null,
            "resident_id": null,
            "timestamp": null,
            "updated_at": null
          }
        ],
        "created_at": "string",
        "email": "string",
        "emergency_logs": [
          {
            "device": null,
            "device_id": null,
            "id": null,
            "resident": null,
            "resident_id": null,
            "resolved_at": null,
            "status": null,
            "triggered_at": null
          }
        ],
        "household": {},
        "household_id": 0,
        "id": 0,
        "name": "string",
        "phone": "string",
        "updated_at": "string"
      },
      "resident_id": 0,
      "result": "success",
      "timestamp": "string"
    }
  ],
  "call_records": [
    {
      "call_id": "string",
      "call_status": "answered",
      "created_at": "string",
      "device": {
        "access_logs": [
          null
        ],
        "building": null,
        "building_id": 0,
        "call_records": [
          null
        ],
        "created_at": "string",
        "emergency_logs": [
          null
        ],
        "household": null,
        "household_id": 0,
        "id": 0,
        "location": "string",
        "name": "string",
        "serial_number": "string",
        "staff": [
          null
        ],
        "status": "[",
        "updated_at": "string"
      },
      "device_id": 0,
      "duration": 0,
      "id": 0,
      "resident": {
        "access_logs": [
          {
            "device": null,
            "device_id": null,
            "id": null,
            "method": null,
            "resident": null,
            "resident_id": null,
            "result": null,
            "timestamp": null
          }
        ],
        "call_records": [
          {
            "call_id": null,
            "call_status": null,
            "created_at": null,
            "device": null,
            "device_id": null,
            "duration": null,
            "id": null,
            "resident": null,
            "resident_id": null,
            "timestamp": null,
            "updated_at": null
          }
        ],
        "created_at": "string",
        "email": "string",
        "emergency_logs": [
          {
            "device": null,
            "device_id": null,
            "id": null,
            "resident": null,
            "resident_id": null,
            "resolved_at": null,
            "status": null,
            "triggered_at": null
          }
        ],
        "household": {},
        "household_id": 0,
        "id": 0,
        "name": "string",
        "phone": "string",
        "updated_at": "string"
      },
      "resident_id": 0,
      "timestamp": "string",
      "updated_at": "string"
    }
  ],
  "created_at": "string",
  "email": "string",
  "emergency_logs": [
    {
      "device": {
        "access_logs": [
          null
        ],
        "building": null,
        "building_id": 0,
        "call_records": [
          null
        ],
        "created_at": "string",
        "emergency_logs": [
          null
        ],
        "household": null,
        "household_id": 0,
        "id": 0,
        "location": "string",
        "name": "string",
        "serial_number": "string",
        "staff": [
          null
        ],
        "status": "[",
        "updated_at": "string"
      },
      "device_id": 0,
      "id": 0,
      "resident": {
        "access_logs": [
          {
            "device": null,
            "device_id": null,
            "id": null,
            "method": null,
            "resident": null,
            "resident_id": null,
            "result": null,
            "timestamp": null
          }
        ],
        "call_records": [
          {
            "call_id": null,
            "call_status": null,
            "created_at": null,
            "device": null,
            "device_id": null,
            "duration": null,
            "id": null,
            "resident": null,
            "resident_id": null,
            "timestamp": null,
            "updated_at": null
          }
        ],
        "created_at": "string",
        "email": "string",
        "emergency_logs": [
          {
            "device": null,
            "device_id": null,
            "id": null,
            "resident": null,
            "resident_id": null,
            "resolved_at": null,
            "status": null,
            "triggered_at": null
          }
        ],
        "household": {},
        "household_id": 0,
        "id": 0,
        "name": "string",
        "phone": "string",
        "updated_at": "string"
      },
      "resident_id": 0,
      "resolved_at": "string",
      "status": "pending",
      "triggered_at": "string"
    }
  ],
  "household": {
    "building": {
      "address": null,
      "building_code": null,
      "building_name": null,
      "created_at": null,
      "devices": null,
      "households": null,
      "id": null,
      "status": null,
      "updated_at": null
    },
    "building_id": 0,
    "created_at": "string",
    "devices": [
      {
        "access_logs": [
          null
        ],
        "building": null,
        "building_id": 0,
        "call_records": [
          null
        ],
        "created_at": "string",
        "emergency_logs": [
          null
        ],
        "household": null,
        "household_id": 0,
        "id": 0,
        "location": "string",
        "name": "string",
        "serial_number": "string",
        "staff": [
          null
        ],
        "status": "[",
        "updated_at": "string"
      }
    ],
    "household_number": "string",
    "id": 0,
    "residents": [
      {
        "access_logs": [
          null
        ],
        "call_records": [
          null
        ],
        "created_at": "string",
        "email": "string",
        "emergency_logs": [
          null
        ],
        "household": null,
        "household_id": 0,
        "id": 0,
        "name": "string",
        "phone": "string",
        "updated_at": "string"
      }
    ],
    "status": "string",
    "updated_at": "string"
  },
  "household_id": 0,
  "id": 0,
  "name": "string",
  "phone": "string",
  "updated_at": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|access_logs|[[models.AccessLog](#schemamodels.accesslog)]|false|none||none|
|call_records|[[models.CallRecord](#schemamodels.callrecord)]|false|none||none|
|created_at|string|false|none||none|
|email|string|false|none||none|
|emergency_logs|[[models.EmergencyLog](#schemamodels.emergencylog)]|false|none||none|
|household|[models.Household](#schemamodels.household)|false|none||Relations|
|household_id|integer|false|none||关联的户号ID|
|id|integer|false|none||none|
|name|string|false|none||none|
|phone|string|false|none||none|
|updated_at|string|false|none||none|

<h2 id="tocS_models.CallStatus">models.CallStatus</h2>

<a id="schemamodels.callstatus"></a>
<a id="schema_models.CallStatus"></a>
<a id="tocSmodels.callstatus"></a>
<a id="tocsmodels.callstatus"></a>

```json
"answered"

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|*anonymous*|string|false|none||none|

#### 枚举值

|属性|值|
|---|---|
|*anonymous*|answered|
|*anonymous*|missed|
|*anonymous*|timeout|

<h2 id="tocS_models.Household">models.Household</h2>

<a id="schemamodels.household"></a>
<a id="schema_models.Household"></a>
<a id="tocSmodels.household"></a>
<a id="tocsmodels.household"></a>

```json
{
  "building": {
    "address": "string",
    "building_code": "string",
    "building_name": "string",
    "created_at": "string",
    "devices": [
      {
        "access_logs": [
          null
        ],
        "building": null,
        "building_id": 0,
        "call_records": [
          null
        ],
        "created_at": "string",
        "emergency_logs": [
          null
        ],
        "household": null,
        "household_id": 0,
        "id": 0,
        "location": "string",
        "name": "string",
        "serial_number": "string",
        "staff": [
          null
        ],
        "status": "[",
        "updated_at": "string"
      }
    ],
    "households": [
      {
        "building": null,
        "building_id": 0,
        "created_at": "string",
        "devices": [
          null
        ],
        "household_number": "string",
        "id": 0,
        "residents": [
          null
        ],
        "status": "string",
        "updated_at": "string"
      }
    ],
    "id": 0,
    "status": "string",
    "updated_at": "string"
  },
  "building_id": 0,
  "created_at": "string",
  "devices": [
    {
      "access_logs": [
        {
          "device": null,
          "device_id": 0,
          "id": 0,
          "method": "remote",
          "resident": {
            "access_logs": null,
            "call_records": null,
            "created_at": null,
            "email": null,
            "emergency_logs": null,
            "household": null,
            "household_id": null,
            "id": null,
            "name": null,
            "phone": null,
            "updated_at": null
          },
          "resident_id": 0,
          "result": "success",
          "timestamp": "string"
        }
      ],
      "building": {
        "address": "string",
        "building_code": "string",
        "building_name": "string",
        "created_at": "string",
        "devices": [
          null
        ],
        "households": [
          null
        ],
        "id": 0,
        "status": "string",
        "updated_at": "string"
      },
      "building_id": 0,
      "call_records": [
        {
          "call_id": "string",
          "call_status": "answered",
          "created_at": "string",
          "device": null,
          "device_id": 0,
          "duration": 0,
          "id": 0,
          "resident": {
            "access_logs": null,
            "call_records": null,
            "created_at": null,
            "email": null,
            "emergency_logs": null,
            "household": null,
            "household_id": null,
            "id": null,
            "name": null,
            "phone": null,
            "updated_at": null
          },
          "resident_id": 0,
          "timestamp": "string",
          "updated_at": "string"
        }
      ],
      "created_at": "string",
      "emergency_logs": [
        {
          "device": null,
          "device_id": 0,
          "id": 0,
          "resident": {
            "access_logs": null,
            "call_records": null,
            "created_at": null,
            "email": null,
            "emergency_logs": null,
            "household": null,
            "household_id": null,
            "id": null,
            "name": null,
            "phone": null,
            "updated_at": null
          },
          "resident_id": 0,
          "resolved_at": "string",
          "status": "pending",
          "triggered_at": "string"
        }
      ],
      "household": {
        "building": null,
        "building_id": 0,
        "created_at": "string",
        "devices": [
          null
        ],
        "household_number": "string",
        "id": 0,
        "residents": [
          null
        ],
        "status": "string",
        "updated_at": "string"
      },
      "household_id": 0,
      "id": 0,
      "location": "string",
      "name": "string",
      "serial_number": "string",
      "staff": [
        {
          "created_at": "string",
          "devices": [
            {}
          ],
          "id": 0,
          "phone": "string",
          "position": "string",
          "property_name": "string",
          "remark": "string",
          "role": "string",
          "status": "string",
          "updated_at": "string",
          "username": "string"
        }
      ],
      "status": "online",
      "updated_at": "string"
    }
  ],
  "household_number": "string",
  "id": 0,
  "residents": [
    {
      "access_logs": [
        {
          "device": null,
          "device_id": 0,
          "id": 0,
          "method": "remote",
          "resident": {
            "access_logs": null,
            "call_records": null,
            "created_at": null,
            "email": null,
            "emergency_logs": null,
            "household": null,
            "household_id": null,
            "id": null,
            "name": null,
            "phone": null,
            "updated_at": null
          },
          "resident_id": 0,
          "result": "success",
          "timestamp": "string"
        }
      ],
      "call_records": [
        {
          "call_id": "string",
          "call_status": "answered",
          "created_at": "string",
          "device": null,
          "device_id": 0,
          "duration": 0,
          "id": 0,
          "resident": {
            "access_logs": null,
            "call_records": null,
            "created_at": null,
            "email": null,
            "emergency_logs": null,
            "household": null,
            "household_id": null,
            "id": null,
            "name": null,
            "phone": null,
            "updated_at": null
          },
          "resident_id": 0,
          "timestamp": "string",
          "updated_at": "string"
        }
      ],
      "created_at": "string",
      "email": "string",
      "emergency_logs": [
        {
          "device": null,
          "device_id": 0,
          "id": 0,
          "resident": {
            "access_logs": null,
            "call_records": null,
            "created_at": null,
            "email": null,
            "emergency_logs": null,
            "household": null,
            "household_id": null,
            "id": null,
            "name": null,
            "phone": null,
            "updated_at": null
          },
          "resident_id": 0,
          "resolved_at": "string",
          "status": "pending",
          "triggered_at": "string"
        }
      ],
      "household": {
        "building": null,
        "building_id": 0,
        "created_at": "string",
        "devices": [
          null
        ],
        "household_number": "string",
        "id": 0,
        "residents": [
          null
        ],
        "status": "string",
        "updated_at": "string"
      },
      "household_id": 0,
      "id": 0,
      "name": "string",
      "phone": "string",
      "updated_at": "string"
    }
  ],
  "status": "string",
  "updated_at": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|building|[models.Building](#schemamodels.building)|false|none||Relations - 关联关系|
|building_id|integer|false|none||关联的楼号ID|
|created_at|string|false|none||none|
|devices|[[models.Device](#schemamodels.device)]|false|none||关联的设备（一对多）|
|household_number|string|false|none||户号编号，如"1-1-101"|
|id|integer|false|none||none|
|residents|[[models.Resident](#schemamodels.resident)]|false|none||关联的居民（一对多）|
|status|string|false|none||状态：active, inactive|
|updated_at|string|false|none||none|
