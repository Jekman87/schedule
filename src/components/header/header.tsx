import React from 'react';
import { Menu, Button, Dropdown, Switch, Tooltip } from 'antd';

import { SettingsType } from '../../constants/interfaces';
import { ROLE, TIME_ZONE, WORK_SPACE, EVENT_CONFIG } from '../../constants/constants';

import { AppstoreTwoTone, ProfileTwoTone, CalendarTwoTone, FileWordTwoTone, FireTwoTone } from '@ant-design/icons';


import './header.scss';

interface Props {
  settings: SettingsType
  changeWorkSpace: (space: string) => void
  changeRole: (role: string) => void
  changeTimeZone: (timezone: string) => void
  showEditWindow: () => void
  changeTaskFilter: (taskFilter: string) => void
  changeVisibilityOldEvengs: (visibilityOldEvents: boolean) => void
  downloadSchedule: () => void
}

const Header: React.FunctionComponent<Props> = ({
  settings,
  changeWorkSpace,
  changeRole,
  changeTimeZone,
  showEditWindow,
  changeTaskFilter,
  changeVisibilityOldEvengs,
  downloadSchedule,
}) => {

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
      <Menu.Item key='all'>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="null"
          onClick={(event) => {
            event.preventDefault();
            changeTaskFilter('')
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
                changeTaskFilter(el)
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
        <Tooltip placement="top" title={'Table view'}>
          <AppstoreTwoTone
            twoToneColor={settings.workSpace === 'Table' ? '#fd594d' : '#1890ff'}
            style={{ fontSize: '2rem' }}
            className="table-header__icon"
            onClick={() => changeWorkSpace(WORK_SPACE.table)} />
        </Tooltip>
        <Tooltip placement="top" title={'List view'}>
          <ProfileTwoTone
            twoToneColor={settings.workSpace === 'List' ? '#fd594d' : '#1890ff'}
            style={{ fontSize: '2rem' }}
            className="table-header__icon"
            onClick={() => changeWorkSpace(WORK_SPACE.list)} />
        </Tooltip>
        <Tooltip placement="top" title={'Сalendar view'}>
          <CalendarTwoTone
            twoToneColor={settings.workSpace === 'Calendar' ? '#fd594d' : '#1890ff'}
            style={{ fontSize: '2rem' }}
            className="table-header__icon"
            onClick={() => changeWorkSpace(WORK_SPACE.calendar)} />
        </Tooltip>
        <Tooltip placement="top" title={'Download schedule'}>
          <FileWordTwoTone
            twoToneColor='#4caf50'
            style={{ fontSize: '2rem' }}
            className="table-header__icon table-header__icon-file"
            onClick={() => downloadSchedule()} />
        </Tooltip>
        <Tooltip placement="top" title={'Visibility of old events'}>
          <FireTwoTone
            twoToneColor={settings.visibilityOldEvents ? '#aaa' : '#ff9800'}
            style={{ fontSize: '2rem' }}
            className="table-header__icon table-header__icon-fire"
            onClick={() => changeVisibilityOldEvengs(!settings.visibilityOldEvents)} />
        </Tooltip>
      </div>

      <div>
        <Dropdown
          arrow
          overlay={timezones}
          placement="bottomCenter"
          className="header__drop-down">
            <Tooltip placement="top" title={'Change timezone'}>
              <Button>{settings.timeZone}</Button>
            </Tooltip>
        </Dropdown>

        <Dropdown
          arrow
          overlay={eventTypes}
          placement="bottomCenter"
          className="header__drop-down">
            <Tooltip placement="top" title={'Filter by type'}>
              <Button>{settings.taskFilter ? settings.taskFilter : 'all'}</Button>
            </Tooltip>
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
            onClick={() => showEditWindow()}>Add Event</Button>
          : null}
      </div>
    </div>

    </div>
  );
}

export default Header;
