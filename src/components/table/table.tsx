import React from 'react';
import { Table } from 'antd';
import { Breakpoint } from 'antd/lib/_util/responsiveObserve';

import './table.scss';



const columns = [
  { 
    title: 'Name', 
    dataIndex: 'name', 
    key: 'name',
    align: 'center' as 'right'
  },
  {
    title: 'DescriptionUrl',
    dataIndex: 'descriptionUrl',
    key: 'descriptionUrl',
    align: 'center' as 'right',
    render: (text:any) => <a href={text} rel="noopener noreferrer" target="_blank">GitHub</a>,
  },
  { 
    itle: 'Type', 
    dataIndex: 'type', 
    key: 'type',
    align: 'center' as 'right',
    responsive: ['lg'] as Breakpoint[]
  },
  { 
    title: 'TimeZone', 
    dataIndex: 'timeZone', 
    key: 'timeZone',
    align: 'center' as 'right',
    responsive: ['lg'] as Breakpoint[]
  },
  { 
    title: 'Place', 
    dataIndex: 'place', 
    key: 'place',
    align: 'center' as 'right',
    responsive: ['lg'] as Breakpoint[]
  },
  { 
    title: 'Description', 
    dataIndex: 'description', 
    key: 'description',
  },
  { 
    title: 'Comment', 
    dataIndex: 'comment', 
    key: 'comment',
    responsive: ['lg'] as Breakpoint[]
  }
];

const data = [
  {
    key: '1',
    name: 'SongBird1',
    description: 'Songbird - одностраничное приложение, викторина для распознавания птиц по их голосам',
    descriptionUrl: 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/songbird.md',
    type: 'Task',
    timeZone: 'Minsk / Europe 30.08.2020 23:59',
    place: '-',
    comment: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere est esse fugit mollitia aut.',
  },
  {
    key: '2',
    name: 'SongBird2',
    description: 'Songbird - одностраничное приложение, викторина для распознавания птиц по их голосам',
    descriptionUrl: 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/songbird.md',
    type: 'Task',
    timeZone: 'Minsk / Europe 30.08.2020 23:59',
    place: '-',
    comment: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere est esse fugit mollitia aut.',
  },
  {
    key: '3',
    name: 'SongBird3',
    description: 'Songbird - одностраничное приложение, викторина для распознавания птиц по их голосам',
    descriptionUrl: 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/songbird.md',
    type: 'Task',
    timeZone: 'Minsk / Europe 30.08.2020 23:59',
    place: '-',
    comment: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere est esse fugit mollitia aut.',
  },
  {
    key: '4',
    name: 'SongBird4',
    description: 'Songbird - одностраничное приложение, викторина для распознавания птиц по их голосам',
    descriptionUrl: 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/songbird.md',
    type: 'Task',
    timeZone: 'Minsk / Europe 30.08.2020 23:59',
    place: '-',
    comment: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere est esse fugit mollitia aut.',
  },
  {
    key: '5',
    name: 'SongBird5',
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

const rowSelection = {
  onChange: (selectedRowKeys:any, selectedRows:any) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record:any) => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};
  
const TableComponent: React.FunctionComponent<Props> = ({ appData }) => {
  const selectionType = 'checkbox';

  return (
    <div>
      <Table
        pagination={{ 
          pageSize: 3,
          position: ['bottomCenter']
         }}
        size="middle"
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}

        columns={columns}

        dataSource={data}
      />
    </div>
  );
};

export default TableComponent;
