const { string, boolean, defaultOpt } = require('./default')

const registerOpt = {
    schema: {

        body: {
            type: 'object',
            required: ['name', 'email', 'password', 'phone'],
            properties: {
                name: string,
                email: string,
                password: string,
                phone: string
            }
        },
        response: {
            200: {
                type: "object",
                properties: {
                    error: boolean,
                    message: string
                }
            }
        }
    }
}

const loginOpt = {
    schema: {

        body: {
            type: 'object',
            required: ['email', 'password'],
            properties: {
                email: string,
                password: string
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
                            name: string,
                            token: string
                        }
                    }
                }
            }
        }
    }
}

const getProfileOpt = {
    schema: {
        description: 'get data user profile',
        security: [{ ApiToken: [] }],
        response: {
            200: {
                type: "object",
                properties: {
                    error: boolean,
                    message: string,
                    values: {
                        type: 'object',
                        properties: {
                            name: string,
                            email: string,
                            phone: string
                        }
                    }
                }

            }
        }
    }
}

const updateProfileOpt = {
    schema: {
        description: 'update user profile',
        security: [{ ApiToken: [] }],
        body: {
            type: 'object',
            required: ['name', 'email', 'phone'],
            properties: {
                name: string,
                email: string,
                phone: string
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
                            name: string,
                            email: string,
                            phone: string
                        }
                    }
                }

            }
        }
    }
}

module.exports = {
    defaultOpt,
    registerOpt,
    loginOpt,
    getProfileOpt,
    updateProfileOpt
}