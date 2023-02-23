# lambda_contact_form_ses
lambda_contact_form_ses is a NodeJS-based lambda application utilizing function URLs to receive POST request from contact form actions and send contact emails via Amazon SES

# Setting Up
* Modify the values in the application to the following variables. (Can also pass these via environment variables, or through lambda event itself)

    * `toAddress` - recipient address
    * `fromAddress` - sender address
    * `secret_key` - reCAPTCHAv2 secret key
    * `region` - region where the lambda / ses is
      
* Prepare and create the Lambda function

   * Run `npm install` and zip all files in the directory, or run `sh build.sh` as the application package to be uploaded. No need to upload it to S3 as the deployment package size (including dependencies) does not exceed 50MB based on current [Lambda limits](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html)
   * Create the lambda function with a `NodeJS 18.x` runtime, and a new role with basic permissions
   * Upload the deployment package
   * Change the configuration to allocate more memory, longer timeouts depending on desired execution performance

* Function URL settings
   * Allow origin - set to your domain or '*' to allow from anywhere
   * Content-type - header, to allow application/json type payload

# Configuring Permissions

   * The lambda function must have just enough permission to write to send emails via Amazon SES, you can attach below policy to the execution role: 
   
```json
"Statement": [
    {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ses:SendEmail",
                "ses:SendRawEmail"
            ],
            "Resource": "*"
        }
    ]
}
]
```

