import React  from 'react';
import FullCalendar, { EventClickArg, EventContentArg } from '@fullcalendar/react';
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

const Calendar: React.FunctionComponent<Props> = ({ settings, appData, showInfoWindow }) => {

  const eventsArray: EventInput[] = [];

  appData.forEach((el) => {
    if (!el.isDeadline) {
      const event: EventInput = {};
      event.id = el.event.id;
      event.title = el.event.name;
      event.start = new Date(el.event.dateTime);
      event.textColor = '#ffffff';
      event.classNames = [`type__${el.event.type.split(' ').join('-')}`]
      event.borderColor = '#00000038';
      event.display = 'block';
      if (el.event.deadlinedateTime !== 0) {
        event.end = new Date(el.event.deadlinedateTime);

      }
      eventsArray.push(event);
    } else {
      const event: EventInput = {};
      event.start = new Date(el.event.deadlinedateTime);
      event.allDay = true;
      event.backgroundColor = 'red';
      event.display = 'background';
      eventsArray.push(event);
    }
  })
  
  const handleEventClick = (clickInfo: EventClickArg) => {
    showInfoWindow(clickInfo.event._def.publicId);
  }

  return (
    <div className='calendar'>
      <div className='app-main'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, momentTimezonePlugin]}
          headerToolbar={{
            left: '',
            center: 'title',
            right: 'prev,next'
          }}
          timeZone={settings.timeZone}
          firstDay={1}
          initialView='dayGridMonth'
          editable={false}
          selectable={true}
          selectMirror={true}

          dayMaxEvents={5}
          weekends={true}
          events={eventsArray}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
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
      <span className="fc-event-time">{eventContent.timeText}</span>
      <span className="fc-event-title">{eventContent.event.title}</span>
    </>
  )
}


export default Calendar;
