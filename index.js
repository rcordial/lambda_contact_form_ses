exports.handler = async (event, context) => {
    const axios = require('axios');

    let body = JSON.parse(event.body);

    const toAddress = '<--recipient-address-->';
    const fromAddress = '<--sender-address-->';
    const secret_key = '<--reCAPTCHAv2 secrey key-->';
    const region = '<--region-->';



    const name = body.name;
    const message = body.message;
    const email = body.email;
    const response_key = body["g-recaptcha-response"];
    
    let url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response_key}`;

    let axiosResponse = await axios.get(url);
    
    if(axiosResponse.data.success){
        const { SESClient, SendEmailCommand  } = require("@aws-sdk/client-ses");
        var sesClient = new SESClient({ region: region });
        await sesClient.send(new SendEmailCommand({
            Destination: {
                ToAddresses: [toAddress]
            },
            Message: {
                Body: {
                    Text: {
                        Charset: 'UTF-8',
                        Data: message
                    },
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: `Contact - from ${name} (${email})`
                }
            },
            Source: fromAddress
        }));
    }

    return axiosResponse.data;

};