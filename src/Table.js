import React from 'react';

function Table({ parserFunction = ((data) => data), ...props }) {
  let parsedData = parserFunction(props.data);

  return (
    <table>
      {
        props.attributes.map(attr => {
          let renderer = attr.renderer || ((data) => data);
          return (
            <tr>
              <td>{attr.title}</td>
              <td>{renderer(parsedData[attr.field])}</td>
            </tr>
          )
        })
      }
    </table>
  );
}

export default Table;
