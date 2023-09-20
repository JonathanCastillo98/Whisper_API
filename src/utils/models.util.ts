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