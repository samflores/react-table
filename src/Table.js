import React from 'react';

function defaultRowsFunction(data, fields) {
  return fields.map(field => ({ label: field, value: data[field] }));
}

function Table({
  rowsFunction = defaultRowsFunction,
  columns = [ "label", "value" ],
  fields = [],
  renderers = {},
  data,
  ...props
}) {
  let rows = rowsFunction(data, fields);

  return (
    <table className={props.className}>
      <tbody>
        {
          rows.map(
            (row, i) =>
              <tr key={`${props.className}-${i}`}>
                {
                  columns.map(column => {
                    let renderer = renderers[column] || ((data, row) => data);
                    return (
                      <td className={column} key={`${props.className}-${i}-${column}`}>
                        {renderer(row[column], row)}
                      </td>
                    );
                  })
                }
              </tr>
          )
        }
      </tbody>
    </table>
  );
}

export default Table;
