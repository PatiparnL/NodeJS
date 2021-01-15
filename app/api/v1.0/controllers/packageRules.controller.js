const packageRules = require('../models/packageRules_model');

const morphism = require('morphism')
const packageRulesJson = require('../models/json/packageRules')


const ModelResponses = require('../../../model/modelresponses');
const Success = ModelResponses.Success;
const Error = ModelResponses.Error;
const SuccessCount = ModelResponses.SuccessCount;

const log = require('../../../logger/logger')

var responseBody, startTime

exports.read = (req, res) => {
    startTime = Date.now()
    let filterJson = {}
    if (req.query.packageInput) filterJson.PACKAGE_INPUT = { $regex: new RegExp(req.query.packageInput, 'gi') }
    if (req.query.packageInputType) filterJson.PACKAGE_INPUT_TYPE = { $regex: new RegExp(req.query.packageInputType, 'gi') }
    if (req.query.packageType) filterJson.PACKAGE_TYPE = { $regex: new RegExp(req.query.packageType, 'gi') }
    if (req.query.operator) filterJson.OPERATOR = { $regex: new RegExp(req.query.operator, 'gi') }
    if (req.query.additionalOperator) filterJson.ADDITIONAL_OPERATOR = { $regex: new RegExp(req.query.additionalOperator, 'gi') }
    if (req.query.value) filterJson.VALUE = { $regex: new RegExp(req.query.value, 'gi') }

    let sortFormat, sortSplited

    if (req.query.sort) {

        sortSplited = (req.query.sort).split('_')

        if (!sortSplited[1]) {
            responseBody = new Error(400, 'Request parameter has no underscore')
            log.error(log.buildLogMsg(req, 'GET', req.query, responseBody, 'FAILED', 400, startTime))
            return res.status(400).send(responseBody)
        }

        if (sortSplited[1].toUpperCase() != 'ASC' && sortSplited[1].toUpperCase() != 'DESC') {
            responseBody = new Error(400, 'Request parameter unknown sort type')
            log.error(log.buildLogMsg(req, 'GET', req.query, responseBody, 'FAILED', 400, startTime))
            return res.status(400).send(responseBody)
        }

        sortFormat = sortSplited[1] == 'DESC' ? '-' : ''

        if (sortSplited[0] == 'packageInput') sortFormat += 'PACKAGE_INPUT'
        else if (sortSplited[0] == 'packageInputType') sortFormat += 'PACKAGE_INPUT_TYPE'
        else if (sortSplited[0] == 'packageType') sortFormat += 'PACKAGE_TYPE'
        else if (sortSplited[0] == 'operator') sortFormat += 'OPERATOR'
        else if (sortSplited[0] == 'additionalOperator') sortFormat += 'ADDITIONAL_OPERATOR'
        else if (sortSplited[0] == 'value') sortFormat += 'VALUE'
        else {
            responseBody = new Error(400, 'Request parameter sort attribute unknown ')
            log.error(log.buildLogMsg(req, 'GET', req.query, responseBody, 'FAILED', 400, startTime))
            return res.status(400).send(responseBody)
        }
    }

    packageRules.find(filterJson)
        .sort(sortFormat)
        .then(result => {
            if (result.length != 0) {
                let objectCounted = result.length
                result = result.splice(req.query.offset ? req.query.offset : 0, req.query.limit ? req.query.limit : objectCounted)
                let resultFormatted = morphism.morphism(packageRulesJson.output, result)
                responseBody = new SuccessCount(resultFormatted, objectCounted)
                log.debug(log.buildLogMsg(req, 'GET', req.query, responseBody, 'OK', 200, startTime))
                return res.status(200).send(responseBody)
            } else {
                responseBody = new Error(404, 'DATA NOT FOUND')
                log.error(log.buildLogMsg(req, 'GET', req.query, responseBody, 'FAILED', 404, startTime))
                return res.status(404).send(responseBody)
            }
        })
        .catch(err => {
            responseBody = new Error(500, err.message)
            log.error(log.buildLogMsg(req, 'GET', req.query, responseBody, 'FAILED', 500, startTime))
            return res.status(500).send(responseBody)
        })
}

exports.readOnly = (req, res) => {
    startTime = Date.now()
    if ((req.params._id).replace(/[^0-9a-fA-F]+$/gi, '').length != 24) return res.status(400).send(new Error(400, '_id is incorrect, please make sure your _id length is 24 and not contained any symbol'))

    packageRules.findById(req.params._id)
        .then(result => {
            if (result) {
                let resultFormatted = morphism.morphism(packageRulesJson.output, result)
                responseBody = new Success(resultFormatted)
                log.debug(log.buildLogMsg(req, 'GET', req.params, responseBody, 'OK', 200, startTime))
                return res.status(200).send(responseBody)
            } else {
                responseBody = new Error(404, 'Data Not Found')
                log.error(log.buildLogMsg(req, 'GET', req.params, responseBody, 'FAILED', 404, startTime))
                return res.status(404).send(responseBody)
            }
        })
        .catch(err => {
            responseBody = new Error(500, err.message)
            log.error(log.buildLogMsg(req, 'GET', req.params, responseBody, 'FAILED', 500, startTime))
            return res.status(500).send(responseBody)
        })
}

exports.delete = (req, res) => {
    startTime = Date.now()

    if ((req.params._id).replace(/[^0-9a-fA-F]+$/gi, '').length != 24) {

        responseBody = new Error(400, '_id is incorrect, please make sure your _id length is 24 and not contained any symbol')
        log.error(log.buildLogMsg(req, 'DELETE', req.params, responseBody, 'FAILED', 400, startTime))
        return res.status(400).send(responseBody)
    }

    packageRules.findByIdAndDelete(req.params._id)
        .then(result => {
            if (result) {
                responseBody = new Success(result)
                log.debug(log.buildLogMsg(req, 'DELETE', req.params, responseBody, 'OK', 204, startTime))
                return res.status(204).send(responseBody)
            } else {
                responseBody = new Error(404, 'Data Not Found')
                log.error(log.buildLogMsg(req, 'DELETE', req.params, responseBody, 'FAILED', 404, startTime))
                return res.status(404).send(responseBody)
            }
        })
        .catch(err => {
            responseBody = new Error(500, err.message)
            log.error(log.buildLogMsg(req, 'DELETE', req.params, responseBody, 'FAILED', 500, startTime))
            return res.status(500).send(responseBody)
        })
}

exports.create = (req, res) => {
    startTime = Date.now()
    if (!req.body.packageInput) return badRequestOnly('packageInput')
    if (!req.body.packageInputType) return badRequestOnly('packageInputType')
    if (!req.body.packageType) return badRequestOnly('packageType')
    if (!req.body.operator) return badRequestOnly('operator')
    if (!req.body.additionalOperator) return badRequestOnly('additionalOperator')
    if (!req.body.value) return badRequestOnly('value')

    function badRequestOnly(missingParameter) {
        responseBody = new Error(400, `require ${missingParameter}`)
        log.error(log.buildLogMsg(req, 'CREATE', req.body, responseBody, 'FAILED', 400, startTime))
        return res.status(400).send(responseBody)
    }

    packageRules.create(morphism.morphism(packageRulesJson.input, req.body))
        .then(result => {
            resultFormatted = morphism.morphism(packageRulesJson.output, result)
            responseBody = new Success(resultFormatted)
            log.debug(log.buildLogMsg(req, 'CREATE', req.body, responseBody, 'OK', 200, startTime))
            return res.status(201).send(responseBody)
        })
        .catch(err => {
            responseBody = new Error(500, err.message)
            log.error(log.buildLogMsg(req, 'CREATE', req.body, responseBody, 'FAILED', 500, startTime))
            return res.status(500).send(responseBody)
        })
}

exports.update = (req, res) => {
    startTime = Date.now()
    if ((req.params._id).replace(/[^0-9a-fA-F]+$/gi, '').length != 24) {
        responseBody = new Error(400, '_id is incorrect, please make sure your _id length is 24 and not contained any symbol')
        log.error(log.buildLogMsg(req, 'DELETE', req.params, responseBody, 'FAILED', 400, startTime))
        return res.status(400).send(responseBody)
    }
    // let some = morphism.morphism(packageRulesJson.input, req.body)
    // console.log(req.params._id, some);

    packageRules.findByIdAndUpdate({ _id: req.params._id }, (morphism.morphism(packageRulesJson.input, req.body)), { new: true })
        .then(result => {
            if (result) {
                let resultFormatted = morphism.morphism(packageRulesJson.output, result)
                responseBody = new Success(resultFormatted)
                log.debug(log.buildLogMsg(req, 'DELETE', req.params, responseBody, 'OK', 200, startTime))
                return res.status(200).send(responseBody)
            } else {
                responseBody = new Error(404, 'Data Not Found')
                log.error(log.buildLogMsg(req, 'DELETE', req.params, responseBody, 'FAILED', 404, startTime))
                return res.status(404).send(responseBody)
            }
        })
        .catch(err => {
            responseBody = new Error(500, err.message)
            log.error(log.buildLogMsg(req, 'DELETE', req.params, responseBody, 'FAILED', 500, startTime))
            return res.status(500).send(responseBody)
        })
}