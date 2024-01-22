const success = (message='', data = [], status =200) => {
    return {
        message,
        data,
        status
    }
}

const error = (message, error=[], status =500) =>{
    return {
        message,
        error,
        status
    }
}

module.exports = {
    success, error
}