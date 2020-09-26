import React from 'react';
import { Menu, Button, Dropdown, Switch } from 'antd';

import { SettingsType } from '../../constants/interfaces';
import { ROLE, TIME_ZONE, WORK_SPACE } from '../../constants/constants';

import { AppstoreTwoTone, ProfileTwoTone, CalendarTwoTone } from '@ant-design/icons';

import './header.scss';

interface Props {
  settings: SettingsType
  changeWorkSpace: (space: string) => void
  changeRole: (role: string) => void
  changeTimeZone: (timezone: string) => void
  showEditWindow: () => void
}

const Header: React.FunctionComponent<Props> = ({ settings, changeWorkSpace, changeRole, changeTimeZone, showEditWindow }) => {

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
    if (checked) {
      changeRole(ROLE.mentor)
    } else {
      changeRole(ROLE.student)
    }
  }

  const menu = (
    <Menu>
      {Object.values(TIME_ZONE).map((el) => {
        return (
          <Menu.Item key={el.location}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="null"
            onClick={(event) => {
              event?.preventDefault();
              changeTimeZone(el.location);
            }}
          >
            {el.location}
          </a>
        </Menu.Item>
        )
      })}
    </Menu>
  );

  return (
    <div className="header">

      <div className="header__static">
        <img src="https://rs.school/images/rs_school.svg" alt="" />
        <div>Schedule</div>
        <Button type="dashed">My Profile</Button>
      </div>

    <div className="header__status">

      <div className="header__navigation">

        <div className="header__button-block">
          <AppstoreTwoTone
            twoToneColor={settings.workSpace === 'Table' ? '#fd594d' : '#1890ff'}
            style={{ fontSize: '2rem' }}
            className="table-header__icon"
            onClick={() => changeWorkSpace(WORK_SPACE.table)} />
          <ProfileTwoTone
            twoToneColor={settings.workSpace === 'List' ? '#fd594d' : '#1890ff'}
            style={{ fontSize: '2rem' }}
            className="table-header__icon"
            onClick={() => changeWorkSpace(WORK_SPACE.list)} />
          <CalendarTwoTone
            twoToneColor={settings.workSpace === 'Calendar' ? '#fd594d' : '#1890ff'}
            style={{ fontSize: '2rem' }}
            className="table-header__icon"
            onClick={() => changeWorkSpace(WORK_SPACE.calendar)} />
        </div>

        <Dropdown overlay={menu} placement="bottomCenter" arrow>
          <Button>{settings.timeZone}</Button>
        </Dropdown>
      </div>

      <div className="header__role-block">
        <div className="header__role">
          <span>{settings.role}</span>
          <Switch
            defaultChecked={settings.role === 'Student' ? false : true}
            className="header__switcher"
            onChange={onChange} />
        </div>
        <Button
          disabled={settings.role === 'Student' ? true : false}
          type="primary"
          className="header__button"
          onClick={() => showEditWindow()}>Add Event</Button>
      </div>

    </div>

    </div>
  );
}

export default Header;
