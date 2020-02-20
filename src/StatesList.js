import React from 'react';

function StatesList({ color, states }) {
  return (
    <ul className={color}>
      {states.map(state => <li>{state}</li>)}
    </ul>
  );
}

export default StatesList;
