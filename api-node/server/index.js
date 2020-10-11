"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PORT_EXPRESS = 7070;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
const app = express_1.default();
app.use(helmet_1.default());
app.use(compression_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/', routes_1.default);
app.use((req, res) => res.status(404).send('Not found'));
app.listen(PORT_EXPRESS, () => {
    console.log("Server listening to ", PORT_EXPRESS);
});
exports.default = app;
//# sourceMappingURL=index.js.map