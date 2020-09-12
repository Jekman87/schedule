import React, { useState, useEffect } from 'react';

import ApiService from '../../services/api-service';

import Header from '../header';
import TableComponent from '../table';
import SList from '../list';
import Calendar from '../calendar';
import Footer from '../footer'
// import InfoWindow from '../info-window'
// import EditWindow from '../edit-window'

import './app.scss';
import 'antd/dist/antd.css'

import 'antd/dist/antd.css'


const api = new ApiService();

const createEvent = (newEvent: object) => api.createEvent(newEvent).then((data) => console.log(data)); // pass to hedear + call modal window + time-zone + eye +
// const getEventById = (id: string) => api.getEventById(id).then((data) => console.log(data));
const updateEvent = (id: string, newEvent: object) => api.updateEvent(id, newEvent).then((data) => console.log(data)); // pass to all (without header)
const deleteEvent = (id: string) => api.deleteEvent(id).then((data) => console.log(data)); // pass to all (without header)


const App: React.FunctionComponent = () => {

  const [workSpace, setWorkSpace] = useState<string>('table')
  const [appData, setAppData] = useState<any[]>([])

  useEffect(() => {
    api.getAllEvents().then((data) => setAppData(data.data)); // to state
    api.getEventById("CendyYTicEvwd0rofuDD")
  }, []);

  useEffect(() => {
    console.log(appData)
  });

  const changeWorkSpace = (clickedWorkSpace:any):void => {
    setWorkSpace(clickedWorkSpace)
  }

  const addWorkSpace = (currentWorkSpace:string) => {
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
        console.log(currentWorkSpace)
    }
  }

  return (
    <div className="app">
      <Header
      onChangeWorkSpace={changeWorkSpace} />
      { addWorkSpace(workSpace) }
      <Footer />
      {/* <InfoWindow />
      <EditWindow /> */}
    </div>
  );
}

export default App;
