# Description
CRM API Client
# NPM
```text
npm i utelecomim-crmconnector
```

# CDN

```js
<script src="https://cdn.jsdelivr.net/gh/utgMarketing/utelecomim-crmconnector@1.0.4/library.min.js"></script>
```

# Usage
```js

import CrmConnector from "utelecomim-crmconnector";

window.CrmConnector // with CDN

const options = { timeout: 10000, headers: {} };
const connector = new CrmConnector("https://api.doamin.com", options);

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
    .send()
    .then(({code, message}) => {
        console.log(code, message)
    })
    .catch(({code, message}) => {
        console.log(code, message)
    });
```




