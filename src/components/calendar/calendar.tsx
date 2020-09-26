import React, { useState, useEffect } from 'react';
import FullCalendar, { /*EventApi, DateSelectArg,*/ EventClickArg, EventContentArg, /*formatDate*/ } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import momentTimezonePlugin from '@fullcalendar/moment-timezone'
import { EventInput } from '@fullcalendar/react';

import './calendar.scss';


interface Props {
  appData: any[];
  settings: any;
  showInfoWindow: (id: string) => void;
}


// interface CalendarState {
//   weekendsVisible: boolean
//   currentEvents: EventApi[]
// }




// let eventGuid = 0
// let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

// function createEventId() {
//   return String(eventGuid++)
// }

const Calendar: React.FunctionComponent<Props> = ({ settings, appData, showInfoWindow }) => {

  // let myEvents: EventInput[] = [];
  const [myEvents, setMyEvents] = useState<EventInput[]>([]);

  useEffect(() => {

    // console.log('settings', settings, appData );
    console.log('settings\r\n\r\n');
    const eventsArray: EventInput[] = [];
    appData.forEach((el) => {
      if (!el.isDeadline) {
        const event: EventInput = {};
        event.id = el.event.id;
        event.title = el.event.name;
        event.start = new Date(el.event.dateTime);
        event.textColor = '#000000';
        event.classNames = [`type__${el.event.type.split(' ').join('-')}`]
        event.borderColor = 'transparent';
        event.display = 'block';
        if (el.event.deadlinedateTime !== 0) {
          event.end = new Date(el.event.deadlinedateTime);

        }
        // event.color = 'black';
        // event.textColor= 'red';
        eventsArray.push(event);
      } else {
        const event: EventInput = {};
        // event.start = new Date(el.event.deadlinedateTime - 23600000 );//.toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
        event.start = new Date(el.event.deadlinedateTime);//.toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
        console.log('background' , event.start)
        event.allDay = true;
        event.backgroundColor = 'red';
        event.display = 'background';
        eventsArray.push(event);
      }
    })
    console.log('settings :', myEvents);
    setMyEvents(eventsArray);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings, appData]);


  // console.log('Appdata: ', appData);
  // console.log('myEvents: ', myEvents);
  // const [currentEvents, setcurrentEvents] = useState<EventApi[]>([]);

  // const handleDateSelect = (selectInfo: DateSelectArg) => {
  //   let title = prompt('Please enter a new title for your event')
  //   let calendarApi = selectInfo.view.calendar

  //   calendarApi.unselect() // clear date selection

  //   if (title) {
  //     calendarApi.addEvent({
  //       id: createEventId(),
  //       title,
  //       start: selectInfo.startStr,
  //       end: selectInfo.endStr,
  //       allDay: selectInfo.allDay
  //     })
  //   }
  // }

  const handleEventClick = (clickInfo: EventClickArg) => {
    showInfoWindow(clickInfo.event._def.publicId);
  }

  // const handleEvents = (events: EventApi[]) => {
  //   setcurrentEvents(events);
  // }


  return (
    <div className='calendar'>
      {/* {renderSidebar()} */}
      <div className='demo-app-main'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, momentTimezonePlugin]}
          headerToolbar={{
            left: '',
            center: 'title',
            right: 'prev,next'
          }}
          // eventColor={'green'}
          timeZone={settings.timeZone}
          firstDay={1}
          initialView='dayGridMonth'
          editable={false}
          selectable={true}
          selectMirror={true}
          // dayMaxEventRows={true}
          dayMaxEvents={6}
          weekends={true}
          events={myEvents} // alternatively, use the `events` setting to fetch from a feed
          // initialEvents={myEvents} // alternatively, use the `events` setting to fetch from a feed
          // select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
          eventTimeFormat={{ hour: '2-digit', minute: '2-digit', hour12: false }}
          displayEventEnd={true}
        />
      </div>
    </div>
  )
}

function renderEventContent(eventContent: EventContentArg) {
  return (
    <>
      {/* <span className="fc-daygrid-event-dot"></span>
    <QuestionOutlined /> */}
      <span className="fc-event-time">{eventContent.timeText}</span>
      <span className="fc-event-title">{eventContent.event.title}</span>
      {/* <b>{eventContent.timeText}</b>
      <b><QuestionOutlined /></b>
      <i>{eventContent.event.title}</i> */}
    </>
  )
}


export default Calendar;