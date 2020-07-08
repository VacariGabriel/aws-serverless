# hello with serverless framework

A simple lambda with _serverless framework_.

## Installation

```
    npm i -g serverless
```

## How to run ?

**Good Practice**

If you are not in production, always deploy the environment to check for possible problems.

**Deploy**

```
    sls deploy
```

**Invoke function - Local**

```
    sls invoke local hello --log
```

**Invoke function - AWS**

```
    sls invoke -f hello --log
```

**Watch logs**

```
    sls logs -f hello --tail
```

**Remove all from AWS**

```
    sls remove
```
