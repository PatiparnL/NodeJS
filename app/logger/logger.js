const logger = require('../../logger')

function buildLogMsg(req, method, reqBody, resBody, result, resultCode, starttime) {
    let reqParams = {
        URL: req.originalUrl,
        Headers: {
            ContentType: req.headers['content-type']
        },
        Body: reqBody
    }
    let resParams = {
        URL: req.originalUrl,
        Headers: {
            ContentType: req.headers['content-type']
        },
        Body: resBody
    }
    return log = `IP|${req.headers['host']}|USERNAME|${req.headers['user']}|TRAN_ID|${req.headers['x-trans-id']}|METHOD|${method}|REQ_PARAMS|${JSON.stringify(reqParams)}|RES_PARAMS|${JSON.stringify(resParams)}|RESULT|${result}|RESULT_CODE|${resultCode}|RESP_TIME|${Date.now() - starttime}`

}

function debug(obj) {
    let str = JSON.stringify(obj)
    logger.debug(str.substring(1, str.length - 1))
}

function info(obj) {
    let str = JSON.stringify(obj)
    logger.debug(str.substring(1, str.length - 1))
}

function error(obj) {
    let str = JSON.stringify(obj)
    logger.debug(str.substring(1, str.length - 1))
}


module.exports = {
    buildLogMsg,
    debug,
    info,
    error
}