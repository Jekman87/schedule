import React, { useState } from 'react';
import FullCalendar, { EventApi, DateSelectArg, EventClickArg, EventContentArg, formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/react';
import { red } from '@ant-design/colors';
import './calendar.scss';


interface Props {
  appData: any[]
}

interface CalendarState {
  weekendsVisible: boolean
  currentEvents: EventApi[]
}




let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

function createEventId() {
  return String(eventGuid++)
}

const Calendar: React.FunctionComponent<Props> = ({ appData }) => {

  const myEvents: EventInput[] = [];

  appData.forEach((el) => {
    if (!el.isDeadline) {
      const event: EventInput = {};
      event.id = el.event.id;
      event.title = el.event.name;
      event.start = new Date(el.event.dateTime).toISOString();
      // event.backgroundColor = 'black';
      // event.borderColor= 'green';
      // event.textColor= 'red';
      event.display = 'block';
      if (el.event.deadlinedateTime !== 0) {
        event.end = new Date(el.event.deadlinedateTime).toISOString();
      }
      // event.color = 'black';
      // event.textColor= 'red';
      myEvents.push(event);
    }
  })

  console.log('Appdata: ', appData);
  const [weekendsVisible, setWeekendsVidible] = useState<boolean>(true);
  const [currentEvents, setcurrentEvents] = useState<EventApi[]>([]);


  const handleWeekendsToggle = () => {
    setWeekendsVidible((s) => !s)
  }

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  const handleEvents = (events: EventApi[]) => {
    setcurrentEvents(events);
  }


  const renderSidebar = () => {
    return (
      <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
          <h2>Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        <div className='demo-app-sidebar-section'>
          <label>
            <input
              type='checkbox'
              checked={weekendsVisible}
              onChange={handleWeekendsToggle}
            ></input>
            toggle weekends
          </label>
        </div>
        <div className='demo-app-sidebar-section'>
          <h2>All Events ({currentEvents.length})</h2>
          <ul>
            {currentEvents.map(renderSidebarEvent)}
          </ul>
        </div>
      </div>
    )
  }



  return (
    <div className='demo-app'>
      {/* {renderSidebar()} */}
      <div className='demo-app-main'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: '',
            center: 'title',
            right: 'prev,next'
          }}
          eventColor={'green'}
          firstDay={1}
          initialView='dayGridMonth'
          editable={false}
          selectable={true}
          selectMirror={true}
          // dayMaxEventRows={true}
          dayMaxEvents={4}
          weekends={weekendsVisible}
          initialEvents={myEvents} // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          // eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
          eventTimeFormat={{ hour: '2-digit', minute: '2-digit', hour12: false }}
        />
      </div>
    </div>
  )
}


function renderSidebarEvent(event: EventApi) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start!, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
      <i>{event.title}</i>
    </li>
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