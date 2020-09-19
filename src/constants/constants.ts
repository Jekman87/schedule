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

const EVENT_CONFIG = {
  type: ['project task', 'js task', 'codewars', 'test', 'crosscheck', 'review', 'broadcast live', 'self education', 'meetup', 'interview', 'presentation', 'other',],
  form: ['online', 'offline',],
  kind: ['basic', 'optional',],
  tags: ['html', 'css', 'js', 'markdown', 'git', 'github', 'other', 'web',],
  organizer: [''],
  stage: ['1', '2', '3', '4', '5',],
  course: ['2020Q3',],
};

export { API_BASE, WORK_SPACE, ROLE, TIME_ZONE, SCHEDULE_STORAGE_KEY, EVENT_CONFIG };
