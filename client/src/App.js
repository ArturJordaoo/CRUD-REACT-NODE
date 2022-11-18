import Axios from 'axios'
import { useState } from 'react'
import './App.css'

function App() {
	const [nome, setNome] = useState('')
	const [funcao, setFuncao] = useState('')
	const [salario, setSalario] = useState(0)
	const [dept, setDept] = useState('')
	const [listEmpregados, setlistEmpregados] = useState([])

	const [novoNome, setNovoNome] = useState('')

	const addFucionario = () => {
		Axios.post('http://localhost:3001/create', {
			nome: nome,
			funcao: funcao,
			salario: salario,
			dept: dept,
		}).then(() => {
			setlistEmpregados([
				...listEmpregados,
				{
					nome: nome,
					funcao: funcao,
					salario: salario,
					dept: dept,
				},
			])
		})
	}
	const getFuncionario = () => {
		Axios.get('http://localhost:3001/funcionarios').then((response) => {
			setlistEmpregados(response.data)
		})
	}
	const updateFuncNome = (id) => {
		Axios.put('http://localhost:3001/update', { nome: novoNome, id: id }).then(
			(response) => {
				setlistEmpregados(
					listEmpregados.map((val) => {
						return val.id == id
							? {
									id: val.id,
									nome: val.novoNome,
									salario: val.salario,
									dept: val.dept,
							  }
							: val
					}),
				)
			},
		)
	}
	/* const deleteFunc = (id) => {
		Axios.delete(`http://localhost:3001/delete/${id}`)
	} */
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
				<button onClick={addFucionario}>Salvar Empregado</button>
			</div>
			<div className="funcionarios">
				<button onClick={getFuncionario}>Mostrar funcionários</button>
				{listEmpregados.map((val, key) => {
					return (
						<div className="showFunc">
							<div>
								<h3>
									Nome: <br />
									{val.nome}
								</h3>
								<h3>
									Função: <br />
									{val.funcao}
								</h3>
								<h3>
									Salário: <br />
									{val.salario}
								</h3>
								<h3>
									Departamento: <br />
									{val.dept}
								</h3>
							</div>
							<div>
								<input
									type="text"
									placeholder="200"
									onChange={(event) => {
										setNovoNome(event.target.value)
									}}
								/>
								<button onClick={() => updateFuncNome(val.id)}>Uptdate</button>
								{/* <button onClick={deleteFunc(val.id)}>Excluir</button> */}
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default App
