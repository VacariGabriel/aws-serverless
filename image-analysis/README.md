# image-analysis

Lambda for detect labels and translate text.

## Technologies
- Serverless framework
- AWS Rekognition
- Amazon Translate

## Installation

**Install serverless framework**

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

**Invoke function - Local**

create a file *request.json*

```json
    {
        "queryStringParameters: {
            imageUrl: "imageUrl"
        }
    }
```

Invoke function
```
    sls invoke local -f img-analysis --path request.json --log
```

**Test lambda**

Use url in path */analyse* and query string imageUrl=*imageUrl*

**Remove from AWS**

```
    sls remove
```