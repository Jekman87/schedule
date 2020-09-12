import React from 'react';

import './calendar.scss';

interface Props {
  appData: any[]
}

const Calendar: React.FunctionComponent<Props> = ({ appData }) => {
  return (
    <div className="calendar" onClick={() => console.log(appData)}>Calendar</div>
  );
}

export default Calendar;
