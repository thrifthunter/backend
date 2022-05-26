const { string, boolean, number, defaultOpt } = require('./default')

const items = {
    schema: {
        description: 'get all items',
        querystring: {
            limit: number,
            order: string,
            orderBy: string,
            keyword: string,
            category: string,
            offset: number
        },
        response: {
            200: {
                type: "object",
                properties: {
                    error: boolean,
                    message: string,
                    values: {
                        type: 'array',
                        properties: {
                            id: string,
                            Description: string,
                            Type: string,
                            Price: number                        }
                    }
                }

            }
        }
    }
}

module.exports = {
    items
}