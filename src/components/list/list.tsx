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

interface Props {
  appData: any[];
  settings: any;
  showInfoWindow: (id:string) => void;
}

const SList: React.FunctionComponent<Props> = ({ appData, settings, showInfoWindow }) => {
  console.log(appData[0])
  return (
    <div className='list'>
      <List
        itemLayout='horizontal'
        dataSource={appData}
        renderItem={({ event }, index) => (
          <Badge.Ribbon text={event.type} color={grey[4]}>
            <List.Item>
              <List.Item.Meta
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
        )}
      />
    </div>
  );
};

export default SList;
