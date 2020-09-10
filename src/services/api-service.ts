export default class ApiService {

  _apiBase = 'https://rs-react-schedule.firebaseapp.com/api/team/team10';

  /*
  /team/{teamId}/events Get events from the store
  /team/{teamId}/event Add a new event to the store
  /team/{teamId}/event/{eventId} Find event by ID
  /team​/{teamId}​/event​/{eventId} Update an existing event
  /team/{teamId}/event/{eventId} Delete event by ID
  /team/{teamId}/organizers Get organizers from the store
  /team/{teamId}/organizer Add a new organizer
  /team/{teamId}/organizer/{organizerId} Find organizer by ID
  /team/{teamId}/organizer/{organizerId} Update an existing organizer
  /team/{teamId}/organizer/{organizerId} Delete organizer by ID
  */

  getAllEvents = async () => {
    const res = await fetch(`${this._apiBase}/events `);

    if (!res.ok) {
      throw new Error(`Could not fetch events` +
        `, received ${res.status}`)
    }

    return await res.json();
  };



  // getResource = async (url: any) => {
  //   const res = await fetch(`${this._apiBase}${url}`);

  //   if (!res.ok) {
  //     throw new Error(`Could not fetch ${url}` +
  //       `, received ${res.status}`)
  //   }
  //   return await res.json();
  // };

  // getAllPeople = async () => {
  //   const res = await this.getResource(`/people/`);
  //   return res.results
  //     .map(this._transformPerson)
  //     .slice(0, 5);
  // };

  // getPerson = async (id: any) => {
  //   const person = await this.getResource(`/people/${id}/`);
  //   return this._transformPerson(person);
  // };

  // getAllPlanets = async () => {
  //   const res = await this.getResource(`/planets/`);
  //   return res.results
  //     .map(this._transformPlanet)
  //     .slice(0, 5);
  // };

  // getPlanet = async (id: any) => {
  //   const planet = await this.getResource(`/planets/${id}/`);
  //   return this._transformPlanet(planet);
  // };

  // getAllStarships = async () => {
  //   const res = await this.getResource(`/starships/`);
  //   return res.results
  //     .map(this._transformStarship)
  //     .slice(0, 5);
  // };

  // getStarship = async (id: any) => {
  //   const starship = await this.getResource(`/starships/${id}/`);
  //   return this._transformStarship(starship);
  // };

  // getPersonImage = ({ id }: any) => {
  //   return `${this._imageBase}/characters/${id}.jpg`
  // }

  // getStarshipImage = ({ id }: any) => {
  //   return `${this._imageBase}/starships/${id}.jpg`
  // }

  // getPlanetImage = ({ id }: any) => {
  //   return `${this._imageBase}/planets/${id}.jpg`
  // }

  // _extractId = (item: { url: { match: (arg0: RegExp) => any[]; }; }) => {
  //   const idRegExp = /\/([0-9]*)\/$/;
  //   return item.url.match(idRegExp)[1];
  // };

  // _transformPlanet = (planet: { name: any; diameter: any; gravity: any; orbital_period: any; population: any; terrain: any; climate: any; rotation_period: any; }) => {
  //   return {
  //     id: this._extractId(planet),
  //     name: planet.name,
  //     diameter: planet.diameter,
  //     gravity: planet.gravity,
  //     orbitalPeriod: planet.orbital_period,
  //     population: planet.population,
  //     terrain: planet.terrain,
  //     climate: planet.climate,
  //     rotationPeriod: planet.rotation_period,
  //   };
  // };

  // _transformStarship = (starship: { name: any; model: any; manufacturer: any; cost_in_credits: any; length: any; crew: any; passengers: any; cargo_capacity: any; }) => {
  //   return {
  //     id: this._extractId(starship),
  //     name: starship.name,
  //     model: starship.model,
  //     manufacturer: starship.manufacturer,
  //     costInCredits: starship.cost_in_credits,
  //     length: starship.length,
  //     crew: starship.crew,
  //     passengers: starship.passengers,
  //     cargoCapacity: starship.cargo_capacity
  //   }
  // };

  // _transformPerson = (person: { name: any; gender: any; birth_year: any; eye_color: any; }) => {
  //   return {
  //     id: this._extractId(person),
  //     name: person.name,
  //     gender: person.gender,
  //     birthYear: person.birth_year,
  //     eyeColor: person.eye_color
  //   }
  // }
}
