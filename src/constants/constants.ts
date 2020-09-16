const API_BASE = 'https://rs-react-schedule.firebaseapp.com/api/team/team10';

const WORK_SPACE = {
  table: 'Table',
  list: 'List',
  calendar: 'Calendar'
};

const ROLE = {
  student: 'Student',
  mentor: 'Mentor'
};

const TIME_ZONE = {
  london: {location: 'Europe/London', time: '+1'},
  warsaw: {location: 'Europe/Warsaw', time: '+2'},
  kiev: {location: 'Europe/Kiev', time: '+3'},
  minsk: {location: 'Europe/Minsk', time: '+3'},
  volgograd: {location: 'Europe/Volgograd', time: '+4'},
  yekaterinburg: {location: 'Europe/Yekaterinburg', time: '+5'},
  tbilisi: {location: 'Asia/Tbilisi', time: '+4'},
  tashkent: {location: 'Asia/Tashkent', time: '+5'}
}

const SCHEDULE_STORAGE_KEY = 'scheduleSettings';

export { API_BASE, WORK_SPACE, ROLE, TIME_ZONE, SCHEDULE_STORAGE_KEY };
