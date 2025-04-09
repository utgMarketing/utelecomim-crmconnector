(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.CrmConnector = factory();
    }
}(this, function () {
    class CrmConnector {
        constructor(baseUrl, httpOptions = {}) {
            this.baseUrl = baseUrl;
            this.httpOptions = httpOptions;
            this.title = "";
            this.text = "";
            this.phone = "";
            this.locality = "";
            this.userName = "";
            this.address = "";
            this.gaId = "";
            this.utmSource = "";
            this.utmCampaign = "";
            this.utmMedium = "";
            this.utmTerm = "";
            this.utmContent = "";
            this.trademarkId = null
        }

        setTitle(title) {
            this.title = title;
            return this;
        }

        setDescription(text) {
            this.description = text;
            return this;
        }

        setPhone(phone) {
            this.phone = phone;
            return this;
        }

        setLocality(locality) {
            this.locality = locality;
            return this;
        }

        setUserName(userName) {
            this.userName = userName;
            return this;
        }

        setAddress(address) {
            this.address = address;
            return this;
        }

        setGaId(gaId) {
            this.gaId = gaId;
            return this;
        }

        setUtmSource(utmSource) {
            this.utmSource = utmSource;
            return this;
        }

        setUtmCampaign(utmCampaign) {
            this.utmCampaign = utmCampaign;
            return this;
        }

        setUtmMedium(utmMedium) {
            this.utmMedium = utmMedium;
            return this;
        }

        setUtmTerm(utmTerm) {
            this.utmTerm = utmTerm;
            return this;
        }

        setUtmContent(utmContent) {
            this.utmContent = utmContent;
            return this;
        }

        setTrademarkId(trademarkId) {
            this.trademarkId = trademarkId;
            return this;
        }

        send() {
            return new Promise((resolve, reject) => {
                if (!this.title || !this.description || !this.phone) {
                    reject({code: 400, message: "Обов'язкові поля не заповнені"});
                    return;
                }

                const requestData = {
                    title: this.title,
                    description: this.description,
                    phone: this.phone,
                    locality: this.locality,
                    user_name: this.userName,
                    address: this.address,
                    ga_id: this.gaId,
                    utm_source: this.utmSource,
                    utm_campaign: this.utmCampaign,
                    utm_medium: this.utmMedium,
                    utm_term: this.utmTerm,
                    utm_content: this.utmContent,
                    trademark_id: this.trademarkId,
                };

                const requestOptions = {
                    method: "POST",
                    headers: Object.assign({}, {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }, this.httpOptions.headers || {}) ,
                    body: JSON.stringify(requestData),
                    timeout: this.httpOptions.timeout || 10000,
                };

                fetch(this.baseUrl + "/crm/create_lead_public", requestOptions)
                    .then((response) => {
                        if (response.status === 201) {
                            return response.json();
                        } else {
                            const errorPromise = response.json();
                            errorPromise.statusCode = response.status;
                            throw errorPromise;
                        }
                    })
                    .then((data) => {
                        resolve({code: 201, message: "Лід успішно створено", data});
                    })
                    .catch((errorPromise) => {
                        errorPromise.then((errorData) => {
                            const errorMessage = errorData.error || "Помилка сервера";
                            const errorCode = errorPromise.statusCode || 500;
                            reject({code: errorCode, message: errorMessage});
                        });
                    });
            });
        }
    }

    return CrmConnector;
}));
