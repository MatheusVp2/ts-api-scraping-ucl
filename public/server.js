"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
// Configurações necessarias para aplicação
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Configura as rotas, organizadas
app.get('/', (req, res) => { return res.json({ mensagem: "API ESTA RODANDO!" }); });
app.use('/api', routes_1.default);
// Necessario para Deploy
var server_port = process.env.PORT || 5000;
app.listen(server_port, function () {
    console.log('Listening on port %d', server_port);
});
