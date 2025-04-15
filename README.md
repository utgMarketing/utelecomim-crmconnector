# Description
CRM API Client
# NPM
```text
npm i utelecomim-crmconnector
```

# CDN

```js
<script src="https://cdn.jsdelivr.net/gh/utgMarketing/utelecomim-crmconnector@1.0.6/library.min.js"></script>
```

# Usage
```js

import CrmConnector from "utelecomim-crmconnector";

// коли підключаємо через CDN
window.CrmConnector
    
// базове використання
const connector = new CrmConnector("https://api.doamin.com");

// можна передати параметри
const connector = new CrmConnector("https://api.doamin.com", { 
    timeout: 10000, 
    headers: {} 
});

// для тестування, щоб не створювати лід в CRM, вказуємо цей заголовок
const connector = new CrmConnector("https://api.doamin.com", {
    headers: {
        "X-Mock-Response": "no-create"
    } 
});

connector
    .setTitle("title") // required
    .setDescription("Description") // required
    .setPhone("380951234567") // required
    .setLocality("text")
    .setUserName("Петя")
    .setAddress("...")
    .setGaId("....")
    .setUtmSource("....")
    .setUtmCampaign("....")
    .setUtmMedium("....")
    .setUtmTerm("....")
    .setUtmContent("....")
    .setTrademarkId(123)
    .send()
    .then(({code, message}) => {
        console.log(code, message)
    })
    .catch(({code, message}) => {
        console.log(code, message)
    });
```




