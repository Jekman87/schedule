export interface LoadDataType {
  data: [] | EventType[]
  loading: boolean
  error: boolean
}

export interface AppEventType {
  event: EventType
  isDeadline: boolean
}

export interface SettingsType {
  workSpace: string
  role: string
  accessibility: boolean
  timeZone: string
  styles: object
  visibility: string
};

export interface ModalStateType {
  isShow: boolean
  eventData: EventType | null
}

export interface EventType {
  id?: string
  name: string
  type: string
  form: string
  place: string
  kind: string
  tags: [] | string[]
  dateTime: number
  description: string
  descriptionUrl: string
  eventURL: string
  deadlinedateTime: number
  deadlineDescription: string
  organizer: [] | string[]
  duration: string
  comment: string
  isFeedback: boolean
  feedback: [] | FeedbackType[]
  materials: [] | MaterialsType[]
  stage: string
  course: string
}

export interface FeedbackType {
  author: string
  text: string
}

export interface MaterialsType {
  links: [] | MaterialsElementType[]
  video: [] | MaterialsElementType[]
  images: [] | MaterialsElementType[]
}

export interface MaterialsElementType {
  link: string
  discription: string
}
