import React, { useState, useEffect } from 'react';

import ApiService from '../../services/api-service';

import Header from '../header';
import TableComponent from '../table';
import SList from '../list';
import Calendar from '../calendar';
import Footer from '../footer'
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
// import InfoWindow from '../info-window'
// import EditWindow from '../edit-window'

import './app.scss';
import 'antd/dist/antd.css'

const api = new ApiService();

//создать константы для настроек. Используем здесь, в хедере и возможно в др местах

const initialSettings = {};
const savedSettings = {} || null; // забираем из LocalStorage
const currentSettings = savedSettings ? savedSettings : initialSettings;

// const createEvent = (newEvent: object) => api.createEvent(newEvent).then((data) => console.log(data)); // pass to hedear + call modal window + time-zone + eye +
// const getEventById = (id: string) => api.getEventById(id).then((data) => console.log(data));
// const updateEvent = (id: string, newEvent: object) => api.updateEvent(id, newEvent).then((data) => console.log(data)); // pass to all (without header)
// const deleteEvent = (id: string) => api.deleteEvent(id).then((data) => console.log(data)); // pass to all (without header)

const App: React.FC = () => {
  // при обновлении страницы настройки берутся из LocalStorage - currentSettings

  const [appData, setAppData] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  // объединить настройки в 1 объект стейт?
  //const [settings, setSettings] = useState<{}>(currentSettings);

  const [workSpace, setWorkSpace] = useState<string>('table');
  const [role, setRole] = useState<string>('student');
  const [accessibility, setAccessibility] = useState<boolean>(false);
  const [timeZone, setTimeZone] = useState<string>('ru-Ru');

  useEffect(() => {
    api.getAllEvents()
      .then((data) => {
        setLoading(false);
        setAppData(data.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(true);
      });
  }, []);

  const changeWorkSpace = (clickedWorkSpace: string):void => {
    setWorkSpace(clickedWorkSpace);
  }

  const changeRole = (role: string):void => {
    setRole(role);
    console.log('Setting changeRole: ', role);
  }

  const changeAccessibility = (isOn: boolean):void => {
    setAccessibility(isOn);
    console.log('Setting changeAccessibility: ', isOn);
  }

  const changeTimeZone= (timeZone: string):void => {
    setTimeZone(timeZone);
    console.log('Setting changeTimeZone: ', timeZone);
  }

  const saveSchedule = (format: string):void => {
    // созранение расписание в зависимости от формата
    console.log('Setting saveSchedule: ', format);
  }

  const changeStyles= (style: string):void => {
    // setStyles(style);
    console.log('Setting changeStyles: ', style);
  }

  const changeVisibility= (visibility: string):void => {
    // setVisibility(visibility);
    console.log('Setting changchangeVisibilityeTimeZone: ', visibility);
  }

  // метод вызывается из модалки при создании нового события
  const createEvent = (newEvent: object):void => {
    // api.createEvent(newEvent)
    console.log('Setting addEvent');
  }

  // метод вызывается из модалки при редактировании события. Или из таблицы.
  const updateEvent = (id: string, newEvent: object):void => {
    // api.updateEvent(id, newEvent)
    console.log('Setting addEvent');
  }


  const addWorkSpace = (currentWorkSpace:string) => {
    console.log(appData);

    switch(currentWorkSpace) {
      case 'table':
        return <TableComponent
                appData={appData} />
      case 'list':
        return <SList
                appData={appData} />
      case 'calendar':
        return <Calendar
                appData={appData} />
      default:
        return null;
    }
  }

  const errorMessage = error ? <ErrorIndicator /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = appData.length ? addWorkSpace(workSpace) : null;

  return (
    <>
      <Header
        /*
        settings={settings}

        workSpace={workSpace}
        role={role}
        accessibility={accessibility}
        timeZone={timeZone}
        */

        onChangeWorkSpace={changeWorkSpace}
        /*
        changeWorkSpace={changeWorkSpace}
        changeRole={changeRole}
        changeAccessibility={changeAccessibility}
        changeTimeZone={changeTimeZone}
        saveSchedule={saveSchedule}
        changeStyles={changeStyles}
        changeVisibility={changeVisibility}
        */
      />
      {errorMessage}
      {spinner}
      {content}
      <Footer />
      {/* <InfoWindow />
      <EditWindow /> */}
    </>
  );
}

export default App;
