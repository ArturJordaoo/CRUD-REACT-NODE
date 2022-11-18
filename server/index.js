const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
	user: 'root',
	host: 'localhost',
	password: 'password',
	database: 'crudbd',
})

app.post('/create', (req, res) => {
	console.log(req.body)
	const id = req.body.id
	const nome = req.body.nome
	const funcao = req.body.funcao
	const salario = req.body.salario
	const dept = req.body.dept

	db.query(
		'INSERT INTO funcionario (nome, funcao, salario, dept) VALUES (?,?,?,?)',
		[nome, funcao, salario, dept],
		(err, result) => {
			if (err) {
				console.log(err)
			} else {
				res.send('Values inserted')
			}
		},
	)
})

app.get('/funcionarios', (req, res) => {
	db.query('SELECT * FROM funcionario', (err, result) => {
		if (err) {
			console.log(err)
		} else {
			res.send(result)
		}
	})
})

app.put('/update', (req, res) => {
	const id = req.body.id
	const nome = req.body.nome
	db.query(
		'UPDATE funcionario SET nome = ? WHERE id = ?',
		[nome, id],
		(err, result) => {
			if (err) {
				console.log(err)
			} else {
				res.send(result)
			}
		},
	)
})
/* app.delete('/delete/:id', (req, res) => {
	let id = req.params.id
	db.query('DELETE FROM funcionario WHERE id = ?', id, (err, result) => {
		if (err) {
			console.log(err)
		} else {
			res.send(result)
		}
	})
}) */

app.listen(3001, () => {
	console.log('listening on port 3001')
})
