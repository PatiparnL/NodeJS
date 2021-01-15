const chai = require('chai');
const chaiHttp = require('chai-http');
const conn = require('../dbtest');
const app = require('../app');
const packageRules = require('../app/api/v1.0/models/packageRules_model')
const environment = require('../environments/environment');
const config = require('config');

const vapi = environment.v1;

chai.use(chaiHttp);
chai.should();

var token = config.get('token')

describe("### PackageRules ###", () =>
{
    var data
    var datatest

    before(done =>
    {
        conn.connectTest().then(() => done()).catch(done);
        insertPackageRules()
    });

    after(done =>
    {
        conn.close().then(() => done()).catch(done);
    });

    describe("Get /package-rule", () =>
    {
        it("( 401 Unauthorized )", (done) =>
        {
            chai.request(app)
                .get(vapi + "/package-rules")
                .end((err, res) =>
                {
                    res.should.have.status(401)
                    res.body.should.have.property('error').property('code').to.equal(401)
                    done();
                });
        });
        it("( Find All )", (done) =>
        {
            chai.request(app)
                .get(vapi + "/package-rules")
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(200)
                    res.body.should.have.property('data').be.a('array').length.above(0)
                    data = res.body.data[0]
                    done();
                });
        });

        it("( Find By packageInput ) ?packageInput=GROUP PLAY PREMIUM", (done) =>
        {
            chai.request(app)
                .get(vapi + "/package-rules?packageInput=" + data.packageInput)
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(200)
                    res.body.should.have.property('data').be.a('array').length.above(0)
                    done();
                });
        });

        it("( Find By packageInputType ) ?packageInputType=GROUP", (done) =>
        {
            chai.request(app)
                .get(vapi + "/package-rules?packageInputType=" + data.packageInputType)
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(200)
                    res.body.should.have.property('data').be.a('array').length.above(0)
                    done();
                });
        });

        it("( Find By packageType ) ?packageType=AISOnTop", (done) =>
        {
            chai.request(app)
                .get(vapi + "/package-rules?packageType=" + data.packageType)
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(200)
                    res.body.should.have.property('data').be.a('array').length.above(0)
                    done();
                });
        });

        it("( Find By operator ) ?operator=EXCLUDE-GROUP", (done) =>
        {
            chai.request(app)
                .get(vapi + "/package-rules?operator=" + data.operator)
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(200)
                    res.body.should.have.property('data').be.a('array').length.above(0)
                    done();
                });
        });

        it("( Find By additionalOperator ) ?additionalOperator=EQUAL", (done) =>
        {
            chai.request(app)
                .get(vapi + "/package-rules?additionalOperator=" + data.additionalOperator)
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(200)
                    res.body.should.have.property('data').be.a('array').length.above(0)
                    done();
                });
        });

        it("( Find By value ) ?value=GROUP PLAY PREMIUM", (done) =>
        {
            chai.request(app)
                .get(vapi + "/package-rules?value=" + data.value)
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(200)
                    res.body.should.have.property('data').be.a('array').length.above(0)
                    done();
                });
        });

        it("( Sort By packageInput ) ?sort=packageInput_desc", (done) =>
        {
            chai.request(app)
                .get(vapi + "/package-rules?sort=packageInput_desc")
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(200)
                    res.body.should.have.property('data').be.a('array').length.above(0)
                    done();
                });
        });

        it("( Sort By packageInputType ) ?sort=packageInputType_desc", (done) =>
        {
            chai.request(app)
                .get(vapi + "/package-rules?sort=packageInputType_desc")
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(200)
                    res.body.should.have.property('data').be.a('array').length.above(0)
                    done();
                });
        });

        it("( Sort By packageType ) ?sort=packageType_desc", (done) =>
        {
            chai.request(app)
                .get(vapi + "/package-rules?sort=packageType_desc")
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(200)
                    res.body.should.have.property('data').be.a('array').length.above(0)
                    done();
                });
        });

        it("( Sort By operator ) ?sort=operator_desc", (done) =>
        {
            chai.request(app)
                .get(vapi + "/package-rules?sort=operator_desc")
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(200)
                    res.body.should.have.property('data').be.a('array').length.above(0)
                    done();
                });
        });

        it("( Sort By additionalOperator ) ?sort=additionalOperator_desc", (done) =>
        {
            chai.request(app)
                .get(vapi + "/package-rules?sort=additionalOperator_desc")
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(200)
                    res.body.should.have.property('data').be.a('array').length.above(0)
                    done();
                });
        });

        it("( Sort By value ) ?sort=value_desc", (done) =>
        {
            chai.request(app)
                .get(vapi + "/package-rules?sort=value_desc")
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(200)
                    res.body.should.have.property('data').be.a('array').length.above(0)
                    done();
                });
        });

        it("( 400 Request parameter has no underscore ) ?sort=value", (done) =>
        {
            chai.request(app)
                .get(vapi + "/package-rules?sort=value")
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(400)
                    res.body.should.have.property('error').property('code').to.equal(400)
                    res.body.should.have.property('error').property('message').to.equal('Request parameter has no underscore')
                    done();
                });
        });

        it("( 400 Request parameter has no underscore ) ?sort=value_asd", (done) =>
        {
            chai.request(app)
                .get(vapi + "/package-rules?sort=value_asd")
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(400)
                    res.body.should.have.property('error').property('code').to.equal(400)
                    res.body.should.have.property('error').property('message').to.equal('Request parameter unknown sort type')
                    done();
                });
        });

        it("( 400 Request parameter sort attribute unknown ) ?sort=xxxx_asc", (done) =>
        {
            chai.request(app)
                .get(vapi + "/package-rules?sort=xxxx_asc")
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(400)
                    res.body.should.have.property('error').property('code').to.equal(400)
                    res.body.should.have.property('error').property('message').to.equal('Request parameter sort attribute unknown ')
                    done();
                });
        });

        it("( 404 Not Found ) ?value=xxxx", (done) =>
        {
            chai.request(app)
                .get(vapi + "/package-rules?value=xxxx")
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(404)
                    res.body.should.have.property('error').property('code').to.equal(404)
                    done();
                });
        });

        it("( Check SuccessCount ) ", (done) =>
        {
            chai.request(app)
                .get(vapi + "/package-rules")
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(200)
                    res.body.should.have.property('data').be.a('array').length.above(0)
                    res.body.should.have.property('count').to.above(0)
                    done();
                });
        });
    })

    describe('Get /package-rules/:_id', () =>
    {
        it("( 401 Unauthorized )", (done) =>
        {
            chai.request(app)
                .get(vapi + "/package-rules/:_id")
                .end((err, res) =>
                {
                    res.should.have.status(401)
                    res.body.should.have.property('error').property('code').to.equal(401)
                    done();
                });
        });

        it("( FindById )", (done) =>
        {
            chai.request(app)
                .get(vapi + "/package-rules/" + data._id)
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(200)
                    res.body.should.have.property('data').be.a('object')
                    done();
                });
        });

        it("( 404 Data Not Found ) /5da995f846755d5ec5ef9999", (done) =>
        {
            chai.request(app)
                .get(vapi + "/package-rules/5da995f846755d5ec5ef9999")
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(404)
                    res.body.should.have.property('error').property('code').to.equal(404)
                    res.body.should.have.property('error').property('message').to.equal('Data Not Found')
                    done();
                });
        });

        it("( 400 _id is incorrect ) /12345678901234567890!@#$", (done) =>
        {
            chai.request(app)
                .get(vapi + "/package-rules/12345678901234567890!@#$")
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(400)
                    res.body.should.have.property('error').property('code').to.equal(400)
                    res.body.should.have.property('error').property('message').to.equal('_id is incorrect, please make sure your _id length is 24 and not contained any symbol')
                    done();
                });
        });

        it("( 500 Internal Server Error ) /12345678901234567890asdf", (done) =>
        {
            chai.request(app)
                .get(vapi + "/package-rules/12345678901234567890asdf")
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(500)
                    res.body.should.have.property('error').property('code').to.equal(500)
                    done();
                });
        });
    })

    var objectpackage = {
        "packageInput": "test",
        "packageInputType": "test",
        "packageType": "test",
        "operator":"test",
        "additionalOperator":"test",
        "value":"test"
    }

    describe("Post /package-rules", () =>
    {
        it("( 401 Unauthorized )", (done) =>
        {
            chai.request(app)
                .post(vapi + "/package-rules")
                .end((err, res) =>
                {
                    res.should.have.status(401)
                    res.body.should.have.property('error').property('code').to.equal(401)
                    done();
                });
        });

        it("( Create )", (done) =>
        {
            chai.request(app)
                .post(vapi + "/package-rules")
                .send(objectpackage)
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(201)
                    res.body.should.have.property('data').be.a('object')
                    datatest = res.body.data._id 
                    done();
                });
        });

        it("( 400 require packageInput )", (done) =>
        {
            objectpackage.packageInput = ''
            chai.request(app)
                .post(vapi + "/package-rules")
                .send(objectpackage)
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(400)
                    res.body.should.have.property('error').property('code').to.equal(400)
                    res.body.should.have.property('error').property('message').to.equal('require packageInput')
                    objectpackage.packageInput = 'test'
                    done();
                });
        });

        it("( 400 require packageInputType )", (done) =>
        {
            objectpackage.packageInputType = ''
            chai.request(app)
                .post(vapi + "/package-rules")
                .send(objectpackage)
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(400)
                    res.body.should.have.property('error').property('code').to.equal(400)
                    res.body.should.have.property('error').property('message').to.equal('require packageInputType')
                    objectpackage.packageInputType = 'test'
                    done();
                });
        });
        
        it("( 400 require packageType )", (done) =>
        {
            objectpackage.packageType = ''
            chai.request(app)
                .post(vapi + "/package-rules")
                .send(objectpackage)
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(400)
                    res.body.should.have.property('error').property('code').to.equal(400)
                    res.body.should.have.property('error').property('message').to.equal('require packageType')
                    objectpackage.packageType = 'test'
                    done();
                });
        });

        it("( 400 require operator )", (done) =>
        {
            objectpackage.operator = ''
            chai.request(app)
                .post(vapi + "/package-rules")
                .send(objectpackage)
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(400)
                    res.body.should.have.property('error').property('code').to.equal(400)
                    res.body.should.have.property('error').property('message').to.equal('require operator')
                    objectpackage.operator = 'test'
                    done();
                });
        });

        it("( 400 require additionalOperator )", (done) =>
        {
            objectpackage.additionalOperator = ''
            chai.request(app)
                .post(vapi + "/package-rules")
                .send(objectpackage)
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(400)
                    res.body.should.have.property('error').property('code').to.equal(400)
                    res.body.should.have.property('error').property('message').to.equal('require additionalOperator')
                    objectpackage.additionalOperator = 'test'
                    done();
                });
        });

        it("( 400 require value )", (done) =>
        {
            objectpackage.value = ''
            chai.request(app)
                .post(vapi + "/package-rules")
                .send(objectpackage)
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(400)
                    res.body.should.have.property('error').property('code').to.equal(400)
                    res.body.should.have.property('error').property('message').to.equal('require value')
                    objectpackage.value = 'test'
                    done();
                });
        });
    })

    describe('Put /package-rules/:_id',()=>{

        it("( 401 Unauthorized )", (done) =>
        {
            chai.request(app)
                .put(vapi + "/package-rules/123465789")
                .end((err, res) =>
                {
                    res.should.have.status(401)
                    res.body.should.have.property('error').property('code').to.equal(401)
                    done();
                });
        });

        it("( Update )", (done) =>
        {
            chai.request(app)
                .put(vapi + "/package-rules/"+data._id)
                .send(objectpackage)
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(200)
                    res.body.should.have.property('data').be.a('object')
                    done();
                });
        });
        
        it("( 400 _id is incorrect ) /12345678901234567890!@#$", (done) =>
        {
            chai.request(app)
                .put(vapi + "/package-rules/12345678901234567890!@#$")
                .send(objectpackage)
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(400)
                    res.body.should.have.property('error').property('code').to.equal(400)
                    res.body.should.have.property('error').property('message').to.equal('_id is incorrect, please make sure your _id length is 24 and not contained any symbol')
                    done();
                });
        });

        it("( 404 Data Not Found ) /5da995f846755d5ec5ef9999", (done) =>
        {
            chai.request(app)
                .put(vapi + "/package-rules/5da995f846755d5ec5ef9999")
                .send(objectpackage)
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(404)
                    res.body.should.have.property('error').property('code').to.equal(404)
                    res.body.should.have.property('error').property('message').to.equal('Data Not Found')
                    done();
                });
        });

        it("( 500 Internal Server Error ) /12345678901234567890asdf", (done) =>
        {
            chai.request(app)
                .put(vapi + "/package-rules/12345678901234567890asdf")
                .send(objectpackage)
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(500)
                    res.body.should.have.property('error').property('code').to.equal(500)
                    done();
                });
        });
    })

    describe('Delete /package-rules/:_id',()=>{
        it("( 401 Unauthorized )", (done) =>
        {
            chai.request(app)
                .delete(vapi + "/package-rules/123465789")
                .end((err, res) =>
                {
                    res.should.have.status(401)
                    res.body.should.have.property('error').property('code').to.equal(401)
                    done();
                });
        });

        it("( Delete )", (done) =>
        {
            chai.request(app)
                .delete(vapi + "/package-rules/"+data._id)
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(204)
                    done();
                });
        });

        it("( 400 _id is incorrect ) /12345678901234567890!@#$", (done) =>
        {
            chai.request(app)
                .delete(vapi + "/package-rules/12345678901234567890!@#$")
                .send(objectpackage)
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(400)
                    res.body.should.have.property('error').property('code').to.equal(400)
                    res.body.should.have.property('error').property('message').to.equal('_id is incorrect, please make sure your _id length is 24 and not contained any symbol')
                    done();
                });
        });

        it("( 404 Data Not Found ) /5da995f846755d5ec5ef9999", (done) =>
        {
            chai.request(app)
                .delete(vapi + "/package-rules/5da995f846755d5ec5ef9999")
                .send(objectpackage)
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(404)
                    res.body.should.have.property('error').property('code').to.equal(404)
                    res.body.should.have.property('error').property('message').to.equal('Data Not Found')
                    done();
                });
        });

        it("( 500 Internal Server Error ) /12345678901234567890asdf", (done) =>
        {
            chai.request(app)
                .delete(vapi + "/package-rules/12345678901234567890asdf")
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(500)
                    res.body.should.have.property('error').property('code').to.equal(500)
                    done();
                });
        });
    })

    describe('Delete data test',()=>{
        it("", (done) =>
        {
            chai.request(app)
                .delete(vapi + "/package-rules/"+datatest)
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(204)
                    done();
                });
        });
    })
});

function insertPackageRules()
{
    packageRules.insertMany(
        [
            {
                PACKAGE_INPUT: 'GROUP PLAY PREMIUM',
                PACKAGE_INPUT_TYPE: 'GROUP',
                PACKAGE_TYPE: 'AISOnTop',
                OPERATOR: 'EXCLUDE-GROUP',
                ADDITIONAL_OPERATOR: 'EQUAL',
                VALUE: 'GROUP PLAY PREMIUM'
            }
        ]
    )
}
