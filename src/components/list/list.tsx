import React from 'react';
import { List, Avatar, Badge } from 'antd';
import {
  YoutubeOutlined,
  LaptopOutlined,
  TeamOutlined,
  QuestionOutlined,
  AudioOutlined,
  SearchOutlined,
  UserOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import { grey } from '@ant-design/colors';
import { convertDateTime } from '../../helpers/utils';

import './list.scss';
import { addColorToRow } from '../../helpers/utils';

function addDeadlineColor(isDeadline: boolean) {
  return isDeadline ? ' type__deadline' : '';
}
interface Props {
  appData: any[];
  settings: any;
  showInfoWindow: (id:string) => void;
}

const SList: React.FunctionComponent<Props> = ({ appData, settings, showInfoWindow }) => {
  return (
    <div className='list'>
      <List
        itemLayout='horizontal'
        dataSource={appData}
        renderItem={({ event, isDeadline }) => (
          <div onClick={() => {showInfoWindow(event.id)}}>
            <Badge.Ribbon text={event.type} color={grey[4]}>
            <List.Item >
              <List.Item.Meta
                className={`${addColorToRow(event.type)} ${addDeadlineColor(isDeadline)}`}
                avatar={
                  <Avatar
                    size='large'
                    shape='square'
                    style={{
                      color: 'black',
                      backgroundColor: 'transparent',
                      fontWeight: 'bold',
                    }}>
                    {event.type === 'test' ? (
                      <QuestionOutlined />
                    ) : event.type === 'crosscheck' || event.type === 'review' ? (
                      <SearchOutlined />
                    ) : event.type === 'broadcast live' ? (
                      <YoutubeOutlined />
                    ) : event.type === 'self education' ? (
                      <UserOutlined />
                    ) : event.type === 'meetup' ? (
                      <TeamOutlined />
                    ) : event.type === 'interview' ? (
                      <AudioOutlined />
                    ) : event.type === 'presentation' ? (
                      <NotificationOutlined />
                    ) : (
                      <LaptopOutlined />
                    )}
                  </Avatar>
                }
                title={
                  <div className='li-title-wrapper'>
                    <a
                      href={event.descriptionUrl}
                      className='li-title'
                      target="_blank"
                      rel='noopener noreferrer'
                      style={{ color: `${grey[7]}` }}>
                      {event.name}
                    </a>
                    <p className='li-title-time'>
                      <span className='li-title-date'>
                        {convertDateTime(event.dateTime, false, settings.timeZone)}
                      </span>
                      /
                      <span className='li-title-deadline'>
                        {convertDateTime(event.deadlinedateTime, false, settings.timeZone)}
                      </span>
                    </p>
                  </div>
                }
                description={<p className='li-description'>{event.description}</p>}
              />
            </List.Item>
          </Badge.Ribbon>
        </div>
        )}
      />
    </div>
  );
};

export default SList;
