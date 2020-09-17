import React, { useState } from 'react';
import { Button, Dropdown, Switch } from 'antd';
import menu from './components/menu';
import Timezone from './components/timezone';
import Editor from './components/editor';
import view from './data/view.png';
import download from './data/download.png';
import eye from './data/eye.png';
import settingsImg from './data/settings.png';
import arrow from './data/arrow.png';
import { SettingsType } from '../../constants/interfaces';
import { ROLE } from '../../constants/constants';

import './header.scss';

interface Props {
  settings: SettingsType
  changeWorkSpace: (event: any) => void
}

const Header: React.FunctionComponent<Props> = ({ settings, changeWorkSpace }) => {
  const [role, setRole] = useState(ROLE.mentor)
  const onChange = (checked: boolean) => {
    if (checked) {
      setRole(ROLE.mentor)
    } else {
      setRole(ROLE.student)
    }
}
  // const clickHandler = (event:any) => {
  //   const clickedSpace = event.target.dataset.space;

  //   event.preventDefault();
  //   onChangeWorkSpace(clickedSpace);
  // }

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
            <Dropdown overlay={menu(changeWorkSpace)}>
              <a className="ant-dropdown-link" href="#s">
                <img src={view} alt="view" />
              </a>
            </Dropdown>
            <Button type="link" className="download-btn"><img src={download} alt="download" /></Button>
          </div>
          <div className="user">
            <Button type="primary" className="event-btn">Add Event</Button>
            <Switch defaultChecked onChange={onChange} />
            <div className="mentor">{role}</div>
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
            <img src={eye} alt="For the visually impaired" />
            <span></span>
            <img src={settingsImg} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
