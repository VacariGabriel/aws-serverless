const validator = (fn, schema, argsType) => {
    return async function (event) {
        const data = JSON.parse(event[argsType])

        // aboutEarly - show all errors
        const { error, value } = await schema.validate(data, { abortEarly: false })

        if (!error) return fn.apply(this, arguments)

        event[argsType] = value

        return {
            statusCode: 422,
            body: error.message
        }
    }
}

module.exports = validator