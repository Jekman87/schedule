import React from 'react';
<<<<<<< HEAD
import { Button } from 'antd';
=======
import { Button, Dropdown } from 'antd';
import menu from './components/menu';
import Timezone from './components/timezone';
import Editor from './components/editor';
import view from './data/view.png';
import download from './data/download.png';
import eye from './data/eye.png';
import settings from './data/settings.png';
import arrow from './data/arrow.png';
>>>>>>> origin/Header-component

import './header.scss';

interface Props {
  onChangeWorkSpace: (event:any) => void
}

const Header: React.FunctionComponent<Props> = ({ onChangeWorkSpace }) => {

<<<<<<< HEAD
  return (
    <div className="header" >
      <div>Header</div>
      <div className="header__button-block">
        <Button onClick={() => onChangeWorkSpace('table')} >Table</Button>
        <Button onClick={() => onChangeWorkSpace('list')}>List</Button>
        <Button onClick={() => onChangeWorkSpace('calendar')}>Calendar</Button>
=======


function Header() {
  return (
    <div className="header">
      <div className="top">
        <img src="https://rs.school/images/rs_school.svg" alt="" className="logo" />
        <div className="title">Schedule</div>
        <Button type="dashed" className="logIn">My Profile</Button>
      </div>
      <div className="nav">
        <div className="center">
          <div className="view">
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()} href="#s">
                <img src={view} alt="view" />
              </a>
            </Dropdown>
            <Button type="link" className="download-btn"><img src={download} alt="download" /></Button>
          </div>
          <div className="user">
            <Button type="primary" className="event-btn">Add Event</Button>
            <div className="mentor">Mentor</div>
          </div>
        </div>
        <div className="bottom">
          <div className="vision">
            <Dropdown overlay={Editor}>
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()} href="#s">
                <img src={arrow} alt="Edit" />
              </a>
            </Dropdown>
            <span></span>
            <Dropdown overlay={Timezone}>
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()} href="#s">
                Time zone
              </a>
            </Dropdown>
          </div>
          <div className="settings">
            <img src={eye} alt="For the visually impaired"/>
            <span></span>
            <img src={settings} alt=""/>
          </div>
        </div>
>>>>>>> origin/Header-component
      </div>
    </div>
  );
}

export default Header;
