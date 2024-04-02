//error handler for catch block
export const handleErrors = (error) => {
    return {
        isData: false,
        error: error.message
    }
};
