# 01 - Criar role de segurança na AWS

aws iam create-role --role-name lambda-exemplo --assume-role-policy-document file://politicas.json > logs/role.log

# 02 - Criar arquivo com o conteúdo e zipar

zip function.zip index.js

# 03 - Criar a lambda

aws lambda create-function --function-name hello-cli --zip-file fileb://function.zip --handler index.handler \
    --runtime nodejs12.x --role arn:aws:iam::025115098531:role/lambda-exemplo > logs/create-lambda.log

# 04 - Invocar Lambda

aws lambda invoke --function-name hello-cli --log-type Tail logs/lambda-exec.log

## Caso altere alguma coisa na função, deve zipar e enviar novamente para a aws.
## Atualizar lambda
## aws lambda update-function-code --zip-file fileb://function.zip --function-name hello-cli --publish > logs/lambda-updated.log


# 05 - Deletar lambda e role
aws lambda delete-function --function-name hello-cli

aws iam delete-role --role-name lambda-exemplo