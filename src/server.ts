import express from 'express'
import cors from 'cors'
import routes from "./routes";

const app = express();

// Configurações necessarias para aplicação
app.use( cors() );
app.use( express.json() );

// Configura as rotas, organizadas
app.get('/', (req, res) => { return res.json({mensagem: "API ESTA RODANDO! [0.0.1]"}) })
app.use( '/api', routes );

// Necessario para Deploy
var server_port = process.env.PORT || 5000;

app.listen(server_port, function() {
    console.log('Listening on port %d', server_port);
});