import React from 'react';
import './App.css';
import Table from './Table';
import StatesList from './StatesList'

import report from './report.json';

function App() {
  let attributes = [
    { field: 'estados_sem_processos', title: 'Não Constam', renderer: ((data) => <StatesList color="green" states={data} />) },
    { field: 'estados_com_processos', title: 'Constam Processos', renderer: ((data) => <StatesList color="red" states={data} />) },
    { field: 'estados_indeterminados', title: 'Estados Não Verificados', renderer: ((data) => <StatesList color="yellow" states={data} />) }, 
  ];

  let columns = [ 'title', 'value' ]

  let data = report.data;

  return (
    <div className="App">
      <Table column={columns} attributes={attributes} data={data.processos} />
    </div>
  );
}

export default App;
