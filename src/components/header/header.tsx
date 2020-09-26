import React from 'react';
import { Menu, Button, Dropdown, Switch } from 'antd';

import { SettingsType } from '../../constants/interfaces';
import { saveSchedule } from '../../helpers/utils';
import { ROLE, TIME_ZONE, WORK_SPACE, EVENT_CONFIG } from '../../constants/constants';

import { AppstoreTwoTone, ProfileTwoTone, CalendarTwoTone, FileWordTwoTone, FireTwoTone } from '@ant-design/icons';


import './header.scss';

interface Props {
  appData: any,
  settings: SettingsType
  changeWorkSpace: (space: string) => void
  changeRole: (role: string) => void
  changeTimeZone: (timezone: string) => void
  showNewEventModal: () => void
}

const Header: React.FunctionComponent<Props> = ({ appData, settings, changeWorkSpace, changeRole, changeTimeZone, showNewEventModal }) => {

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
    if (checked) {
      changeRole(ROLE.mentor)
    } else {
      changeRole(ROLE.student)
    }
  }

  const eventTypes = (
    <Menu>
      <Menu.Item key='All'>
        <a 
          target="_blank" 
          rel="noopener noreferrer" 
          href="null"
          onClick={(event) => {
            event.preventDefault();
            console.log('')
        }}>all</a>
      </Menu.Item>
      {EVENT_CONFIG.type.map((el, index) => {
        return (
          <Menu.Item key={el}>
            <a 
              target="_blank" 
              rel="noopener noreferrer" 
              href="null"
              onClick={(event) => {
                event.preventDefault();
                console.log(el)
            }}>{el}</a>
          </Menu.Item>
        )
      })}
    </Menu>
  );

  const timezones = (
    <Menu>
      {Object.values(TIME_ZONE).map((el) => {
        return (
          <Menu.Item key={el.location}>
          <a 
            target="_blank" 
            rel="noopener noreferrer" 
            href="null"
            onClick={(event) => {
              event.preventDefault();
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

    <div className="header__navigation-block">

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
        <FileWordTwoTone
          twoToneColor='#4caf50'
          style={{ fontSize: '2rem' }} 
          className="table-header__icon table-header__icon-file"
          onClick={() => saveSchedule(appData, settings)} />
        <FireTwoTone
          twoToneColor='#ff9800'
          style={{ fontSize: '2rem' }} 
          className="table-header__icon table-header__icon-fire"
          onClick={() => console.log('Прячем неактуальные события')} />
      </div>

      <div>
        <Dropdown 
          arrow
          overlay={timezones} 
          placement="bottomCenter"
          className="header__drop-down">
            <Button>{settings.timeZone}</Button>
        </Dropdown>

        <Dropdown 
          arrow
          overlay={eventTypes} 
          placement="bottomCenter"
          className="header__drop-down">
            <Button>Filter by type</Button>
        </Dropdown>
      </div>

      </div>

      <div className="header__role-block">
        <div className="header__role">
          <span>{settings.role}</span>
          <Switch 
            defaultChecked={settings.role === 'Student' ? false : true}
            className="header__switcher"
            onChange={onChange} />
        </div>
        {settings.role === 'Mentor'
          ? <Button 
            type="primary" 
            className="header__button"
            onClick={() => showNewEventModal()}>Add Event</Button>
          : null}
      </div>
    </div>

    </div>
  );
}

export default Header;
