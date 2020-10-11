"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const __1 = __importDefault(require("../"));
chai_1.default.use(chai_http_1.default);
const { expect } = chai_1.default;
let requester, testUpdate;
describe('Testing CRUD Test', () => {
    before(() => requester = chai_1.default.request(__1.default).keepOpen());
    after(() => requester.close());
    describe('Get All Tests', () => {
        it('Status 204', (done) => {
            requester.get('/test')
                .end((err, res) => {
                expect(res).to.have.status(204);
                done();
            });
        });
    });
    describe('Create a Test', () => {
        it('Status 200', (done) => {
            const test = { name: 'Test_1', code: '123456' };
            requester.post('/test').send(test)
                .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.id).to.be.a('string');
                expect(res.body.name).to.equal(test.name);
                expect(res.body.code).to.equal(test.code);
                expect(res.body.createdAt).to.be.a('string');
                testUpdate = res.body;
                done();
            });
        });
    });
    describe('Get Test by Id', () => {
        it('Status 200', (done) => {
            requester.get(`/test/${testUpdate.id}`)
                .end((err, res) => {
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
            testUpdate.name = 'Test_1_updated';
            requester.put(`/test/${testUpdate.id}`).send(testUpdate)
                .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.id).to.be.a('string');
                expect(res.body.name).to.equal(testUpdate.name);
                expect(res.body.code).to.equal(testUpdate.code);
                expect(res.body.createdAt).to.be.a('string');
                testUpdate = res.body;
                done();
            });
        });
    });
    describe('Get All Tests', () => {
        it('Status 200', (done) => {
            requester.get('/test')
                .end((err, res) => {
                expect(res).to.have.status(200);
                expect(Array.isArray(res.body)).to.be.true;
                done();
            });
        });
    });
    describe('Delete a Test', () => {
        it('Status 200', (done) => {
            requester.delete(`/test/${testUpdate.id}`)
                .end((err, res) => {
                expect(res).to.have.status(200);
                expect(Array.isArray(res.body)).to.be.true;
                done();
            });
        });
    });
});
//# sourceMappingURL=index.test.js.map