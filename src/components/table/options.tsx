import moment from 'moment';
import 'moment-timezone';

function convertDateToTime(timestamp: number, toTime?: boolean, timezone?: string): string {
  let time = moment(timestamp);

  if (timezone) {
    time.tz(timezone);
  }

  if (toTime) {
    return time.format('HH:mm:ss');
  }

  return time.format('DD-MM-YYYY');
}

const column_options = [
    {label: 'Course', value: 'Course'},
    {label: 'Stage', value: 'Stage'},
    {label: 'Date', value: 'Date', disabled: true},
    {label: 'Type', value: 'Type', disabled: true},
    {label: 'Form', value: 'Form'},
    {label: 'Name', value: 'Name', disabled: true},
    {label: 'Description', value: 'Description', disabled: true},
    {label: 'Duration', value: 'Duration'},
    {label: 'Organizer', value: 'Organizer'},
    {label: 'Place', value: 'Place'},
    {label: 'Comment', value: 'Comment'},
];

export { column_options, convertDateToTime };
