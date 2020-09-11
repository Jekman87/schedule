import React from 'react';

import Header from '../header';
import Table from '../table';
import List from '../list';
import Calendar from '../calendar';
import Footer from '../footer';
import EditWindow from '../editWindow'

import './app.scss';


function App() {
  return (
    <div className="app">
      <Header />
      <Table />
      <List />
      <Calendar />
      <Footer />
      <EditWindow />
    </div>
  );
}

export default App;
