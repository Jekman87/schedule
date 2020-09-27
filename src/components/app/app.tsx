import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';

import Header from '../header';
import TableComponent from '../table';
import SList from '../list';
import Calendar from '../calendar';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import InfoWindow from '../info-window'
import EditWindow from '../edit-window'

import ApiService from '../../services/api-service';
import { storage, createAppData, saveSchedule } from '../../helpers/utils';
import { LoadDataType, SettingsType, ModalStateType, EventType, AppEventType } from '../../constants/interfaces';
import {
  ROLE,
  TIME_ZONE,
  WORK_SPACE,
  SCHEDULE_STORAGE_KEY
} from '../../constants/constants';

import './app.scss';
import 'antd/dist/antd.css'

const api = new ApiService();

const initialLoadData: LoadDataType = {
  data: [],
  loading: true,
  error: false,
};

const initialSettings: SettingsType = {
  workSpace: WORK_SPACE.table,
  role: ROLE.mentor,
  timeZone: TIME_ZONE.minsk.location,
  taskFilter: '',
  visibilityOldEvents: true,
};

const initialModalState: ModalStateType = {
  isShow: false,
  eventData: null,
};

const savedSettings = storage(SCHEDULE_STORAGE_KEY) || initialSettings;

const App: React.FC = () => {
  const [loadData, setLoadData] = useState<LoadDataType>(initialLoadData);
  const [appData, setAppData] = useState<AppEventType[] | null>(null);
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
    console.log('Prepare data');
    const { visibilityOldEvents, taskFilter } = settings;
    let filteredData: EventType[] = loadData.data;

    if (!visibilityOldEvents) {
      const time = new Date().getTime();

      filteredData = filteredData.filter((eventObj) => {
        const { dateTime, deadlinedateTime } = eventObj;

        return (dateTime > time) || (deadlinedateTime > 0 && deadlinedateTime > time);
      });
    }

    if (taskFilter) {
      filteredData = filteredData.filter((eventObj) => eventObj.type === taskFilter);
    }

    setAppData(createAppData(filteredData));
  }, [loadData.data, settings]);

  useEffect(() => {
    storage(SCHEDULE_STORAGE_KEY, settings);
  }, [settings]);

  const changeWorkSpace = (workSpace: string): void => {
    setSettings((settings) => ({...settings, workSpace}));
    console.log('Setting changeWorkSpace: ', workSpace);
  }

  const changeRole = (role: string): void => {
    setSettings((settings) => ({...settings, role}));
    console.log('Setting changeRole: ', role);
  }

  const changeTimeZone = (timeZone: string): void => {
    setSettings((settings) => ({...settings, timeZone}));
    console.log('Setting changeTimeZone: ', timeZone);
  }

  const changeTaskFilter = (taskFilter: string): void => {
    setSettings((settings) => ({...settings, taskFilter}));
    console.log('Setting changeTaskFilter: ', taskFilter);
  }

  const changeVisibilityOldEvengs = (visibilityOldEvents: boolean): void => {
    setSettings((settings) => ({...settings, visibilityOldEvents}));
    console.log('Setting changeVisibilityOldEvengs: ', visibilityOldEvents);
  }

  const downloadSchedule = (): void => {
    saveSchedule(appData, settings);
    console.log('Setting downloadSchedule');
  }

  // метод вызывается при нажатии на кнопку в хедере AddEvent
  // Или на кнопку редактирования события
  const showEditWindow = (id: string | null = null): void => {
    let currentEvent: EventType | null = null;

    if (id) {
      currentEvent = appData?.find(el => el.event.id === id)?.event || null;
    }

    setInfoWindowState({
      isShow: false,
      eventData: null,
    });
    setEditWindowState({
      isShow: true,
      eventData: currentEvent,
    });
    console.log('showEditWindow: ', id);
  }

  // показать модалку с инфой о событии при клике по строке
  const showInfoWindow = (id: string): void => {
    const currentEvent: EventType | null = appData?.find(el => el.event.id === id)?.event || null;

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
  // или из модалки
  const deleteEvent = (id: string): boolean => {
    const isConfirm = window.confirm('Delete the event?');

    if (isConfirm) {
      api.deleteEvent(id)
        .then(() => {
          const newAppData = appData?.filter((eventObj) => eventObj.event.id !== id) || null;
          setAppData(newAppData);
          window.alert('Event deleted!');
          console.log('deleteEvent');
        })
        .catch((err) => {
          window.alert('Event was not deleted!');
          console.log('not deleteEvent: ', err);
        });

      return true;
    }
    return false;
  }

  // метод вызывается из модалки при создании нового события
  const createEvent = (newEvent: object): void => {
    console.log('Try to create Event: ', newEvent);
    api.createEvent(newEvent)
      .then((data) => {
        setLoadData((state) => {
          const newData = state.data.concat(data);

          return {
            ...state,
            data: newData,
          };
        });
        window.alert('Event created!');
        console.log('createEvent');
      })
      .catch((err) => {
        window.alert('Event was not created!');
        console.log('not createEvent: ', err);
      });
    setEditWindowState({
      isShow: false,
      eventData: null,
    });
  }

  // метод вызывается из модалки при редактировании события.
  const updateEvent = (id: string, newEvent: object): void => {
    api.updateEvent(id, newEvent)
      .then((data) => {
        setLoadData((state) => {
          let newData = state.data.filter((eventObj) => eventObj.id !== id);
          newData = newData.concat(data);

          return {
            ...state,
            data: newData,
          };
        });
        window.alert('Event updated!');
        console.log('updateEvent');
      })
      .catch((err) => {
        window.alert('Event was not updated!');
        console.log('not updateEvent: ', err);
      });

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

  const addWorkSpace = (currentWorkSpace: string) => {
    if (!appData || !appData.length) {
      return null;
    }

    switch(currentWorkSpace) {
      case WORK_SPACE.table:
        return <TableComponent
                appData={appData}
                settings={settings}
                showInfoWindow={showInfoWindow}
                showEditWindow={showEditWindow}
                deleteEvent={deleteEvent} />
      case WORK_SPACE.list:
        return <SList
                settings={settings}
                showInfoWindow={showInfoWindow}
                appData={appData} />

      case WORK_SPACE.calendar:
        return <Calendar
                settings={settings}
                showInfoWindow={showInfoWindow}
                appData={appData} />

      default:
        return null;
    }
  }

  const { error, loading } = loadData;

  const errorMessage = error ? <ErrorIndicator /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = appData?.length ? addWorkSpace(settings.workSpace) : null;
  const editWindow = editWindowState.isShow ?
    <EditWindow
      settings={settings}
      event={editWindowState.eventData}
      createEvent={createEvent}
      updateEvent={updateEvent}
      deleteModalEvent={deleteModalEvent}
      closeModal={closeModal}
    /> : null;
  const infoWindow = infoWindowState.isShow ?
    <InfoWindow
      event={infoWindowState.eventData}
      /*
      settings={settings}
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
        changeWorkSpace={changeWorkSpace}
        changeRole={changeRole}
        changeTimeZone={changeTimeZone}
        showEditWindow={showEditWindow}
        changeTaskFilter={changeTaskFilter}
        changeVisibilityOldEvengs={changeVisibilityOldEvengs}
        downloadSchedule={downloadSchedule}
      />
      <Layout.Content>
        {errorMessage}
        {spinner}
        {content}
        {editWindow}
        {infoWindow}
      </Layout.Content>
    </Layout>
  );
}

export default App;
