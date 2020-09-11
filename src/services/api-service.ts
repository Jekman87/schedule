export default class ApiService {

  _apiBase = 'https://rs-react-schedule.firebaseapp.com/api/team/team10';

  getAllData = async (url: string) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Server error, received ${res.status}`)
    }

    return await res.json();
  };

  createData = async (url: string, data: object) => {
    const res = await fetch(`${this._apiBase}${url}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`Server error, received ${res.status}`)
    }

    return await res.json();
  };

  getDataById = async (url: string, id: string) => {
    const res = await fetch(`${this._apiBase}${url}${id}`);

    if (!res.ok) {
      throw new Error(`Server error, received ${res.status}`)
    }

    return await res.json();
  };

  updateData = async (url: string, id: string, data: object) => {
    const res = await fetch(`${this._apiBase}${url}${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`Server error, received ${res.status}`)
    }

    return await res.json();
  };

  deleteData = async (url: string, id: string) => {
    const res = await fetch(`${this._apiBase}${url}${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Server error, received ${res.status}`)
    }

    return await res.json();
  };

  getAllEvents = async () => {
    return await this.getAllData(`/events`);
  };

  createEvent = async (newEvent: object) => {
    return await this.createData(`/event/`, newEvent);
  };

  getEventById = async (id: string) => {
    return await this.getDataById(`/event/`, id);
  };

  updateEvent = async (id: string, newEvent: object) => {
    return await this.updateData(`/event/`, id, newEvent);
  };

  deleteEvent = async (id: string) => {
    return await this.deleteData(`/event/`, id);
  };

  getAllOrganizers = async () => {
    return await this.getAllData(`/organizers`);
  };

  createOrganizer = async (newOrganizer: object) => {
    return await this.createData(`/organizer/`, newOrganizer);
  };

  getOrganizerById = async (id: string) => {
    return await this.getDataById(`/organizer/`, id);
  };

  updateOrganizer = async (id: string, newOrganizer: object) => {
    return await this.updateData(`/organizer/`, id, newOrganizer);
  };

  deleteOrganizer = async (id: string) => {
    return await this.deleteData(`/organizer/`, id);
  };
}
