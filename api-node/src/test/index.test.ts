import 'mocha'
import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../'
import {Test} from "../models";

chai.use(chaiHttp)
const {expect} = chai

let requester: any,
    testUpdate: Test
describe('Testing CRUD Test', () => {

    before(() => requester = chai.request(app).keepOpen());
    after(() => requester.close())

    describe('Get All Tests', () => {
        it('Status 204', (done) => {
            requester.get('/test')
                .end((err: Error, res: any) => {
                    expect(res).to.have.status(204)
                    done()
                })
        })
    })

    describe('Create a Test', () => {
        it('Status 200', (done) => {
            const test = {name: 'Test_1', code: '123456'}
            requester.post('/test').send(test)
                .end((err: Error, res: any) => {
                    expect(res).to.have.status(200)
                    expect(res.body.id).to.be.a('string')
                    expect(res.body.name).to.equal(test.name)
                    expect(res.body.code).to.equal(test.code)
                    expect(res.body.createdAt).to.be.a('string')

                    testUpdate = res.body
                    done()
                })
        })
    })

    describe('Get Test by Id', () => {
        it('Status 200', (done) => {
            requester.get(`/test/${testUpdate.id}`)
                .end((err: Error, res: any) => {
                    expect(res).to.have.status(200);
                    expect(res.body.id).to.be.a('string');
                    expect(res.body.name).to.equal(testUpdate.name);
                    expect(res.body.code).to.equal(testUpdate.code);
                    expect(res.body.createdAt).to.be.a('string');
                    done();
                });
        });
    });

    describe('Update a Test', () => {
        it('Status 200', (done) => {
            testUpdate.name =  'Test_1_updated'
            requester.put(`/test/${testUpdate.id}`).send(testUpdate)
                .end((err: Error, res: any) => {
                    expect(res).to.have.status(200)
                    expect(res.body.id).to.be.a('string')
                    expect(res.body.name).to.equal(testUpdate.name)
                    expect(res.body.code).to.equal(testUpdate.code)
                    expect(res.body.createdAt).to.be.a('string')
                    testUpdate = res.body
                    done()
                })
        })
    })

    describe('Get All Tests', () => {
        it('Status 200', (done) => {
            requester.get('/test')
                .end((err: Error, res: any) => {
                    expect(res).to.have.status(200)
                    expect(Array.isArray(res.body)).to.be.true
                    done()
                })
        })
    })

    describe('Delete a Test', () => {
        it('Status 200', (done) => {
            requester.delete(`/test/${testUpdate.id}`)
                .end((err: Error, res: any) => {
                    expect(res).to.have.status(200);
                    expect(Array.isArray(res.body)).to.be.true
                    done();
                });
        });
    });
})
