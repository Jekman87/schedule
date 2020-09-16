import React from 'react';

import { Table } from 'antd';

import './table.scss';

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  {
    title: 'DescriptionUrl',
    dataIndex: 'descriptionUrl',
    key: 'descriptionUrl',
    render: (text:any) => <a href={text} rel="noopener noreferrer" target="_blank">GitHub</a>
  },
  { title: 'Type', dataIndex: 'type', key: 'type' },
  { title: 'TimeZone', dataIndex: 'timeZone', key: 'timeZone' },
  { title: 'Place', dataIndex: 'place', key: 'place' },
  { title: 'Comment', dataIndex: 'comment', key: 'comment' },
];

const data = [
  {
    key: 1,
    name: 'SongBird',
    description: 'Songbird - одностраничное приложение, викторина для распознавания птиц по их голосам',
    descriptionUrl: 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/songbird.md',
    type: 'Task',
    timeZone: 'Minsk / Europe 30.08.2020 23:59',
    place: '-',
    comment: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere est esse fugit mollitia aut.',
  },
  {
    key: 2,
    name: 'SongBird',
    description: 'Songbird - одностраничное приложение, викторина для распознавания птиц по их голосам',
    descriptionUrl: 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/songbird.md',
    type: 'Task',
    timeZone: 'Minsk / Europe 30.08.2020 23:59',
    place: '-',
    comment: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere est esse fugit mollitia aut.',
  },
  {
    key: 3,
    name: 'SongBird',
    description: 'Songbird - одностраничное приложение, викторина для распознавания птиц по их голосам',
    descriptionUrl: 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/songbird.md',
    type: 'Task',
    timeZone: 'Minsk / Europe 30.08.2020 23:59',
    place: '-',
    comment: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere est esse fugit mollitia aut.',
  },
  {
    key: 4,
    name: 'SongBird',
    description: 'Songbird - одностраничное приложение, викторина для распознавания птиц по их голосам',
    descriptionUrl: 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/songbird.md',
    type: 'Task',
    timeZone: 'Minsk / Europe 30.08.2020 23:59',
    place: '-',
    comment: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere est esse fugit mollitia aut.',
  },
  {
    key: 5,
    name: 'SongBird',
    description: 'Songbird - одностраничное приложение, викторина для распознавания птиц по их голосам',
    descriptionUrl: 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/songbird.md',
    type: 'Task',
    timeZone: 'Minsk / Europe 30.08.2020 23:59',
    place: '-',
    comment: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere est esse fugit mollitia aut.',
  },
];

interface Props {
  appData: any[]
}

const TableComponent: React.FunctionComponent<Props> = ({ appData }) => {
  return (
    <Table

    columns={columns}

    expandable={{
      expandedRowRender: record => {
        return (
          <>
            <h1 style={{ margin: 0 }}>{record.description}</h1>
            <img src="https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/songbird/screenshot_birds-quiz.png" alt="13"></img>
          </>
        )
      } ,
      rowExpandable: record => record.name !== 'Not Expandable',
    }}

    dataSource={data}
  />
  );
}

export default TableComponent;
