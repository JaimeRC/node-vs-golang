"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = express_1.Router();
// Health Check
router.get('/health_check', controllers_1.getHealthCheck);
// Crud
router.get('/test', controllers_1.getTests);
router.get('/test/:id', controllers_1.getTest);
router.post('/test', controllers_1.createTest);
router.put('/test/:id', controllers_1.updateTest);
router.delete('/test/:id', controllers_1.deleteTest);
exports.default = router;
//# sourceMappingURL=index.js.map