import React, { useState, useEffect } from 'react';

import { saveAs } from 'file-saver';

import { Table, Popover, Checkbox } from 'antd';
import { EyeInvisibleTwoTone, EyeTwoTone, EditTwoTone, DownSquareTwoTone, DeleteTwoTone } from '@ant-design/icons';

import { SettingsType } from '../../constants/interfaces';
import { addEventColors } from '../../helpers/utils';

import moment from 'moment';
import 'moment-timezone';

import './table.scss';

interface Props {
  appData: any,
  settings: SettingsType,
  showViewEventModal: (id:string) => void,
  showEditEventModal: (id:string) => void,
  deleteEvent: (id:string) => void,
}


function convertDateToTime(timestamp: number, toTime?: boolean, timezone?: string): string {
  let time = moment(timestamp);

  if (timezone) {
    time.tz(timezone);
  }

  if (toTime) {
    return time.format('HH:mm:ss');
  }

  return time.format('DD-MM-YYYY');
}

const TableComponent: React.FunctionComponent<Props> = ({ 
  appData, settings, 
  showViewEventModal, showEditEventModal, deleteEvent }) => {
  const plainOptions = ['Date', 'Type', 'Name', 'Description', 'Organizer', 'Comment'];

  let string13 = ''

  convertationDataFromApi().forEach((el:any, index:any) => {
    string13 += index + ' | ';
    string13 += convertDateToTime(el.dateTime, false, settings.timeZone) + ' | ';
    string13 += el.name + ' | ';
    string13 += el.type + ' | ';
    string13 += el.description + ' | ';
    string13 += el.deadlineDescription  + '\n';
  })

  var FileSaver = require('file-saver');
  var file = new File([string13], "hello world.txt", {type: "text/plain;charset=utf-8"});


  const selectionType = 'checkbox';




  const options = [
    {label: 'Course', value: 'Course'},
    {label: 'Stage', value: 'Stage'},
    {label: 'Date', value: 'Date', disabled: true},
    {label: 'Type', value: 'Type', disabled: true},
    {label: 'Form', value: 'Form'},
    {label: 'Name', value: 'Name', disabled: true},
    {label: 'Description', value: 'Description', disabled: true},
    {label: 'Duration', value: 'Duration'},
    {label: 'Organizer', value: 'Organizer'},
    {label: 'Place', value: 'Place'},
    {label: 'Comment', value: 'Comment'},
  ];

  const columns = [
    { 
      title: 'Course', 
      dataIndex: 'course', 
      key: 'course',
      align: 'center',
      width: 70,
    },
    { 
      title: 'Stage', 
      dataIndex: 'stage', 
      key: 'stage',
      align: 'center',
      width: 70,
    },
    { 
      title: 'Date', 
      dataIndex: 'dateTime', 
      key: 'dateTime',
      align: 'center',
      width: 100,
      render: (time:any, row:any) => {
        if (row.isDeadline) {
          return (
            <>
              <p>{convertDateToTime(row.deadlinedateTime, true, settings.timeZone)}</p>
              <p>{convertDateToTime(row.deadlinedateTime, false, settings.timeZone)}</p>
            </>
          )
        } else return convertDateToTime(row.dateTime, false, settings.timeZone)
      },
    },
    { 
      title: 'Type', 
      dataIndex: 'type', 
      key: 'type',
      align: 'center',
      width: 100,
    },
    { 
      title: 'Form', 
      dataIndex: 'form', 
      key: 'form',
      align: 'center',
      width: 100,
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
      width: 300,
      render: (text:any, row:any) => {
        if(row.isDeadline) {
          return row.deadlineDescription
        } else return text
      },
    },
    { 
      title: 'Duration', 
      dataIndex: 'duration', 
      key: 'duration',
      align: 'center',
      width: 100,
    },
    { 
      title: 'Organizer', 
      dataIndex: 'organizer', 
      key: 'organizer',
      align: 'center',
      width: 150,
      render: (text:any) => {
        return text.map((el:any) => <p key={el}>{el}</p>)
      },
    },
    { 
      title: 'Place', 
      dataIndex: 'place', 
      key: 'place',
      align: 'center',
      width: 150,
    },
    { 
      title: 'Comment', 
      dataIndex: 'comment', 
      key: 'comment',
      width: 200,
    }
  ];

  const [dataWithoutHiddenComponents, setNewData] = useState<any[]>([])
  const [dataWithoutHiddenColumns, setNewColumnsData] = useState<any[]>([])
  const [activeRows, setActiveRows] = useState<any[]>([])
  const [hideRows, setHideRows] = useState<boolean>(false)

  function getNewColumnData(activeColumn:any = plainOptions) {
    let currentData:any = [...columns]
    const newData:any = []

    activeColumn.forEach((el:string) => {
      let filterColumn = currentData.filter((element:any) => element.title === el)[0]
      newData.push(filterColumn)
    })

    setNewColumnsData(newData)
  }

  function onChange(checkedValues:any) {
    getNewColumnData(checkedValues)
  }

  const rowSelection = {
    onChange: (selectedRowKeys:any, selectedRows:any) => {
      setActiveRows(selectedRowKeys)
      // console.log(selectedRowKeys)
    }
  };

  function getNewRowData() {
    let currentData:any = []

    if(hideRows) {
      currentData = dataWithoutHiddenComponents
    } else {
      currentData = convertationDataFromApi()
    }


    activeRows.forEach((el) => {
      currentData = currentData.filter((element:any) => element.key !== el)
    })
    // console.log(currentData)
    setNewData(currentData)
  }

  function hideSelectedRows() {
    getNewRowData();
    setHideRows(true);
  }

  function showHiddenRows() {
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

  function convertationDataFromApi() {
    const tableData = appData.map((el:any) => {
      return {
        'isDeadline': el.isDeadline,
        'key': el.event.id + el.isDeadline,
        ...el.event
    }})
    return tableData;
  }

  useEffect(getNewColumnData, [])

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
            : "table-header__icon table-header__icon-hide none-visibility"} />

        <DeleteTwoTone 
          onClick={() => deleteEvent(activeRows[0].id)}
          twoToneColor="#fd594d"
          style={{ fontSize: '2rem' }}
          className={
            activeRows.length !== 0 && activeRows.length < 2
            ? "table-header__icon"
            : "table-header__icon table-header__icon-hide none-visibility"} />

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
        scroll={{ x: 'max-content', y: 'calc(100vh - 300px)' }}
        rowClassName={(record) => addEventColors(record)}
        rowKey={(record) => record.id + record.isDeadline}

        pagination={{ 
          pageSize: 100,
          position: ['bottomCenter']
         }}
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}

        onRow = {record =>({
          onClick:(event) => {
            // FileSaver.saveAs(file);
            if((event.target as HTMLElement).tagName !== "A") {
              showViewEventModal(record.id)
            }
          } 
        })}
        
        columns={dataWithoutHiddenColumns}

        dataSource={hideRows 
          ? dataWithoutHiddenComponents 
          : convertationDataFromApi()
        }
      />
    </div>
  );
};

export default TableComponent;
