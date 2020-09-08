import React, { useState } from 'react';

import Header from '../header';
import Table from '../table';
import List from '../list';
import Calendar from '../calendar';
import Footer from '../footer'
import InfoWindow from '../info-window'
import EditWindow from '../edit-window'

import './app.scss';
import 'antd/dist/antd.css'


const App: React.FunctionComponent = () => {

  const [workSpace, setWorkSpace] = useState<string>('table')

  const changeWorkSpace = (clickSpace:string):void => {
    setWorkSpace(clickSpace)
  }

  const addWorkSpace = (currentWorkSpace:string) => {
    switch(currentWorkSpace) {
      case 'table':
        return <Table text="TABLE" />
      case 'list': 
      return <List />
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
      <InfoWindow />
      <EditWindow />
    </div>
  );
}

export default App;
