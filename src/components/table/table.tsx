import React from 'react';

import './table.scss';

interface Props {
  text: string
}

const Table: React.FunctionComponent<Props> = ({ text }) => {
  return (
    <div className="table">{text}</div>
  );
}

export default Table;
