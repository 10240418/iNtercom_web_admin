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

# 数据模型

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

