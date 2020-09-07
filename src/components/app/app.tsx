import React from 'react';

import Header from '../header';
import Table from '../table';
import List from '../list';
import Calendar from '../calendar';
import Footer from '../footer'
import InfoWindow from '../info-window'
import EditWindow from '../edit-window'

import './app.scss';


const App: React.FunctionComponent = () => {

/*   const [workSpace, setWorkSpace] = useState<string>('table')

  const addWorkSpace = (currentWorkSpace:string) => {
    switch(currentWorkSpace) {
      case 'table':
        return <Table />
      case 'list': 
      return <Table />
      case 'Calendar':
        return <Calendar />
      default:
        console.log('table')
    }
  } */

  return (
    <div className="app">
      <Header />
      <Table />
      <List />
      <Calendar />
      <Footer />
      <InfoWindow />
      <EditWindow />
    </div>
  );
}

export default App;
