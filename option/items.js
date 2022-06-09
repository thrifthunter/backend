const { string, boolean, number, defaultOpt } = require('./default')

const items = {
    schema: {
        description: 'get all items',
        querystring: {
            page: number,
            keyword: string,
            category: string,
            size: number
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
                            account: string,
                            category: string,
                            description: string,
                            name: string,
                            photoUrl: string,
                            price: number
                        }
                    }
                }

            }
        }
    }
}

const item = {
    schema: {
        description: 'get all items',
        params: {
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                    description: 'id'
                }
            }
        },
        response: {
            200: {
                type: "object",
                properties: {
                    error: boolean,
                    message: string,
                    values: {
                        type: 'object',
                        properties: {
                            account: string,
                            category: string,
                            description: string,
                            name: string,
                            photoUrl: string,
                            price: number
                        }
                    }
                }

            }
        }
    }
}

module.exports = {
    items,
    item
}