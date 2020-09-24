import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';

import Header from '../header';
import TableComponent from '../table';
import SList from '../list';
import Calendar from '../calendar';
import Footer from '../footer'
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import InfoWindow from '../info-window'
import EditWindow from '../edit-window'

import ApiService from '../../services/api-service';
import { storage, createAppData } from '../../helpers/utils';
import { LoadDataType, SettingsType, ModalStateType, EventType } from '../../constants/interfaces';
import {
  ROLE,
  TIME_ZONE,
  WORK_SPACE,
  SCHEDULE_STORAGE_KEY
} from '../../constants/constants';

import './app.scss';
import 'antd/dist/antd.css'

const api = new ApiService();

const initialSettings: SettingsType = {
  workSpace: WORK_SPACE.table,
  role: ROLE.mentor,
  accessibility: false,
  timeZone: TIME_ZONE.minsk.location,
  styles: {color: 'black'}, // уточнить стилизацию
  visibility: '1111' // уточнить видимость столбцов
};

const initialModalState: ModalStateType = {
  isShow: false,
  eventData: null
};

const savedSettings = storage(SCHEDULE_STORAGE_KEY) || initialSettings;

const App: React.FC = () => {
  const [loadData, setLoadData] = useState<LoadDataType>({
    data: [],
    loading: true,
    error: false
  });
  const [settings, setSettings] = useState<SettingsType>(savedSettings);
  const [infoWindowState, setInfoWindowState] = useState<ModalStateType>(initialModalState);
  const [editWindowState, setEditWindowState] = useState<ModalStateType>(initialModalState);

  useEffect(() => {
    api.getAllEvents()
      .then((data) => {
        setLoadData((state) => ({
          ...state,
          loading: false,
          data: data.data
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

  useEffect(() => {
    storage(SCHEDULE_STORAGE_KEY, settings);
  }, [settings]);

  const { data, loading, error } = loadData;
  const appData = createAppData(data);

  const changeWorkSpace = (workSpace: string): void => {
    setSettings((settings) => ({...settings, workSpace}));
    console.log('Setting changeWorkSpace: ', workSpace);
  }

  const changeRole = (role: string): void => {
    setSettings((settings) => ({...settings, role}));
    console.log('Setting changeRole: ', role);
  }

  const changeAccessibility = (accessibility: boolean): void => {
    setSettings((settings) => ({...settings, accessibility}));
    console.log('Setting changeAccessibility: ', accessibility);
  }

  const changeTimeZone = (timeZone: string): void => {
    setSettings((settings) => ({...settings, timeZone}));
    console.log('Setting changeTimeZone: ', timeZone);
  }

  const changeStyles = (styles: object): void => {
    setSettings((settings) => ({...settings, styles}));
    console.log('Setting changeStyles: ', styles);
  }

  const changeVisibilityColumns = (visibility: string): void => {
    setSettings((settings) => ({...settings, visibility}));
    console.log('Setting changeVisibility: ', visibility);
  }

  const downloadSchedule = (format: string): void => {
    // загрузка расписание в зависимости от формата
    // TODO
    console.log('Setting saveSchedule: ', format);
  }

  // метод вызывается при нажатии на кнопку в хедере AddEvent
  // Или на кнопку редактирования события

  const showEditWindow = (id: string | null = null): void => {
    let currentEvent: EventType | null = null;

    if (id) {
      currentEvent = appData.find(el => el.event.id === id)?.event || null;
    }

    setEditWindowState({
      isShow: true,
      eventData: currentEvent,
    });
    setInfoWindowState({
      isShow: false,
      eventData: null,
    });
    console.log('showEditWindow: ', id);
  }

  // показать модалку с инфой о событии при клике по строке
  const showInfoWindow = (id: string): void => {
    const currentEvent: EventType | null = appData.find(el => el.event.id === id)?.event || null;

    setInfoWindowState({
      isShow: true,
      eventData: currentEvent,
    });
    setEditWindowState({
      isShow: false,
      eventData: null,
    });
    console.log('showInfoWindow: ', id);
  }

  // метод вызывается из таблицы при удалении события
  const deleteEvent = (id: string): boolean => {
    const isConfirm = window.confirm('Delete the event?');

    if (isConfirm) {
      // api.deleteEvent(id)
      window.alert('Event deleted!');
      console.log('deleteEvent');
      return true;
    }
    return false;
  }

  // метод вызывается из модалки при создании нового события
  const createEvent = (newEvent: object): void => {
    // api.createEvent(newEvent);
    // добавить в ивенты! при успешном запросе
    window.alert('Event created!');
    setEditWindowState({
      isShow: false,
      eventData: null,
    });
    console.log('createEvent');
  }

  // метод вызывается из модалки при редактировании события.
  const updateEvent = (id: string, newEvent: object): void => {
    // api.updateEvent(id, newEvent);
    // обновить в инвентах! при успешном запросе
    window.alert('Event updated!');
    setEditWindowState({
      isShow: false,
      eventData: null,
    });
    console.log('updateEvent');
  }

  // метод вызывается из модалки при удалении события
  const deleteModalEvent = (id: string): void => {
    const isDelete = deleteEvent(id);

    if (isDelete) {
      closeModal();
      console.log('deleteModalEvent');
    }
  }

  // закрытие модалки - по крестику или по области вне модалки
  const closeModal = (): void => {
    setEditWindowState({
      isShow: false,
      eventData: null,
    });
    setInfoWindowState({
      isShow: false,
      eventData: null,
    });
    console.log('closeModal');
  }

  // добавить цвет фона к вашему компоненту, который содержит евент
  // работает по принципу присвоения класса
  // классы прописаны в app.scss
  // применяем настройки к данным. Сортировка, фильрация и т.д.

  const addWorkSpace = (currentWorkSpace: string) => {
    switch(currentWorkSpace) {
      case WORK_SPACE.table:
        return <TableComponent
                /*
                settings={settings}
                showViewEventModal={showViewEventModal}
                showEditEventModal={showEditEventModal}
                deleteEvent={deleteEvent}
                */
                appData={appData} />

      case WORK_SPACE.list:
        return <SList
                /*
                settings={settings}
                showViewEventModal={showViewEventModal}
                */
                appData={appData} />

      case WORK_SPACE.calendar:
        return <Calendar
                /*
                settings={settings}
                showViewEventModal={showViewEventModal}
                */
                appData={appData} />

      default:
        return null;
    }
  }

  const errorMessage = error ? <ErrorIndicator /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = appData.length ? addWorkSpace(settings.workSpace) : null;
  const editWindow = editWindowState.isShow ?
    <EditWindow
      /*
      settings={settings}
      event={editWindowState.eventData}
      createEvent={createEvent}
      updateEvent={updateEvent}
      deleteModalEvent={deleteModalEvent}
      closeModal={closeModal}
      */
    /> : null;
  const infoWindow = infoWindowState.isShow ?
    <InfoWindow
      /*
      settings={settings}
      event={editWindowState.eventData}
      showEditWindow={showEditWindow}
      deleteModalEvent={deleteModalEvent}
      closeModal={closeModal}
      */
    /> : null;

  console.log('Settings: ', settings);
  console.log('appData: ', appData);

  return (
    <Layout>
      <Header
        settings={settings}
        changeWorkSpace={changeWorkSpace} // убрать, аналог ниже
        /*
        changeWorkSpace={changeWorkSpace}
        changeRole={changeRole}
        changeAccessibility={changeAccessibility}
        changeTimeZone={changeTimeZone}
        downloadSchedule={downloadSchedule}
        changeStyles={changeStyles}
        changeVisibilityColumns={changeVisibilityColumns}
        showEditWindow={showEditWindow}
        */
      />
      <Layout.Content>
        {errorMessage}
        {spinner}
        {content}
        {editWindow}
        {infoWindow}
      </Layout.Content>
      <Footer />
    </Layout>
  );
}

export default App;
