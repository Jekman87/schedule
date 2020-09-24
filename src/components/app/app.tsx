import React, { useState, useEffect } from 'react';

import Header from '../header';
import TableComponent from '../table';
import SList from '../list';
import Calendar from '../calendar';
import Footer from '../footer'
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
// import InfoWindow from '../info-window'
import EditWindow from '../edit-window'

import ApiService from '../../services/api-service';
import { storage, createAppData } from '../../helpers/utils';
import { LoadDataType, SettingsType, ModalStateType } from '../../constants/interfaces';
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
  isViewEvent: false,
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
  const [modalState, setModalState] = useState<ModalStateType>(initialModalState);

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

  const changeVisibility = (visibility: string): void => {
    setSettings((settings) => ({...settings, visibility}));
    console.log('Setting changeVisibility: ', visibility);
  }

  const downloadSchedule = (format: string): void => {
    // загрузка расписание в зависимости от формата
    // TODO
    console.log('Setting saveSchedule: ', format);
  }

  // метод вызывается при нажатии на кнопку в хедере AddEvent
  // показываем пустую модалку для создания ивента
  const showNewEventModal = (): void => {
    setModalState({
      isShow: true,
      isViewEvent: false,
      eventData: null
    });
    console.log('showAddEventModal');
  }

  // показать модалку с инфой о событии при клике по строке
  const showViewEventModal = (id: string): void => {
    const currentEvent = appData.find(el => el.event.id === id);
    setModalState({
      isShow: true,
      isViewEvent: true,
      eventData: currentEvent?.event
    });
    console.log('showEventModal: ', id);
  }

  // метод вызывается при нажатии на кнопку Редактировать в таблицу
  // показываем заполненную модалку для редактирования ивента
  const showEditEventModal = (id: string): void => {
    const currentEvent = appData.find(el => el.event.id === id);
    setModalState({
      isShow: true,
      isViewEvent: false,
      eventData: currentEvent?.event
    });
    console.log('showAddEventModal');
  }

  // метод вызывается из таблицы при удалении события
  const deleteEvent = (id: string): void => {
    // api.deleteEvent(id);
    // удалить из ивентов! при успешном запросе
    // сообщение об успехе?
    console.log('deleteEvent');
  }

  // метод вызывается из модалки при создании нового события
  const createModalEvent = (newEvent: object): void => {
    // api.createEvent(newEvent);
    // добавить в ивенты! при успешном запросе
    // сообщение об успехе?
    setModalState(initialModalState);
    console.log('createModalEvent');
  }

  // метод вызывается из модалки при редактировании события.
  const updateModalEvent = (id: string, newEvent: object): void => {
    // api.updateEvent(id, newEvent);
    // обновить в инвентах! при успешном запросе
    // сообщение об успехе?
    setModalState(initialModalState);
    console.log('updateModalEvent');
  }

  // метод вызывается из модалки при удалении события
  const deleteModalEvent = (id: string): void => {
    deleteEvent(id);
    setModalState(initialModalState);
    console.log('deleteModalEvent');
  }

  // закрытие модалки - по крестику или по области вне модалки
  const closeModal = (): void => {
    setModalState(initialModalState);
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
                appData={appData}
                settings={settings}
                showViewEventModal={showViewEventModal}
                showEditEventModal={showEditEventModal}
                deleteEvent={deleteEvent} />
      case WORK_SPACE.list:
        return <SList
                
                settings={settings}
                // showViewEventModal={showViewEventModal}
                
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
  // settings.workSpace
  const modal = modalState.isShow ?
    <EditWindow
      /*
      settings={settings}
      modalState={modalState}
      createModalEvent={createModalEvent}
      updateModalEvent={updateModalEvent}
      deleteModalEvent={deleteModalEvent}
      closeModal={closeModal}
      */
    /> :
    null;

  console.log('Settings: ', settings);
  console.log('appData: ', appData);

  return (
    <>
      <Header
        settings={settings}
        changeWorkSpace={changeWorkSpace}
        changeRole={changeRole}
        changeTimeZone={changeTimeZone}
        showNewEventModal={showNewEventModal}
        /*
        от этого функционала временно отказываемся
        changeAccessibility={changeAccessibility}
        downloadSchedule={downloadSchedule}
        changeStyles={changeStyles}
        changeVisibility={changeVisibility}
        */
      />
      {errorMessage}
      {spinner}
      {content}
      {modal}
      <Footer />
    </>
  );
}

export default App;
