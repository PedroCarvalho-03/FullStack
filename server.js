const bodyParser = require('body-parser');
const { DatabaseSync } = require('node:sqlite3');

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

//conetar ao banco

const db = mysql.createConnection({
    host: 'servidorAplicacao',
    user: 'root',
    password: 'senha',
    database: 'estudo'
});

db.connect((err) => {
    if(err){
        console.log('Não foi possivel conectar ao banco de dados',err);
    } else {
        console.log('Conectado ao banco de dados');
    }
    
});

app.get('/usuarios', ( req, res) => {
    db.query('SELECT * FROM usuarios', (err, result) => {
        if(err){
            res.status(500).json({erro: 'Erro ao buscar usuários.' });
        } else {
            res.send(result);
        }
    });
});
//add usuario
app.post('/usuarios', (req, res) => {
    const{nome}= req.body;
    if(!nome){
        return res.status(4000).json({erro: 'Nome é obrigatório'});
    }
    db.query('INSERT INTO usuarios (nome) VALUES (?)', [nome], (err,result) => {
        if(err){
            res.status(500).json({erro: 'Erro ao inserir usuário.' });
        } else {
            res.json({id result.insertId, nome});
        }
    });
});

//atualizar usuario
app.put('/usuarios/:id', (req, res) => {
    const {nome} = req.body;
    const {id} = req.params;
    if(!nome){
        return res.status(400).json({erro: 'Nome é obrigatório'});
    }
    db.query('UPDATE usuarios SET nome = ? WHERE id = ?', [nome, id], (err, result) => {
        if(err){
            res.status(500).json({erro: 'Erro ao atualizar usuário.' });
        } else {
            res.json({id, nome});
        }
    });
});

//deletar usuario
app.delete('/usuarios/:id', (req, res) => {
    const {id} = req.params;

    db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, result) => {
        if(err){
            res.status(500).json({erro: 'Erro ao deletar usuário.' });
        } else if(result.affectedRows === 0){
            res.status(404).json({erro: 'Usuário não encontrado.' });
            res.json({message: 'Usuário deletado com sucesso.'});
        }
    });
});

//iniciar servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});