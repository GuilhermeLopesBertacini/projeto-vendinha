import React, { useEffect, useState } from 'react'
import './App.css'
import Layout from './layout/Layout';
import { BrowserRouter, registerPathTypeParameter } from 'simple-react-routing';
import Home from './Home';
import ListaClientes from './clientes/ListaClientes';
import FormCliente from './clientes/FormClientes';
import DividasList from './dividas/ListaDividas';

registerPathTypeParameter("numero", /[0-9]+/);

function App() {
  

  const stateCount = useState(0); // state - hook -> retorna [valor, setValor]

  const count = stateCount[0];
  const setCount = stateCount[1];

  console.log("RENDERIZANDO APP:::", count);
  var classDiv = "classe-div";

  useEffect(function () {
    console.log("1) ACIONANDO EFEITO DO COMPONENTE")
  }, []);

  useEffect(() => {
    console.log("2) ACIONANDO EFEITO DO COMPONENTE")
  }, [count]);

  return (
    <BrowserRouter
      notFoundPage={<h1>404 - NOT FOUND</h1>}
      routes={[
        {
          path: "",
          component: <Home></Home>
        },
        {
          path: "clientes",
          component: <ListaClientes a={0} texto="TEXT" seila={true}></ListaClientes>
        },
        {
          path: "clientes/criar",
          component: <FormCliente></FormCliente>
        },
        {
          path: "clientes/editar/:codigo(numero)",
          component: <FormCliente></FormCliente>
        },
        {
          path: "dividas",
          component: <DividasList></DividasList>
        }
      ]}>

      <Layout></Layout>
    </BrowserRouter>
  )
}

export default App