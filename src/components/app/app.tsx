import React from 'react';

import Header from '../header';
import Table from '../table';
import List from '../list';
import Calendar from '../calendar';
import Footer from '../footer';

import './app.scss';
import TestApi from '../test-api';


function App() {
  return (
    <div className="app">
      <Header />
      <Table />
      <List />
      <Calendar />
      <Footer />
      <TestApi />
    </div>
  );
}

export default App;
