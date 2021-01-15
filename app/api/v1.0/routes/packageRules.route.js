module.exports = (app) => {
    const packageRulesController = require('../controllers/packageRules.controller');
    const authorization = require('../../../../config/authorize')
    const environment = require('../../../../environments/environment');

    const vapi = environment.v1;

    app.post(vapi + "/package-rules", authorization, packageRulesController.create);
    app.get(vapi + "/package-rules", authorization, packageRulesController.read);
    app.get(vapi + "/package-rules/:_id", authorization, packageRulesController.readOnly);
    app.put(vapi + "/package-rules/:_id", authorization, packageRulesController.update);
    app.delete(vapi + "/package-rules/:_id", authorization, packageRulesController.delete);



}