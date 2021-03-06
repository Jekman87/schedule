import { notification } from 'antd';
import moment from 'moment';
import 'moment-timezone';

import { EventType, AppEventType } from '../constants/interfaces';
import { NotificationType } from '../constants/enums';

function storage(key: string, data?: object) {
  if (arguments.length === 1) {
    const storedData = localStorage.getItem(key);
    if (storedData !== null) {
      return JSON.parse(storedData);
    }
    return false;
  }
  if (data === null) {
    localStorage.removeItem(key);
    return true;
  }
  localStorage.setItem(key, JSON.stringify(data));
  return true;
}

function createAppData(data: EventType[]): AppEventType[] {
  if (!data.length) {
    return [];
  }

  const appData: AppEventType[] = [];

  data.forEach((eventObj) => {
    appData.push({
      event: eventObj,
      isDeadline: false,
    });

    if (eventObj.deadlinedateTime > 0) {
      appData.push({
        event: eventObj,
        isDeadline: true,
      });
    }
  });

  function getStartOrDeadlineTime(eventObj: AppEventType) {
    return eventObj.isDeadline ? eventObj.event.deadlinedateTime : eventObj.event.dateTime;
  }

  appData.sort((a, b) => getStartOrDeadlineTime(a) - getStartOrDeadlineTime(b));

  return appData;
}

function addColorToRow(eventType: string): string {
  return 'type__' + eventType.split(' ').join('-');
}

function addDeadlineColor(rowValues: any) {
  return rowValues.isDeadline ? ' type__deadline' : '';
}

function checkInactiveEventStatus(rowValues: any) {
  const dateNow = Date.now();
  let inactiveEventColor = '';

  if (rowValues.isDeadline) {
    inactiveEventColor = rowValues.deadlinedateTime < dateNow ? ' type__inactive' : ''
  } else inactiveEventColor = rowValues.dateTime < dateNow ? ' type__inactive' : ''

  return inactiveEventColor;
}

function addEventColors(rowData: any) {
  const rowColor = addColorToRow(rowData.type);
  const deadlineColor = addDeadlineColor(rowData);
  const inactiveEventColor = checkInactiveEventStatus(rowData);

  return rowColor + deadlineColor + inactiveEventColor;
}

function saveSchedule(arrayWithData: any, settings: any) {
  const FileSaver = require('file-saver');

  let stringForSaving = ''

  arrayWithData.forEach((el: any, index: any) => {
    stringForSaving += index + ' | ';
    stringForSaving += convertDateTime(el.dateTime, false, settings.timeZone) + ' | ';
    stringForSaving += el.event.name + ' | ';
    stringForSaving += el.event.type + ' | ';
    stringForSaving += el.event.description + ' | ';
    stringForSaving += el.event.deadlineDescription + '\n';
  })

  const file = new File([stringForSaving], "Schedule.txt", { type: "text/plain;charset=utf-8" });

  FileSaver.saveAs(file);
}

function convertDateTime(timestamp: number, toTime?: boolean, timezone?: string): string {
  let time = moment(timestamp);

  if (timezone) {
    time.tz(timezone);
  }

  if (toTime) {
    return time.format('HH:mm');
  }

  return time.format('dd, D MMM YYYY');
}

const openNotification = (
  type: NotificationType,
  title: string,
  description: string = '',
): void => {
  notification[type]({
    message: title,
    description,
  });
};

export {
  storage,
  createAppData,
  addColorToRow,
  convertDateTime,
  addEventColors,
  saveSchedule,
  openNotification,
};
