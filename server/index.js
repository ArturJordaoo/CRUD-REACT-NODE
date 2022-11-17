const express = require('express')
const app = express()
const mysql = require('mysql')

const db = mysql.createConnection({
	user: 'root',
	host: 'localhost',
	password: '',
	database: 'crudbd',
})

app.post('/create', (req, res) => {
	const id = req.body.id
	const nome = req.body.nome
	const funcao = req.body.nome
	const func_salario = req.body.func_salario
	const func_dept = req.body.func_dept

	db.query(
		'INSERT INTO funcionario (nome, funcao, func_salario, func_dept) VALUES (?,?,?,?)',
		[nome, funcao, func_salario, func_dept],
		(err, result) => {
			if (err) {
				console.log(err)
			} else {
				res.send('Sucesso')
			}
		},
	)
})

app.listen(3001, () => {
	console.log('listening on port 3001')
})
