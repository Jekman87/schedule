// import React from 'react';

import './calendar.scss';

// function Calendar() {
//   return (
//     <div className="calendar">Calendar</div>
//   );
// }

// export default Calendar;
import React, {useState} from 'react';
import FullCalendar, { EventApi, DateSelectArg, EventClickArg, EventContentArg, formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/react';

interface Props {
  appData: any[]
}

interface CalendarState {
  weekendsVisible: boolean
  currentEvents: EventApi[]
}

// const Calendar: React.FunctionComponent<Props> = ({ appData }) => {
//   return (
//     <div className="calendar" onClick={() => console.log(appData)}>Calendar</div>
//   );
// }

// export default Calendar;



// const Calendar: React.FunctionComponent<Props> = ({ appData }) => {
//   return (
//     <div className="calendar" onClick={() => console.log(appData)}>Calendar</div>
//   );
// }

// export default Calendar;





let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00'
  }
]

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
      if (el.event.deadlinedateTime !== 0) {
        event.end = new Date(el.event.deadlinedateTime).toISOString();
      }
      myEvents.push(event);
    } 
  })

  // const myEvent: EventInput[] = appData.map( (el) => {
  //   return  {
  //     id:
  //   }
  // })

  console.log('Appdata: ', appData);
  const [ weekendsVisible, setWeekendsVidible] = useState<boolean>(true); 
  const [ currentEvents, setcurrentEvents] = useState<EventApi[]>([]); 


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
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          firstDay={1}
          initialView='dayGridMonth'
          editable={true}
          selectable={true}
          selectMirror={true}
          // dayMaxEventRows={true}
          dayMaxEvents={2}
          weekends={weekendsVisible}
          initialEvents={myEvents} // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
        />
      </div>
    </div>
  )
}


function renderSidebarEvent(event: EventApi) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start!, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
      <i>{event.title}</i>
    </li>
  )
}


function renderEventContent(eventContent: EventContentArg) {
  return (
    <>
      <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i>
    </>
  )
}


export default Calendar;


// export default class  Calendar extends React.Component<Props> {

//   state: CalendarState = {
//     weekendsVisible: true,
//     currentEvents: []
//   }

//   render() {
//     return (
//       <div className='demo-app'>
//         {/* {this.renderSidebar()} */}
//         <div className='demo-app-main'>
//           <FullCalendar
//             plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//             headerToolbar={{
//               left: 'prev,next today',
//               center: 'title',
//               right: 'dayGridMonth,timeGridWeek,timeGridDay'
//             }}
//             firstDay={1}
//             initialView='dayGridMonth'
//             editable={true}
//             selectable={true}
//             selectMirror={true}
//             // dayMaxEventRows={true}
//             dayMaxEvents={2}
//             weekends={this.state.weekendsVisible}
//             initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
//             select={this.handleDateSelect}
//             eventContent={renderEventContent} // custom render function
//             eventClick={this.handleEventClick}
//             eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
//             /* you can update a remote database when these fire:
//             eventAdd={function(){}}
//             eventChange={function(){}}
//             eventRemove={function(){}}
//             */
//           />
//         </div>
//       </div>
//     )
//   }

//   renderSidebar() {
//     return (
//       <div className='demo-app-sidebar'>
//         <div className='demo-app-sidebar-section'>
//           <h2>Instructions</h2>
//           <ul>
//             <li>Select dates and you will be prompted to create a new event</li>
//             <li>Drag, drop, and resize events</li>
//             <li>Click an event to delete it</li>
//           </ul>
//         </div>
//         <div className='demo-app-sidebar-section'>
//           <label>
//             <input
//               type='checkbox'
//               checked={this.state.weekendsVisible}
//               onChange={this.handleWeekendsToggle}
//             ></input>
//             toggle weekends
//           </label>
//         </div>
//         <div className='demo-app-sidebar-section'>
//           <h2>All Events ({this.state.currentEvents.length})</h2>
//           <ul>
//             {this.state.currentEvents.map(renderSidebarEvent)}
//           </ul>
//         </div>
//       </div>
//     )
//   }

//   handleWeekendsToggle = () => {
//     this.setState({
//       weekendsVisible: !this.state.weekendsVisible
//     })
//   }

//   handleDateSelect = (selectInfo: DateSelectArg) => {
//     let title = prompt('Please enter a new title for your event')
//     let calendarApi = selectInfo.view.calendar

//     calendarApi.unselect() // clear date selection

//     if (title) {
//       calendarApi.addEvent({
//         id: createEventId(),
//         title,
//         start: selectInfo.startStr,
//         end: selectInfo.endStr,
//         allDay: selectInfo.allDay
//       })
//     }
//   }

//   handleEventClick = (clickInfo: EventClickArg) => {
//     if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
//       clickInfo.event.remove()
//     }
//   }

//   handleEvents = (events: EventApi[]) => {
//     this.setState({
//       currentEvents: events
//     })
//   }

// }

// function renderSidebarEvent(event: EventApi) {
//   return (
//     <li key={event.id}>
//       <b>{formatDate(event.start!, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
//       <i>{event.title}</i>
//     </li>
//   )
// }

// function renderEventContent(eventContent: EventContentArg) {
//   return (
//     <>
//       <b>{eventContent.timeText}</b>
//       <i>{eventContent.event.title}</i>
//     </>
//   )
// }

