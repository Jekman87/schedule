import React, { useState, useEffect } from 'react';

import { Table, Popover, Checkbox } from 'antd';
import { EyeInvisibleTwoTone, EyeTwoTone, EditTwoTone, DownSquareTwoTone, DeleteTwoTone } from '@ant-design/icons';

import { column_options, convertDateToTime } from './options'
import { SettingsType } from '../../constants/interfaces';
import { addEventColors } from '../../helpers/utils';

import './table.scss';

interface Props {
  appData: any,
  settings: SettingsType,
  showInfoWindow: (id:string) => void,
  showEditWindow: (id:string) => void,
  deleteEvent: (id:string) => void,
}

const TableComponent: React.FunctionComponent<Props> = ({
  appData, settings,
  showInfoWindow, showEditWindow, deleteEvent }) => {

  const selectionType = 'checkbox';

  const [plainOptions, setPlainOptions] = useState<any[]>(['Date', 'Type', 'Name', 'Description', 'Organizer', 'Comment'])
  const [dataWithoutHiddenComponents, setNewData] = useState<any[]>([])
  const [dataWithoutHiddenColumns, setNewColumnsData] = useState<any[]>([])
  const [activeRows, setActiveRows] = useState<any[]>([])
  const [hideRows, setHideRows] = useState<boolean>(false)

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
      render: (text:any, row:any) => <a href={ row.descriptionUrl
        ? row.descriptionUrl
        : row.eventURL }
        rel="noopener noreferrer"
        target="_blank">{text}</a>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      className: 'table__description',
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
      className: 'table__description',
    }
  ];

  function initStartColumnData() {
    const dataFromPreviousSessions = localStorage.getItem('columns')
    if (dataFromPreviousSessions !== null) {
      const parsePreviousSessionsData = JSON.parse(dataFromPreviousSessions)
      setPlainOptions(parsePreviousSessionsData);
      return parsePreviousSessionsData
    } else return plainOptions
  }

  function getNewColumnData(activeColumn:any = initStartColumnData()) {
    let currentData:any = [...columns]
    const newData:any = []

    activeColumn.forEach((el:string) => {
      let filterColumn = currentData.filter((element:any) => element.title === el)[0]
      newData.push(filterColumn)
    })

    setNewColumnsData(newData)
  }

  function onChange(checkedValues:any) {
    localStorage.setItem('columns', JSON.stringify(checkedValues))
    getNewColumnData(checkedValues)
  }

  const content = (
    <div>
    <Checkbox.Group
      options={column_options}
      defaultValue={plainOptions}
      onChange={onChange} />
    </div>
  );

  const rowSelection = {
    onChange: (selectedRowKeys:any, selectedRows:any) => {
      setActiveRows(selectedRowKeys)
    }
  };

  function getNewRowData() {
    let currentData:any = convertationDataFromApi()

    let valuesForSorting = [];

    const dataFromPreviousSessions = localStorage.getItem('rows')
    if (dataFromPreviousSessions !== null && dataFromPreviousSessions !== '[]') {
      valuesForSorting = JSON.parse(dataFromPreviousSessions)
    } else valuesForSorting = activeRows

    valuesForSorting.forEach((el:any) => {
      currentData = currentData.filter((element:any) => element.key !== el)
    })

    setNewData(currentData)
  }

  function saveRows(arrayWithCheckedValues:any) {
    let curentDataArray = []

    const dataFromPreviousSessions = localStorage.getItem('rows')
    if (dataFromPreviousSessions !== null) {
      curentDataArray = JSON.parse(dataFromPreviousSessions)
    }

    const concatAllRows = [...curentDataArray, ...arrayWithCheckedValues]
    const uniqueArrayWithRows = Array.from(new Set(concatAllRows))

    localStorage.setItem('rows', JSON.stringify(uniqueArrayWithRows))
  }

  function hideSelectedRows() {
    saveRows(activeRows)
    getNewRowData();
    setHideRows(true);
  }

  function showHiddenRows() {
    localStorage.removeItem('rows')
    setHideRows(false);
  }

  function initVision() {
    const dataFromPreviousSessions = localStorage.getItem('rows')
    if (dataFromPreviousSessions !== null && dataFromPreviousSessions !== '[]') {
      setHideRows(true);
    }
  }

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
  useEffect(getNewRowData, [])
  useEffect(initVision, [])
  useEffect(getNewColumnData, [settings.timeZone])
  useEffect(getNewRowData, [appData])

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

        {settings.role === 'Mentor'
          ? <EditTwoTone
              onClick={() => showEditWindow(activeRows[0])}
              twoToneColor="#1890ff"
              style={{ fontSize: '2rem' }}
              className={
              activeRows.length !== 0 && activeRows.length < 2
                ? "table-header__icon"
                : "table-header__icon table-header__icon-hide none-visibility"} />
          : null
        }

        {settings.role === 'Mentor'
          ? <DeleteTwoTone
            onClick={() => deleteEvent(activeRows[0])}
            twoToneColor="#fd594d"
            style={{ fontSize: '2rem' }}
            className={
            activeRows.length !== 0 && activeRows.length < 2
              ? "table-header__icon"
              : "table-header__icon table-header__icon-hide none-visibility"} />
          : null
        }

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
            if((event.target as HTMLElement).tagName !== "A") {
              showInfoWindow(record.id)
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
