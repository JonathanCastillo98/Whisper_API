export const createError = (status: number, message: string) => {
    const err = new Error();
    err.message = message;
    return err
}