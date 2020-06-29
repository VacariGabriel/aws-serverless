# lambda-without-framework

A simple lambda that returns a "Hello World" message.

## How to run ?

**01 - Create logs folder**

```
    mkdir logs
```

**02 - Create role**
```
    aws iam create-role --role-name lambda-exemplo \
    --assume-role-policy-document file://policies.json > logs/role.log
```
**03 - Zip function file**

```
    zip function.zip index.js
```

**04 - Create Lambda**

```
    aws lambda create-function --function-name hello-cli \
        --zip-file fileb://function.zip \
        --handler index.handler \
        --runtime nodejs12.x \
        --role [role_created] > logs/create-lambda.log
```

**05 - Invoke function**

```
    aws lambda invoke --function-name hello-cli --log-type Tail logs/lambda-exec.log
```

**06 - Delete lambda and role**

```
    aws lambda delete-function --function-name hello-cli
```

```
    aws iam delete-role --role-name lambda-exemplo
```

**Update code in index.js**

*Zip file again*

Run command:

```
    aws lambda update-function-code --zip-file fileb://function.zip \
        --function-name hello-cli --publish > log/lambda-updated.log
```
