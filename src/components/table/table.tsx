import React, { useState, useEffect } from 'react';

import { Table, Popover, Checkbox } from 'antd';
import { EyeInvisibleTwoTone, EyeTwoTone, EditTwoTone, DownSquareTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { Breakpoint } from 'antd/lib/_util/responsiveObserve';

import { SettingsType } from '../../constants/interfaces';
import { addColorToRow } from '../../helpers/utils';

import './table.scss';


function setDate(date:any) {
  const currentDate = new Date(date);

  const year = currentDate.getFullYear();

  let day:any = currentDate.getDate();
  let month:any = currentDate.getMonth();

  if (day < 10) {
    day = '0' + day
  }

  if (month < 10) {
    month = '0' + month
  }
  
  return `${day}-${month}-${year}`
}

function setTime(date:any) {
  const currentDate = new Date(date);
  
  let hours:any = currentDate.getHours();
  let minutes:any = currentDate.getMinutes();
  let seconds:any = currentDate.getSeconds();
  
  return `${hours}:${minutes}:${seconds}`
}

const columns = [
  { 
    title: 'Date', 
    dataIndex: 'dateTime', 
    key: 'dateTime',
    align: 'center',
    width: 90,
    render: (time:any, row:any) => {
      if (row.isDeadline) {
        return (
          <>
            <p>{setTime(row.deadlinedateTime)}</p>
            <p>{setDate(row.deadlinedateTime)}</p>
          </>
        )
      } else return setDate(time)
    },
  },
  { 
    title: 'Type', 
    dataIndex: 'type', 
    key: 'type',
    align: 'center',
    width: 80,
    responsive: ['sm'] as Breakpoint[],
  },
  { 
    title: 'Name', 
    dataIndex: 'name', 
    key: 'name',
    width: 200,
    render: (text:any, row:any) => <a href={row.descriptionUrl 
      ? row.descriptionUrl 
      : row.eventURL} 
      rel="noopener noreferrer" 
      target="_blank">{text}</a>,
  },
  { 
    title: 'Description', 
    dataIndex: 'description', 
    key: 'description',
    responsive: ['md'] as Breakpoint[]
  },
  { 
    title: 'Deadline information', 
    dataIndex: 'deadlineDescription', 
    key: 'deadlineDescription',
    responsive: ['md'] as Breakpoint[]
  },
  { 
    title: 'Organizer', 
    dataIndex: 'organizer', 
    key: 'organizer',
    align: 'center',
    width: 200,
    render: (text:any) => {
      return text.map((el:any) => <p key={el}>{el}</p>)
    },
    responsive: ['lg'] as Breakpoint[]
  },
  { 
    title: 'Comment', 
    dataIndex: 'comment', 
    key: 'comment',
    align: 'center',
    responsive: ['xl'] as Breakpoint[]
  }
];

interface Props {
  appData: any,
  settings: SettingsType,
  showViewEventModal: (id:string) => void,
  showEditEventModal: (id:string) => void,
  deleteEvent: (id:string) => void,
}


const TableComponent: React.FunctionComponent<Props> = ({ 
  appData, settings, 
  showViewEventModal, showEditEventModal, deleteEvent }) => {
  const selectionType = 'checkbox';
  const plainOptions = ['Date', 'Type', 'Name', 'Description', 'Deadline information', 'Organizer', 'Comment'];
  const options = [
    {label: 'Date', value: 'Date', disabled: true},
    {label: 'Type', value: 'Type'},
    {label: 'Name', value: 'Name', disabled: true},
    {label: 'Description', value: 'Description'},
    {label: 'Deadline information', value: 'Deadline information'},
    {label: 'Organizer', value: 'Organizer'},
    {label: 'Comment', value: 'Comment'},
  ];

  const [dataWithoutHiddenComponents, setNewData] = useState<any[]>([])
  const [dataWithoutHiddenColumns, setNewColumnsData] = useState<any[]>([])
  const [activeRows, setActiveRows] = useState<any[]>([])
  const [hideRows, setHideRows] = useState<boolean>(false)
  const [hideColumns, setHideColumns] = useState<boolean>(false)

  function getNewColumnData(activeColumn:any) {
    let currentData:any = [...columns]
    const newData:any = []

    activeColumn.forEach((el:string) => {
      let filterColumn = currentData.filter((element:any) => element.title === el)[0]
      newData.push(filterColumn)
    })

    setNewColumnsData(newData)
  }

  function changeHideColumnStatus(arrayWithActiveColumns:any) {
    if (arrayWithActiveColumns.length < plainOptions.length) {
      getNewColumnData(arrayWithActiveColumns);
      setHideColumns(true)
    } else setHideColumns(false)
  }

  function onChange(checkedValues:any) {
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
      currentData = [...appData.map((el:any) => {
        return {
          'isDeadline': el.isDeadline,
          ...el.event
      }})]
    }

    activeRows.forEach((el) => {
      currentData = currentData.filter((element:any) => element.name !== el.name)
    })

    setNewData(currentData)
  }

/*   useEffect(() => {


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
      options={options} 
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
          onClick={() => showEditEventModal(activeRows[0].id)}
          twoToneColor="#1890ff"
          style={{ fontSize: '2rem' }}
          className={
            activeRows.length !== 0 && activeRows.length < 2
            ? "table-header__icon"
            : "table-header__icon table-header__icon-hide none-visibility"}
        />

        <DeleteTwoTone 
          onClick={() => deleteEvent(activeRows[0].id)}
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
        className={'table-block'}
        size="middle"
        rowKey={(record) => record.id + record.isDeadline}
        pagination={{ 
          pageSize: 50,
          position: ['bottomCenter']
         }}

        onRow = {record =>({
          onClick:(event) => {
            console.warn(record)
            if((event.target as HTMLElement).tagName !== "A") {
              showViewEventModal(record.id)
            }
          } 
        })}
        
        rowClassName={(record) => addColorToRow(record.type)}
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}

        columns={hideColumns ? dataWithoutHiddenColumns : columns}

        dataSource={hideRows 
          ? dataWithoutHiddenComponents 
          : appData.map((el:any) => {
            return {
              'isDeadline': el.isDeadline,
              ...el.event
          }})
        }
      />
    </div>
  );
};

export default TableComponent;
