import React, { useState, useEffect } from 'react';

import ApiService from '../../services/api-service';

import Header from '../header';
import TableComponent from '../table';
import SList from '../list';
import Calendar from '../calendar';
import Footer from '../footer'
import Spinner from '../spinner';
// import InfoWindow from '../info-window'
// import EditWindow from '../edit-window'

import './app.scss';
import 'antd/dist/antd.css'


const api = new ApiService();

// const createEvent = (newEvent: object) => api.createEvent(newEvent).then((data) => console.log(data)); // pass to hedear + call modal window + time-zone + eye +
// const getEventById = (id: string) => api.getEventById(id).then((data) => console.log(data));
// const updateEvent = (id: string, newEvent: object) => api.updateEvent(id, newEvent).then((data) => console.log(data)); // pass to all (without header)
// const deleteEvent = (id: string) => api.deleteEvent(id).then((data) => console.log(data)); // pass to all (without header)

const App: React.FC = () => {

  const [workSpace, setWorkSpace] = useState<string>('table');
  const [appData, setAppData] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

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

  const changeWorkSpace = (clickedWorkSpace:string):void => {
    setWorkSpace(clickedWorkSpace);
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

  const errorMessage = error ? <p>Server error!</p> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = appData.length ? addWorkSpace(workSpace) : null;

  return (
    <>
      <Header
        onChangeWorkSpace={changeWorkSpace}

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
