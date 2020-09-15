import React, { useState, useEffect } from 'react';
import { Table, Popover, Checkbox } from 'antd';
import { EyeInvisibleTwoTone, EyeTwoTone, EditTwoTone, DownSquareTwoTone } from '@ant-design/icons';
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
    type: 'project task',
    timeZone: 'Minsk / Europe 30.08.2020 23:59',
    place: '-',
    comment: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere est esse fugit mollitia aut.',
  },
  {
    key: '2',
    name: 'SongBird2',
    description: 'Songbird - одностраничное приложение, викторина для распознавания птиц по их голосам',
    descriptionUrl: 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/songbird.md',
    type: 'js task',
    timeZone: 'Minsk / Europe 30.08.2020 23:59',
    place: '-',
    comment: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere est esse fugit mollitia aut.',
  },
  {
    key: '3',
    name: 'SongBird3',
    description: 'Songbird - одностраничное приложение, викторина для распознавания птиц по их голосам',
    descriptionUrl: 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/songbird.md',
    type: 'test',
    timeZone: 'Minsk / Europe 30.08.2020 23:59',
    place: '-',
    comment: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere est esse fugit mollitia aut.',
  },
  {
    key: '4',
    name: 'SongBird4',
    description: 'Songbird - одностраничное приложение, викторина для распознавания птиц по их голосам',
    descriptionUrl: 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/songbird.md',
    type: 'meetup',
    timeZone: 'Minsk / Europe 30.08.2020 23:59',
    place: '-',
    comment: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere est esse fugit mollitia aut.',
  },
  {
    key: '5',
    name: 'SongBird5',
    description: 'Songbird - одностраничное приложение, викторина для распознавания птиц по их голосам',
    descriptionUrl: 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/songbird.md',
    type: 'interview',
    timeZone: 'Minsk / Europe 30.08.2020 23:59',
    place: '-',
    comment: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere est esse fugit mollitia aut.',
  },
];

interface Props {
  appData: any[]
}


const TableComponent: React.FunctionComponent<Props> = ({ appData }) => {
  const selectionType = 'checkbox';

  const [dataWithoutHiddenComponents, setNewData] = useState<any[]>([])
  const [activeRows, setActiveRows] = useState<any[]>([])
  const [hideComponents, setHideComponents] = useState<boolean>(false)

  function onChange(checkedValues:any) {
    console.log('checked = ', checkedValues);
  }
  
  const plainOptions = ['Name', 'DescriptionUrl', 'Type', 'TimeZone', 'Description' , 'Comment'];

  const rowSelection = {
    onChange: (selectedRowKeys:any, selectedRows:any) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setActiveRows(selectedRows)
    }
  };

  function getNewData() {
    let currentData:any = []

    if(hideComponents) {
      currentData = dataWithoutHiddenComponents
    } else {
      currentData = [...data]
    }

    activeRows.forEach((el) => {
      currentData = currentData.filter((element:any) => element.name !== el.name)
    })

    setNewData(currentData)
  }

  useEffect(() => {
    console.log(activeRows.length)
    console.log(hideComponents)
  });

  function hideSelectedRows() {
    getNewData();
    setHideComponents(true);
    // setActiveRows([]);
  }

  function showHiddenRows() {
    // setActiveRows(['']);
    setHideComponents(false);
  }


  const content = (
    <div>
    <Checkbox.Group 
      options={plainOptions} 
      defaultValue={['Name', 'DescriptionUrl', 'Type', 'TimeZone', 'Description' , 'Comment']} 
      onChange={onChange} />
    </div>
  );

  return (
    <div>
      <div className="table-header">
        <EyeInvisibleTwoTone 
          twoToneColor="#fd594d" 
          style={{ fontSize: '2rem' }} 
          className={
            activeRows.length 
            ? "table-header__icon table-header__icon-hide"
            : "table-header__icon table-header__icon-hide none-visibility"}
          onClick={() => hideSelectedRows()} />
        <EyeTwoTone 
          twoToneColor="#00a80ed9"
          style={{ fontSize: '2rem' }}
          className={
            hideComponents
            ? "table-header__icon table-header__icon-show"
            : "table-header__icon table-header__icon-show none-visibility"}
          onClick={() => showHiddenRows()} />

        <EditTwoTone 
          twoToneColor="#1890ff"
          style={{ fontSize: '2rem' }}
          className={
            activeRows.length 
            ? "table-header__icon"
            : "table-header__icon table-header__icon-hide none-visibility"}
        />

        <div>
          <Popover content={content} placement="right" trigger="click">
            <DownSquareTwoTone 
              twoToneColor="#1890ff"
              style={{ fontSize: '2rem' }}
              className="table-header__icon"
            />
          </Popover>
        </div>

      </div>

      <Table
        pagination={{ 
          pageSize: 13,
          position: ['bottomCenter']
         }}

        size="middle"
        onRow = {record =>({
          onClick:() => console.warn(record.key)
        })}
        // rowClassName={(record, index) => index % 2 === 0 ? record.type : 'table-row-dark'}
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}

        columns={columns}

        dataSource={hideComponents ? dataWithoutHiddenComponents : data}
      />
    </div>
  );
};

export default TableComponent;
