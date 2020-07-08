# image-analysis

Lambda for detect labels and translate text.

## Technologies

- [Serverless framework](https://www.serverless.com/)
- [AWS Rekognition](https://aws.amazon.com/rekognition/?nc1=h_ls&blog-cards.sort-by=item.additionalFields.createdDate&blog-cards.sort-order=desc)
- [Amazon Translate](https://aws.amazon.com/translate/?nc1=h_ls)

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

create a file _request.json_

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

Use url in path _/analyse_ and query string imageUrl=_imageUrl_

**Remove from AWS**

```
    sls remove
```
