export type Environment = {
    user: string,
    pass: string,
    host: string,
}

export interface DatabaseConfig {
    prod: any,
    dev: Environment,
    test: any;
}

export type IUser = {
    username: string,
    email: string,
    profilePhoto: string,
    status: string,
    contacts: [],
    createdAt: Date,
}