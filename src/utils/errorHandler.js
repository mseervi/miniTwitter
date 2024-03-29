//error handler for catch block
export const handleErrors = (error) => {
    return {
        isData: false,
        error: error.message
    }
};


// export const handleErrors = (err, req, res, next) => {
//     console.error('Error:', err.message);
//     res.status(err.statusCode || 500).json({
//         isData: false,
//         error: err.message || 'Internal Server Error'
//     });
// };