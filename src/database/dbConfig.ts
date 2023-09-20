export default {
    prod: {},
    dev: {
        user: <string>process.env.DB_USER,
        pass: <string>process.env.DB_PASS,
        host: <string>process.env.DB_HOST,
    },
    test: {
        user: <string>process.env.DB_USER,
        pass: <string>process.env.DB_PASS,
        host: <string>process.env.DB_HOST,
    }
}