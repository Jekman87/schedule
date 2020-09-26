import React from 'react';
import { Menu } from 'antd';
import { WORK_SPACE } from '../../../constants/constants';

const keys = Object.values(WORK_SPACE);

const menu = (changeWorkSpace: any) => {
  const menuItems = keys.map((key) => {
    return (
      <Menu.Item onClick={() => changeWorkSpace(key)} key={key}>
        {key}
      </Menu.Item>
    );
  })

  return (
    <Menu>
      {menuItems}
    </Menu>
  );
}

export default menu;
