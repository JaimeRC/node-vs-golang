"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTest = exports.updateTest = exports.createTest = exports.getTest = exports.getTests = exports.getHealthCheck = void 0;
const uuid_1 = require("uuid");
exports.getHealthCheck = (req, res) => {
    const status = { status: true, message: "Server is running!!!" };
    res.send(status);
};
const tests = [];
exports.getTests = (req, res) => {
    if (tests.length) {
        res.send(tests);
    }
    else {
        res.status(204).send();
    }
};
exports.getTest = (req, res) => {
    const { params: { id } } = req;
    const test = tests.find((test) => test.id === id);
    if (test) {
        res.send(test);
    }
    else {
        res.status(204).send();
    }
};
exports.createTest = (req, res) => {
    const test = req.body;
    test.id = uuid_1.v4();
    test.createdAt = new Date();
    tests.push(test);
    res.send(test);
};
exports.updateTest = (req, res) => {
    const { params: { id } } = req;
    const updatedTest = req.body;
    const oldTestIndex = tests.findIndex((test) => test.id === id);
    if (oldTestIndex === -1) {
        res.status(204).send();
    }
    else {
        updatedTest.updatedAt = new Date();
        tests[oldTestIndex] = updatedTest;
        res.send(updatedTest);
    }
};
exports.deleteTest = (req, res) => {
    const { params: { id } } = req;
    const oldTestIndex = tests.findIndex((test) => test.id === id);
    if (oldTestIndex === -1) {
        res.status(204).send();
    }
    else {
        delete tests[oldTestIndex];
        res.send(tests);
    }
};
//# sourceMappingURL=index.js.map