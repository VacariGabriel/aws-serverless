# lambda-environment

Lambda for get commit messages from  *http://whatthecommit.com/* each minute.

Obs: I created it to understand the environment separation of QA and PROD with serverless framework.

## Technologies
- Serverless framework
- DynamoDB

## Installation

**Install Serverless framework**

```
    npm i -g serverless
```

**Install dependencies**

```
    npm install
```

## How to run ?

**Deploy**

```
    sls deploy
```

**Invoke Function - Local**

```
    npm run invoke-local
```

Monitor the events and the dynamodb's register on AWS console.

**Remove from AWS**

```
    sls remove
``` 
