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

# 数据模型

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

