import React, { useState, useEffect } from 'react';

import Header from '../header';
import TableComponent from '../table';
import SList from '../list';
import Calendar from '../calendar';
import Footer from '../footer'
// import InfoWindow from '../info-window'
// import EditWindow from '../edit-window'

import './app.scss';
import 'antd/dist/antd.css'


const App: React.FunctionComponent = () => {

  const [workSpace, setWorkSpace] = useState<string>('table')

  // for fetch from API
/*   useEffect(() => {
    fetch('rs-react-schedule.firebaseapp.com/api')
    console.log(13)
  }, []); */

  useEffect(() => {
    console.log(workSpace)
  });


  const changeWorkSpace = (clickedWorkSpace:any):void => {
    setWorkSpace(clickedWorkSpace)
  }

  const addWorkSpace = (currentWorkSpace:string) => {
    switch(currentWorkSpace) {
      case 'table':
        return <TableComponent />
      case 'list': 
      return <SList />
      case 'calendar':
        return <Calendar />
      default:
        console.log(currentWorkSpace)
    }
  }

  return (
    <div className="app">
      <Header onChangeWorkSpace={changeWorkSpace} />
      { addWorkSpace(workSpace) }
      <Footer />
      {/* <InfoWindow />
      <EditWindow /> */}
    </div>
  );
}

export default App;
