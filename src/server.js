const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require('./config/database');
require('./models/associations');

const app = express();
const PORT = process.env.PORT || 3056;

// O CORS ta assim pq precisei liberar acesso na rede de casa
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://192.168.1.110:5173',
        'http://localhost:3000',
        'http://192.168.1.100:3000'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API SisCheck rodando 🚀");
});

app.use('/auth', require('./routes/auth-routes'));
app.use('/participant', require('./routes/participant-routes'))
app.use('/activity', require('./routes/activity-routes'))
app.use('/attendance', require('./routes/attendance-routes'))

app.post("/presenca", (req, res) => {
  const { nome, email } = req.body;
  res.json({ message: `Presença registrada: ${nome} (${email})` });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// TODO: Depois colocar isso aqui em um arquivo separado talvez ou deixar aqui mesmo
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com PostgreSQL estabelecida');

        await sequelize.sync({ alter: true });
        console.log('Modelos sincronizados com o banco');

        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Erro ao conectar com o banco:', error);
        process.exit(1);
    }
};

startServer();
