import React from 'react';
import { Menu } from 'antd';


const menu = (changeWorkSpace:any) => (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="1" data-space="table" onClick={changeWorkSpace}>Table</a>
    </Menu.Item>
    <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="1" data-space="list" onClick={changeWorkSpace}>List</a>
    </Menu.Item>
    <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="1" data-space="calendar" onClick={changeWorkSpace}>Calendar</a>
    </Menu.Item>
  </Menu>
);

export default menu;