const errorHandler = (err, req, res, next) => {
    try {
        // 1. Always log the original error for debugging
        console.error(err);

        // 2. Set default values
        let statusCode = err.statusCode || 500;
        let message = err.message || 'Server Error';

        // 3. Handle Mongoose Bad ObjectId (CastError)
        if (err.name === 'CastError') {
            statusCode = 404;
            message = 'Invalid resource ID format';
        }

        // 4. Handle Mongoose Duplicate Key (E11000)
        if (err.code === 11000) {
            statusCode = 400;
            message = 'Duplicate field value entered';
        }

        // 5. Handle Mongoose Validation Error (with optional chaining to prevent crashes!)
        if (err.name === 'ValidationError' && err.errors) {
            statusCode = 400;
            message = Object.values(err.errors).map(val => val.message).join(', ');
        }

        // 6. Send clean response
        res.status(statusCode).json({
            success: false,
            error: message
        });

    } catch (middlewareError) {
        // Fallback safety net if the error handler itself crashes!
        next(middlewareError);
    }
};

export default errorHandler;