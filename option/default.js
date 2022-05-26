const string = {
    type: 'string'
}

const number = {
    type: 'number',
    default : 0
}

const boolean = {
    type: 'boolean',
    default: false
}


const defaultOpt = {
    schema: {
        description: 'test route',
        response: {
            200: {
                type: "object",
                properties: {
                    message: string
                }

            }
        }
    }
}

module.exports={
    string,
    boolean,
    number,
    defaultOpt
}
