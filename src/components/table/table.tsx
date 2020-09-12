import React from 'react';

import './table.scss';

interface Props {
  appData: any[]
}

const Table: React.FunctionComponent<Props> = ({ appData }) => {
  return (
    <div className="table">Table</div>
  );
}

export default Table;
