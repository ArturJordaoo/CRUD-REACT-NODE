const express = require('express')
const app = express()
const { Pool } = require('pg')
const cors = require('cors')

app.use(cors())
app.use(express.json())

const db = new Pool({
	user: 'postgres',
	host: 'localhost',
	password: 'krud123',
	database: 'crudbd',
	port: 5432,
})

app.post('/create', (req, res) => {
	console.log(req.body)
	const nome = req.body.nome
	const funcao = req.body.funcao
	const salario = req.body.salario
	const dept = req.body.dept

	db.query(
		'INSERT INTO funcionario (nome, funcao, salario, dept) VALUES ($1, $2, $3, $4)',
		[nome, funcao, salario, dept],
		(err, result) => {
			if (err) {
				console.log(err)
			} else {
				res.send('Values inserted')
			}
		}
	)
})

app.get('/funcionarios', (req, res) => {
	db.query('SELECT * FROM funcionario', (err, result) => {
		if (err) {
			console.log(err)
		} else {
			res.send(result.rows)
		}
	})
})

app.put('/update', (req, res) => {
	const id = req.body.id
	const nome = req.body.nome
	db.query(
		'UPDATE funcionario SET nome = $1 WHERE id = $2',
		[nome, id],
		(err, result) => {
			if (err) {
				console.log(err)
			} else {
				res.send(result)
			}
		}
	)
})

app.delete('/delete/:id', (req, res) => {
	let id = req.params.id
	db.query('DELETE FROM funcionario WHERE id = $1', [id], (err, result) => {
		if (err) {
			console.log(err)
		} else {
			res.send(result.rows)
		}
	})
})

app.listen(3001, () => {
	console.log('Listening on port 3001')
})
