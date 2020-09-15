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

const App: React.FunctionComponent = () => {

  const [workSpace, setWorkSpace] = useState<string>('table')
  const [appData, setAppData] = useState<any[]>([])

  useEffect(() => {
    fetch('https://rs-react-schedule.firebaseapp.com/api/team/100/events').then(data => data.json()).then(data2 => console.log(data2.data))
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
