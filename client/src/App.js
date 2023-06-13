import Axios from 'axios';
import React, { useState } from 'react';
import './App.css';

function App() {
  const [nome, setNome] = useState('');
  const [funcao, setFuncao] = useState('');
  const [salario, setSalario] = useState(0);
  const [dept, setDept] = useState('');
  const [listEmpregados, setlistEmpregados] = useState([]);
  const [novoNome, setNovoNome] = useState('');

  const addFuncionario = () => {
    Axios.post('http://localhost:3001/create', {
      nome: nome,
      funcao: funcao,
      salario: salario,
      dept: dept,
    }).then((response) => {
      const novoFuncionario = {
        id: response.data.id, // Adicione o ID retornado pelo servidor
        nome: nome,
        funcao: funcao,
        salario: salario,
        dept: dept,
      };
      setlistEmpregados([...listEmpregados, novoFuncionario]);
    });
  };

  const getFuncionarios = () => {
    Axios.get('http://localhost:3001/funcionarios').then((response) => {
      setlistEmpregados([...response.data]);
    });
  };

  const updateFuncNome = (id) => {
    Axios.put('http://localhost:3001/update', { nome: novoNome, id: id });
    console.log('updated');
  };

  const deleteFuncionario = (id) => {
    console.log(id);
    Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
      setlistEmpregados((prevList) =>
        prevList.filter((funcionario) => funcionario.id !== id)
      );
    });
  };

  return (
    <div className="App">
      <div className="info">
        <label>Nome</label>
        <input
          type="text"
          onChange={(event) => {
            setNome(event.target.value);
          }}
        />
        <label>Função</label>
        <input
          type="text"
          onChange={(event) => {
            setFuncao(event.target.value);
          }}
        />
        <label>Salário</label>
        <input
          type="text"
          onChange={(event) => {
            setSalario(event.target.value);
          }}
        />
        <label>Departamento</label>
        <input
          type="text"
          onChange={(event) => {
            setDept(event.target.value);
          }}
        />
        <button onClick={addFuncionario}>Salvar Empregado</button>
      </div>
      <div className="funcionarios">
        <button onClick={getFuncionarios}>Mostrar funcionários</button>
        {listEmpregados.map((val) => {
          return (
            <div className="showFunc" key={val.id}>
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
                    placeholder="2000..."
                    onChange={(event) => {
                      setNovoNome(event.target.value);
                    }}
                  />
                  <button
                    onClick={() => {
                      updateFuncNome(val.id);
                    }}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => {
                      deleteFuncionario(val.id);
                    }}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
  