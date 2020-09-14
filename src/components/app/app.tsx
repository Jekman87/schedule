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
import { storage } from '../../helpers/utils';

import './app.scss';
import 'antd/dist/antd.css'

interface LoadDataType {
  appData: string[]
  loading: boolean
  error: boolean
}

interface settingsType {
  workSpace: string
  role: string
  accessibility: boolean
  timeZone: string
  styles: object
  visibility: string
};

const api = new ApiService();

const initialSettings: settingsType = {
  workSpace: 'table',
  role: 'student',
  accessibility: false,
  timeZone: 'Europe/Minsk', // уточнить
  styles: {color: 'black'}, // уточнить
  visibility: '1111' // уточнить - видимость столбцов
};

const savedSettings = storage('scheduleSettings') || initialSettings;

// console.log('savedSettings', savedSettings);

const App: React.FC = () => {
  const [loadData, setLoadData] = useState<LoadDataType>({
    appData: [],
    loading: true,
    error: false
  });
  const [settings, setSettings] = useState<settingsType>(savedSettings);

  useEffect(() => {
    api.getAllEvents()
      .then((data) => {
        setLoadData((state) => ({
          ...state,
          loading: false,
          appData: data.data
        }));
      })
      .catch((err) => {
        console.log(err);
        setLoadData((state) => ({
          ...state,
          loading: false,
          error: true
        }));
      });
  }, []);

  const changeSettings = (newSettings: settingsType): void => {
    storage('scheduleSettings', newSettings);
    setSettings(newSettings);
  }

  const changeWorkSpace = (workSpace: string): void => {
    const newSettings: settingsType = {...settings, workSpace};
    changeSettings(newSettings);

    console.log('Setting changeWorkSpace: ', workSpace);
  }

  const changeRole = (role: string):void => {
    const newSettings: settingsType = {...settings, role};
    changeSettings(newSettings);

    console.log('Setting changeRole: ', role);
  }

  const changeAccessibility = (accessibility: boolean):void => {
    const newSettings: settingsType = {...settings, accessibility};
    changeSettings(newSettings);

    console.log('Setting changeAccessibility: ', accessibility);
  }

  const changeTimeZone= (timeZone: string):void => {
    const newSettings: settingsType = {...settings, timeZone};
    changeSettings(newSettings);

    console.log('Setting changeTimeZone: ', timeZone);
  }

  const changeStyles = (styles: object):void => {
    const newSettings: settingsType = {...settings, styles};
    changeSettings(newSettings);

    console.log('Setting changeStyles: ', styles);
  }

  const changeVisibility= (visibility: string):void => {
    const newSettings: settingsType = {...settings, visibility};
    changeSettings(newSettings);

    console.log('Setting changchangeVisibilityeTimeZone: ', visibility);
  }

  const saveSchedule = (format: string):void => {
    // созранение расписание в зависимости от формата
    console.log('Setting saveSchedule: ', format);
  }

  // метод вызывается из модалки при создании нового события
  const createEvent = (newEvent: object):void => {
    // api.createEvent(newEvent);
    console.log('Setting createEvent');
  }

  // метод вызывается из модалки при редактировании события. Или из таблицы.
  const updateEvent = (id: string, newEvent: object):void => {
    // api.updateEvent(id, newEvent);
    console.log('Setting updateEvent');
  }

  // метод вызывается из модалки при редактировании события. Или из таблицы.
  const deleteEvent = (id: string):void => {
    // api.deleteEvent(id);
    console.log('Setting deleteEvent');
  }

  const { appData, loading, error } = loadData;

  const addWorkSpace = (currentWorkSpace: string) => {
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
  const content = appData.length ? addWorkSpace(settings.workSpace) : null;

  console.log('Settings: ', settings);
  console.log('LoadData: ', loadData);

  return (
    <>
      <Header
        /*
        settings={settings}
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
