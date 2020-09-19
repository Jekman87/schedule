import { EventType, AppEventType } from "../constants/interfaces";

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

function createAppData(data: EventType[]) {
  if (!data.length) {
    return [];
  }

  const appData: AppEventType[] = [];

  data.forEach((eventObj) =>{
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
    return eventObj.isDeadline ?
      eventObj.event.deadlinedateTime :
      eventObj.event.dateTime;
  }

  appData.sort((a, b) => getStartOrDeadlineTime(a) - getStartOrDeadlineTime(b));

  return appData;
}

export { storage, createAppData };
