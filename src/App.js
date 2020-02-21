import React from 'react';
import './App.css';
import Table from './Table';
import StatesList from './StatesList'

import report from './report.json';

function App() {
  const data = report.data;

  const fieldsProcessos = {
    estados_sem_processos: 'Estados sem Processos',
    estados_com_processos: 'Estados com Processos',
    estados_indeterminados: 'Estados Indeterminados'
  };

  const renderersProcessos = {
    label: ((data) => fieldsProcessos[data]),
    value: ((data, row) => <StatesList color={row.label} states={data} />),
  };

  const renderersCertidoes = {
    nada_consta: ((data) => (data ? 'Sim' : 'Não')),
    arquivo: ((data) => data === 'Arquivo' ? data : <a href={data}>Baixar</a>)
  };

  const columnsCertidoes = [ 'emitido_em', 'fonte', 'protocolo', 'nada_consta', 'arquivo' ];

  const rowsFunctionCertidoes = (data, _) => [
    {
      emitido_em: 'Data de Emissão',
      fonte: 'Fonte',
      protocolo: 'Protocolo',
      nada_consta: 'Nada Consta',
      arquivo: 'Arquivo'
    },
    data
  ];

  const simpleData = {
    'Nome do Personagem': 'Jon Snow',
    'Nome do(a) Ator/Atriz': 'Kit Harington',
    'Nome da Série': 'Game of Thrones',
  }

  return (
    <div className='App'>
      {/*
        por padrão, quando uma Table não recebe a prop `rowsFunction` ela vai pegar o `data` fornecido e criar um array
        de rows contendo 2 colunas - label e value - baseado no valor valor fornecido em `fields`
      */}
      <Table
        data={simpleData}
        fields={Object.keys(simpleData)} />

      {/*
        nesse caso é função do programador fornecer uma função `rowsFunction` que recebe o `data` e `fields` e retorna
        um array de rows com qunatas colunas ele necessite pra tabela, mas também é preciso informar o array de colunas
        na ordem que elas devem ser renderizadas.
      */}
      {
        data.certidoes_negativas.itens.map(
          (certidoes_negativas, i) =>
            <Table
              key={`certidoes-${i}`}
              className='certidoes'
              renderers={renderersCertidoes}
              columns={columnsCertidoes}
              rowsFunction={rowsFunctionCertidoes}
              data={certidoes_negativas} />
        )
      }

      {/*
        também é possível fornecer um objeto de renderers com um mapeamento nome do campo => função pra executar
      */}
      <Table
        className='processos'
        renderers={renderersProcessos}
        fields={Object.keys(fieldsProcessos)}
        data={data.processos} />
    </div>
  );
}

export default App;
