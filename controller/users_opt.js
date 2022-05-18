const string = {
    type: 'string'
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

const registerOpt = {
    schema: {

        body: {
            type: 'object',
            required: ['username', 'email', 'password', 'phone'],
            properties: {
                username: string,
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
                    message: string,
                    values: {
                        type: 'object',
                        properties: {
                            username: string,
                            email: string,
                        }
                    }
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
                            username: string,
                            email: string,
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
        headers: {
            Authorization: string
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
                            username: string,
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
        headers: {
            Authorization: string
        },
        body: {
            type: 'object',
            required: ['username', 'email', 'phone'],
            properties: {
                username: string,
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
                            username: string,
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