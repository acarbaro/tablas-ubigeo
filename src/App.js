import React, { Component } from 'react';
import './App.css';
import constants from './assets/constants';
import Ubigeo from './component/Ubigeo';

const { listaUbigeo } = constants;

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      listaDepartamento: [],
      listaProvincia: [],
      listaDistrito: []
    }
  }

  componentDidMount(){
      this.obtenerDepartamento();
      this.obtenerProvincia(); 
      this.obtenerDistrito();
  }

  obtenerDepartamento(){
    let departamentos = listaUbigeo.map(function (listaMayor) {
      return listaMayor.split('/')[0]
    });
    let listado = departamentos.filter(function(elem, index, self) {
      return index === self.indexOf(elem)
    }); 
    let listaDepartamento = listado.map(departamento => 
        departamento.trim().split(' ')
    );
    this.setState({ listaDepartamento });
  }

  obtenerProvincia(){
    let listado = [];
    let departamentos = listaUbigeo.map(function (listaMayor) {
      let listaSeparada = listaMayor.split('/');
      return [listaSeparada[0], listaSeparada[1]]
    });
    let removerVacios = departamentos.sort(((a,b) => a-b)).filter( function (elem, index, self ) {
      return elem[1].trim() !== ''
    }); 
    removerVacios.sort().map(function (value, index) {
      (!index || value[1] !== removerVacios[index - 1][1]) && listado.push(value)
    })
    let listaProvincia = listado.map(provincia => 
        [provincia[0].trim().split(' '), provincia[1].trim().split(' '), ]
    )
    this.setState({ listaProvincia });
  }

  obtenerDistrito(){
    let departamentos = listaUbigeo.map(function (listaMayor) {
      let listaSeparada = listaMayor.split('/');
      return [listaSeparada[0], listaSeparada[2]]
    });

    let removerVacios = departamentos.sort((a,b) => a-b).filter( function (elem, index, self ) {
      return elem[1].trim() !== ''
    }); 

    let listaDistrito = removerVacios.map(distrito => 
      [distrito[0].trim().split(' '), distrito[1].trim().split(' '), ]
  )

    this.setState({ listaDistrito });
  }



  render() {
    return (
      <div className="App">
        <div className="Ubigeo">
          <h3>DEPARTAMENTO</h3>
          <table>
            <tbody>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Código Padre</th>
                <th>Descripción Padre</th>
              </tr>
              {this.state.listaDepartamento.map((departamento, dep) =>
                <tr key={dep}>
                  <td>{departamento[0]||'-'}</td>
                  <td>{departamento[1]||'-'}</td>
                  <td>{departamento[2]||'-'}</td>
                  <td>{departamento[3]||'-'}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="Ubigeo">
          <h3>PROVINCIA</h3>
          <table>
            <tbody>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Código Padre</th>
                <th>Descripción Padre</th>
              </tr>
              {this.state.listaProvincia.map((provincia, prov) =>
                <tr key={prov}>
                  <td>{provincia[1][0]||'-'}</td>
                  <td>{provincia[1][1]||'-'}</td>
                  <td>{provincia[0][0]||'-'}</td>
                  <td>{provincia[0][1]||'-'}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="Ubigeo">
          <h3>DISTRITO</h3>
          <table>
            <tbody>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Código Padre</th>
                <th>Descripción Padre</th>
              </tr>
              {this.state.listaDistrito.map((distrito, dist) =>
                <tr key={dist}>
                  <td>{distrito[1][0]||'-'}</td>
                  <td>{`${distrito[1][1]} ${distrito[1][2]}` ||'-'}</td>
                  <td>{distrito[0][0]||'-'}</td>
                  <td>{distrito[0][1]||'-'}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
