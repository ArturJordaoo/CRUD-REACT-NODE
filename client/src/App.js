import { useState } from 'react'
import './App.css'

function App() {
	const [nome, setNome] = useState('')
	const [id, setId] = useState(0)
	const [funcao, setFuncao] = useState('')
	const [salario, setSalario] = useState(0)
	const [dept, setDept] = useState('')

	return (
		<div className="App">
			<div className="info">
				<label>Nome</label>
				<input
					type="text"
					onChange={(event) => {
						setNome(event.target.value)
					}}
				/>
				<label>ID</label>
				<input
					type="number"
					onChange={(event) => {
						setId(event.target.value)
					}}
				/>
				<label>Função</label>
				<input
					type="text"
					onChange={(event) => {
						setFuncao(event.target.value)
					}}
				/>
				<label>Salário</label>
				<input
					type="text"
					onChange={(event) => {
						setSalario(event.target.value)
					}}
				/>
				<label>Departamento</label>
				<input
					type="text"
					onChange={(event) => {
						setDept(event.target.value)
					}}
				/>
				<button>Salvar Empregado</button>
			</div>
		</div>
	)
}

export default App
