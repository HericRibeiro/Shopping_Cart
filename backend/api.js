const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());

app.use(express.json());

app.post('/comprar', (req, res) => {
    const { produto, quantidade, saldo } = req.body;
    console.log(`Produto: ${produto}, Quantidade: ${quantidade}, Saldo: ${saldo}`);

    const precos = {
        ipad: 100,
        notebook: 1000,
        teclado: 49,
        iphone: 3000,
    }

    if (saldo < (precos[produto] * quantidade)) {
        return res.status(400).json({
            mensagem: 'Saldo insuficiente',
        });
    }

    res.json({
        mensagem: 'Compra realizada com sucesso!',
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});