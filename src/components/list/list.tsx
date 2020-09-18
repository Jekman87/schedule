import React from 'react';
// import { VariableSizeList } from 'react-window';
import { List, Avatar, Badge } from 'antd';
import { YoutubeOutlined, LaptopOutlined, TeamOutlined, QuestionOutlined, AudioOutlined, SearchOutlined, UserOutlined, NotificationOutlined } from '@ant-design/icons';
import { grey } from '@ant-design/colors';

import './list.scss';

interface Props {
  appData: any[]
}

const SList: React.FunctionComponent<Props> = ({ appData }) => {
  console.log(appData[0])
  return (
    <div className='list'>
      <List
        itemLayout='horizontal'
        dataSource={appData}
        renderItem={({type, name, dateTime, deadlinedateTime, description}, index) => (
          <Badge.Ribbon text={type} color={grey[4]}>
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
                    {type === 'test' ? (
                      <QuestionOutlined/>
                    ) : type === 'crosscheck' || type === 'review' ? (
                      <SearchOutlined />
                    ) : type === 'broadcast live' ? (
                      <YoutubeOutlined/>
                    ) : type === 'self education' ? (
                      <UserOutlined />
                    ) : type === 'meetup'  ? (
                      <TeamOutlined/>
                    )  : type === 'interview'  ? (
                      <AudioOutlined />
                    )  : type === 'presentation'  ? (
                      <NotificationOutlined />
                    )  
                    : (
                      <LaptopOutlined/>
                    )}
                  </Avatar>
                }
                title={
                  <div className='li-title-wrapper'>
                    <a
                      href='https://github.com/rolling-scopes-school/tasks/blob/master/tasks/code-basics.md'
                      className='li-title'
                      style={{ color: `${grey[7]}` }}>
                      {name}
                    </a>
                    <p className='li-title-time'>
                      <span className='li-title-date'>{new Date(dateTime).toLocaleDateString("ru-RU")}</span>/
                      <span className='li-title-deadline'>{new Date(deadlinedateTime).toLocaleDateString("ru-RU")}</span>
                    </p>
                  </div>
                }
                description={
                  <p className='li-description'>
                    {description}
                    {/* <span className='optional'>
                      {item.place ? (
                        <span>
                          <br />
                          <span
                            style={{
                              display: 'inline-block',
                              fontWeight: 'bolder',
                              marginTop: '1%',
                            }}>
                            Место:
                          </span>{' '}
                          {item.place}
                        </span>
                      ) : (
                        ''
                      )}
                    </span> */}
                  </p>
                }
              />
            </List.Item>
          </Badge.Ribbon>
        )}
      />
    </div>
  );
}

export default SList;
