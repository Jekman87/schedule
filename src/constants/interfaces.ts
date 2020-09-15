export interface LoadDataType {
  appData: Array<EventType> | []
  loading: boolean
  error: boolean
}

export interface SettingsType {
  workSpace: string
  role: string
  accessibility: boolean
  timeZone: string
  styles: object
  visibility: string
};

export interface EventType {
  id?: string
  name: string
  subheading: string
  step: string
  type: string
  form: string
  eventURL: string
  place: string
  kind: string
  tags: string
  descriptionUrl: string
  timeZone: string
  dateTime: number,
  organizer: string
  term: string
  comment: string
  isFeedback: boolean
  feedback: object
  description: string
  materials: []
  stage: string
  course: string
}
