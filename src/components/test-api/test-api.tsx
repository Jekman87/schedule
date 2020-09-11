import React from 'react';
import ApiService from '../../services/api-service';

function TestApi() {
  const api = new ApiService();

  const newEvent = {
    name: 'Event name',
    description: 'Long diescription',
    descriptionUrl: 'wtf url',
    type: 'test',
    timeZone: 'Minsk',
    dateTime: '11.09.20 20:00',
    place: 'online',
    comment: 'no comments'
  };

  const newEvent2 = {
    name: 'Event name 2',
    description: 'Long diescription 2',
    descriptionUrl: 'wtf url 2',
    type: 'test 2',
    timeZone: 'Minsk',
    dateTime: '11.09.20 20:00',
    place: 'offline',
    comment: 'no comments 2'
  };

  const newEvent3 = {
    name: 'Event name 2',
    description: 'Long diescription 2',
    descriptionUrl: 'wtf url 2',
    type: 'test 2',
    timeZone: 'Minsk',
    dateTime: '11.09.20 20:00',
    place: 'offline',
    comment: 'no comments 2',
    newProp: 'help me',
    superNewProp: 'superNewProp'
  };

  const newEvent4 = {
    name: 'Event name 5',
    description: 'Long diescription4',
    descriptionUrl: 'wtf url 4',
    superNewProp: 'superNewProp'
  };

  const eventId = 'D2eBAtCK5C7Chn61TiQJ';

  const getAllEvents = () => api.getAllEvents().then((data) => console.log(data));
  const createEvent = (newEvent: object) => api.createEvent(newEvent).then((data) => console.log(data));
  const getEventById = (id: string) => api.getEventById(id).then((data) => console.log(data));
  const updateEvent = (id: string, newEvent: object) => api.updateEvent(id, newEvent).then((data) => console.log(data));
  const deleteEvent = (id: string) => api.deleteEvent(id).then((data) => console.log(data));

  const newOrganizer = {
    name: 'My name is Vasia'
  };

  const newOrganizer1 = {
    name: 'My name is Petia'
  };

  const organizerId = 'dRvRbZZd4Z22WZBdhVu4';

  const getAllOrganizers = () => api.getAllOrganizers().then((data) => console.log(data));
  const createOrganizer = (newOrganizer: object) => api.createOrganizer(newOrganizer).then((data) => console.log(data));
  const getOrganizerById = (id: string) => api.getOrganizerById(id).then((data) => console.log(data));
  const updateOrganizer = (id: string, newEvent: object) => api.updateOrganizer(id, newEvent).then((data) => console.log(data));
  const deleteOrganizer = (id: string) => api.deleteOrganizer(id).then((data) => console.log(data));

  return (
    <>
      <div className="test-ape">TestApi</div>
      <button onClick={getAllEvents}>getAllEvents</button>
      <button onClick={() => createEvent(newEvent3)}>createEvent</button>
      <button onClick={() => getEventById(eventId)}>getEventById</button>
      <button onClick={() => updateEvent(eventId, newEvent4)}>updateEvent</button>
      <button onClick={() => deleteEvent(eventId)}>deleteEvent</button>
      <br/>
      <button onClick={getAllOrganizers}>getAllOrganizers</button>
      <button onClick={() => createOrganizer(newOrganizer)}>createOrganizer</button>
      <button onClick={() => getOrganizerById(organizerId)}>getOrganizerById</button>
      <button onClick={() => updateOrganizer(organizerId, newOrganizer1)}>updateOrganizer</button>
      <button onClick={() => deleteOrganizer(organizerId)}>deleteOrganizer</button>
    </>
  );
}

export default TestApi;
