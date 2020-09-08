import React from 'react';
import { Button } from 'antd';

import './header.scss';

interface Props {
  onChangeWorkSpace: (event:any) => void
}

const Header: React.FunctionComponent<Props> = ({ onChangeWorkSpace }) => {

  return (
    <div className="header" >
      <div>Header</div>
      <div className="header__button-block">
        <Button onClick={() => onChangeWorkSpace('table')} >Table</Button>
        <Button onClick={() => onChangeWorkSpace('list')}>List</Button>
        <Button onClick={() => onChangeWorkSpace('calendar')}>Calendar</Button>
      </div>
    </div>
  );
}

export default Header;
