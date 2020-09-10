import React from 'react';
// import { VariableSizeList } from 'react-window';
import { List, Avatar, Badge } from 'antd';
import { YoutubeOutlined, LaptopOutlined, TeamOutlined, QuestionOutlined } from '@ant-design/icons';
import { grey } from '@ant-design/colors';

import './list.scss';

const data = [
  {
    title: 'Self HTML Basics',
    date: '09.09.2020',
    time: '22:10',
    deadline: '20.09.2020',
    type: 'Task',
    description:
      'Это первое задание курса RS School JavaScript Front-end. Вам необходимо пройти интерактивные курсы. Выполните все задания каждого курса. Старайтесь выполнять задания самостоятельно, не пользуясь готовыми решениями.',
  },
  {
    title: 'Flexbox and Grid',
    date: '09.09.2020',
    type: 'Lecture',
    deadline: '20.09.2020',
    time: '22:10',
    description:
      'Это первое задание курса RS School JavaScript Front-end. Вам необходимо пройти интерактивные курсы',
  },
  {
    title: 'Photoshop & Figma For Developers',
    date: '09.09.2020',
    type: 'Event',
    time: '22:10',
    deadline: '20.09.2020',
    description:
      'Это первое задание курса RS School JavaScript Front-end. Вам необходимо пройти интерактивные курсы',
    place: 'Имагуру, ул. Фабрициуса',
  },
  {
    title: 'JS Advanced',
    date: '09.09.2020',
    time: '22:10',
    deadline: '20.09.2020',
    type: 'Test',
    description:
      'Это первое задание курса RS School JavaScript Front-end. Вам необходимо пройти интерактивные курсы',
  },
];

<<<<<<< HEAD
const List: React.FunctionComponent = () => {
=======
// Сделать виртуализацию!

function SList() {
>>>>>>> origin/List-component
  return (
    <div className='list'>
      <List
        itemLayout='horizontal'
        dataSource={data}
        renderItem={(item) => (
          <Badge.Ribbon text={item.type} color={grey[4]}>
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
                    {item.type === 'Lecture' ? (
                      <YoutubeOutlined />
                    ) : item.type === 'Task' ? (
                      <LaptopOutlined />
                    ) : item.type === 'Test' ? (
                      <QuestionOutlined />
                    ) : (
                      <TeamOutlined />
                    )}
                  </Avatar>
                }
                title={
                  <div className='li-title-wrapper'>
                    <a
                      href='https://github.com/rolling-scopes-school/tasks/blob/master/tasks/code-basics.md'
                      className='li-title'
                      style={{ color: `${grey[7]}` }}>
                      {item.title}
                    </a>
                    <p className='li-title-time'>
                      <span className='li-title-date'>{item.date}</span>/
                      <span className='li-title-deadline'>{item.deadline}</span>
                    </p>
                  </div>
                }
                description={
                  <p className='li-description'>
                    {item.description}
                    <span className='optional'>
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
                    </span>
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
