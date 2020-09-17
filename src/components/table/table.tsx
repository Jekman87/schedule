import React, { useState, useEffect } from 'react';
import { Table, Popover, Checkbox } from 'antd';
import { EyeInvisibleTwoTone, EyeTwoTone, EditTwoTone, DownSquareTwoTone, DeleteTwoTone } from '@ant-design/icons';
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
    title: 'Type', 
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
    type: 'crosscheck',
    timeZone: 'Minsk / Europe 30.08.2020 23:59',
    place: '-',
    comment: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere est esse fugit mollitia aut.',
  },
  {
    key: '5',
    name: 'SongBird5',
    description: 'Songbird - одностраничное приложение, викторина для распознавания птиц по их голосам',
    descriptionUrl: 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/songbird.md',
    type: 'review',
    timeZone: 'Minsk / Europe 30.08.2020 23:59',
    place: '-',
    comment: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere est esse fugit mollitia aut.',
  },
  {
    key: '51',
    name: 'SongBird51',
    description: 'Songbird - одностраничное приложение, викторина для распознавания птиц по их голосам',
    descriptionUrl: 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/songbird.md',
    type: 'broadcast live',
    timeZone: 'Minsk / Europe 30.08.2020 23:59',
    place: '-',
    comment: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere est esse fugit mollitia aut.',
  },
  {
    key: '9',
    name: 'SongBird41',
    description: 'Songbird - одностраничное приложение, викторина для распознавания птиц по их голосам',
    descriptionUrl: 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/songbird.md',
    type: 'self education',
    timeZone: 'Minsk / Europe 30.08.2020 23:59',
    place: '-',
    comment: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere est esse fugit mollitia aut.',
  },
  {
    key: '7',
    name: 'SongBird21',
    description: 'Songbird - одностраничное приложение, викторина для распознавания птиц по их голосам',
    descriptionUrl: 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/songbird.md',
    type: 'meetup',
    timeZone: 'Minsk / Europe 30.08.2020 23:59',
    place: '-',
    comment: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere est esse fugit mollitia aut.',
  },
  {
    key: '8',
    name: 'SongBird31',
    description: 'Songbird - одностраничное приложение, викторина для распознавания птиц по их голосам',
    descriptionUrl: 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/songbird.md',
    type: 'interview',
    timeZone: 'Minsk / Europe 30.08.2020 23:59',
    place: '-',
    comment: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere est esse fugit mollitia aut.',
  },
  {
    key: '6',
    name: 'SongBird11',
    description: 'Songbird - одностраничное приложение, викторина для распознавания птиц по их голосам',
    descriptionUrl: 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/songbird.md',
    type: 'presentation',
    timeZone: 'Minsk / Europe 30.08.2020 23:59',
    place: '-',
    comment: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere est esse fugit mollitia aut.',
  },
  {
    key: '14',
    name: 'SongBird11',
    description: 'Songbird - одностраничное приложение, викторина для распознавания птиц по их голосам',
    descriptionUrl: 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/songbird.md',
    type: 'other',
    timeZone: 'Minsk / Europe 30.08.2020 23:59',
    place: '-',
    comment: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere est esse fugit mollitia aut.',
  }
];

interface Props {
  appData: any[],
  addColorToRow: (eventType:string) => string
}


const TableComponent: React.FunctionComponent<Props> = ({ appData, addColorToRow }) => {
  const selectionType = 'checkbox';
  const plainOptions = ['Name', 'DescriptionUrl', 'Type', 'TimeZone', 'Place', 'Description', 'Comment'];

  const [dataWithoutHiddenComponents, setNewData] = useState<any[]>([])
  const [dataWithoutHiddenColumns, setNewColumnsData] = useState<any[]>([])
  const [activeRows, setActiveRows] = useState<any[]>([])
  const [activeColumns, setActiveColumns] = useState<any[]>([])
  const [hideRows, setHideRows] = useState<boolean>(false)
  const [hideColumns, setHideColumns] = useState<boolean>(false)

  function changeHideColumnStatus(activeColumns:any) {
    if (activeColumns.length < plainOptions.length) {
      getNewColumnData(activeColumns);
      setHideColumns(true)
    } else setHideColumns(false)
  }

  function onChange(checkedValues:any) {
    setActiveColumns(checkedValues)
    changeHideColumnStatus(checkedValues)
    console.log('checked = ', checkedValues);
  }

  const rowSelection = {
    onChange: (selectedRowKeys:any, selectedRows:any) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setActiveRows(selectedRows)
    }
  };

  function getNewRowData() {
    let currentData:any = []

    if(hideRows) {
      currentData = dataWithoutHiddenComponents
    } else {
      currentData = [...data]
    }

    activeRows.forEach((el) => {
      currentData = currentData.filter((element:any) => element.name !== el.name)
    })

    setNewData(currentData)
  }

  function getNewColumnData(activeColumn:any) {
    let currentData:any = [...columns]

    activeColumn.forEach((el:string) => {
      console.log(currentData)
      currentData = [...currentData, currentData.filter((element:any) => element.title !== el)]
    })
    console.warn(currentData)
    setNewColumnsData(currentData)
  }

/*   useEffect(() => {
    console.warn(columns)
    console.warn(data)
    console.warn(columns)
  }); */



  function hideSelectedRows() {
    getNewRowData();
    setHideRows(true);
    // setActiveRows([]);
  }

  function showHiddenRows() {
    // setActiveRows(['']);
    setHideRows(false);
  }

  const content = (
    <div>
    <Checkbox.Group 
      options={plainOptions} 
      defaultValue={plainOptions} 
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
            hideRows
            ? "table-header__icon table-header__icon-show"
            : "table-header__icon table-header__icon-show none-visibility"}
          onClick={() => showHiddenRows()} />

        <EditTwoTone 
          twoToneColor="#1890ff"
          style={{ fontSize: '2rem' }}
          className={
            activeRows.length !== 0 && activeRows.length < 2
            ? "table-header__icon"
            : "table-header__icon table-header__icon-hide none-visibility"}
        />

        <DeleteTwoTone 
          twoToneColor="#fd594d"
          style={{ fontSize: '2rem' }}
          className={
            activeRows.length !== 0 && activeRows.length < 2
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
        rowClassName={(record) => addColorToRow(record.type)}
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}

        columns={hideColumns ? dataWithoutHiddenColumns : columns}

        dataSource={hideRows ? dataWithoutHiddenComponents : data}
      />
    </div>
  );
};

export default TableComponent;
