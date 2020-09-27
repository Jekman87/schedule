import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Switch,
  Typography,
  Modal,
} from 'antd';
import OptionsObject from './options';
import { EventType } from '../../constants/interfaces';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import ApiService from '../../services/api-service';
import { templateModalWindow } from './template';
import './edit-window.scss';

const { Title } = Typography;
const { TextArea } = Input;



type Props = {
  settings: object,
  event: EventType | null,
  createEvent: (newEvent: object) => void,
  updateEvent: (id: string, newEvent: object) => void,
  deleteModalEvent: (id: string) => void,
  closeModal: (newEvent: object) => void,
}

const EditWindow = ({ settings, event, createEvent, updateEvent, deleteModalEvent, closeModal }: Props) => {
  const api = new ApiService();
  const getAllEvents = () => api.getAllEvents().then((data) => console.log(data));

  function dataUpdate() {
    let arrayEvents = getAllEvents();
    arrayEvents += objEvent;
    return arrayEvents;
  }


  const materialLinks: any = [];
  const materialImage: any = [];
  const materialVideo: any = [];
  const arrayOrganizers: any = [];

  const defaultState = {
    newName: '',
    newType: '',
    newForm: '',
    newPlace: '',
    newKind: '',
    newTags: [],
    newDateTime: {},
    newDescription: '',
    newDescriptionUrl: '',
    newEventUrl: '',
    newDedlineDateTime: {},
    newDeadlineDescription: '',
    newOrganizer: [],
    newDuration: '',
    newComment: '',
    newIsFeedback: false,
    newFeedback: false,
    newMaterials: {
      video: [],
      image: [],
      links: [],
    },
    newStage: '',
  }


  const [globalStateModalWindow, setGlobalStateModalWindow] = useState(defaultState);

  const [isDisabled, setDisabled] = useState(false);
  const [isNewType, setIsNewType] = useState(false);

  // const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);

  const [currentType, setCurrentType] = useState({
    name: true,
    type: true,
    form: true,
    place: true,
    kind: true,
    tags: true,
    dateTime: true,
    description: true,
    descriptionUrl: true,
    eventURL: true,
    deadlinedateTime: true,
    deadlineDescription: true,
    organizer: true,
    duration: true,
    comment: true,
    isFeedback: true,
    feedback: true,
    materials: true,
    stage: true,
  }
  );

  const objEvent: any = {
    // key: newName + new Date(),
    name: globalStateModalWindow.newName,
    type: globalStateModalWindow.newType,
    form: globalStateModalWindow.newForm,
    place: globalStateModalWindow.newPlace,
    kind: globalStateModalWindow.newKind,
    tags: globalStateModalWindow.newTags,
    dateTime: globalStateModalWindow.newDateTime,
    description: globalStateModalWindow.newDescription,
    descriptionUrl: globalStateModalWindow.newDescriptionUrl,
    eventURL: globalStateModalWindow.newEventUrl,
    deadlinedateTime: globalStateModalWindow.newDedlineDateTime,
    deadlineDescription: globalStateModalWindow.newDeadlineDescription,
    organizer: globalStateModalWindow.newOrganizer,
    duration: globalStateModalWindow.newDuration,
    comment: globalStateModalWindow.newComment,
    isFeedback: globalStateModalWindow.newIsFeedback,
    feedback: globalStateModalWindow.newFeedback,
    materials: globalStateModalWindow.newMaterials,
    stage: globalStateModalWindow.newStage,
  }

  const handleOk: any = () => {
    console.log(objEvent);
    dataUpdate();
    createEvent(objEvent);
  };

  const handleCancel: any = () => {
    setVisible(false);
    closeModal(objEvent);
  };

  const handleAdd: any = () => {
    setGlobalStateModalWindow({ ...globalStateModalWindow, newType: 'other' });
    for (let i: number = 0; i < templateModalWindow.length; i += 1) {
      if (templateModalWindow[i].key === "other") {
        const currentType = JSON.parse(JSON.stringify(templateModalWindow[i].template));
        currentType.type = true;
        setCurrentType(currentType);
      }
    }
    setDisabled(true);
    setIsNewType(true);
  }

  function getTaskStartDate(range: any) {
    const valueOfInput1 = new Date(range);

    setGlobalStateModalWindow({ ...globalStateModalWindow, newDateTime: valueOfInput1.getTime() })
    console.log(valueOfInput1.getTime());
  }

  function getTaskDedlineDate(range: any) {
    const valueOfInput1 = new Date(range);

    setGlobalStateModalWindow({ ...globalStateModalWindow, newDedlineDateTime: valueOfInput1.getTime() })

    console.log(valueOfInput1.getTime());
  }
  const typeBlock = () => {
    let form;
    if (isNewType === true) {
      form = (
        <>
          <Input onChange={(el) => {
            setGlobalStateModalWindow({ ...globalStateModalWindow, newType: (el.target as HTMLInputElement).value })
          }} />
        </>
      )
    }
    if (isNewType === false || globalStateModalWindow.newType === '') {
      form = (
        <>
          <Select onChange={(e) => {

            console.log(globalStateModalWindow.newIsFeedback);
            for (let i: number = 0; i < templateModalWindow.length; i += 1) {
              if (e === templateModalWindow[i].key) {
                const currentType = JSON.parse(JSON.stringify(templateModalWindow[i].template));
                setCurrentType(currentType);
              }
            }
            setGlobalStateModalWindow({ ...defaultState, newType: e as HTMLSelectElement["value"] });
          }
          }>{OptionsObject()}</Select>
        </>
      )
    }
    return form;
  }

  const FIELD_FORMS = (
    <>
      {
        currentType.name && <Form.Item label="Title new task">
          <Input
            value={globalStateModalWindow.newName}
            onChange={(el) => setGlobalStateModalWindow({ ...globalStateModalWindow, newName: (el.target as HTMLInputElement).value })}
          />
        </Form.Item>
      }
      {
        currentType.form && <Form.Item label="Form">
          <Select onChange={(e) => setGlobalStateModalWindow({ ...globalStateModalWindow, newForm: e as HTMLSelectElement["value"] })}>
            <Select.Option value={"online"}>online</Select.Option>
            <Select.Option value={"offline"}>offline</Select.Option>
          </Select>
        </Form.Item>
      }
      {
        currentType.place && <Form.Item label="Place">
          <Input onChange={(el) => setGlobalStateModalWindow({ ...globalStateModalWindow, newPlace: (el.target as HTMLInputElement).value })} />
        </Form.Item>
      }
      {
        currentType.kind && <Form.Item label="Kind">
          <Select onChange={(e) => setGlobalStateModalWindow({ ...globalStateModalWindow, newKind: e as HTMLSelectElement["value"] })}>
            <Select.Option value={"basic"}>basic</Select.Option>
            <Select.Option value={"optional"}>optional</Select.Option>
          </Select>
        </Form.Item>
      }
      {
        currentType.tags && <Form.Item label="Tags">
          <Select
            mode="tags"
            value={globalStateModalWindow.newTags}
            onChange={(e) => setGlobalStateModalWindow({ ...globalStateModalWindow, newTags: e })}>
            <Select.Option value={"html"}>html</Select.Option>
            <Select.Option value={"css"}>css</Select.Option>
            <Select.Option value={"js"}>js</Select.Option>
            <Select.Option value={"markdown"}>markdown</Select.Option>
            <Select.Option value={"git"}>git</Select.Option>
            <Select.Option value={"github"}>github</Select.Option>
            <Select.Option value={"web"}>web</Select.Option>
            <Select.Option value={"other"}>other</Select.Option>
          </Select>
        </Form.Item>
      }
      {
        currentType.dateTime && <Form.Item label="Date Time">
          <DatePicker showTime onChange={getTaskStartDate} />
        </Form.Item>
      }
      {
        currentType.description && <Form.Item label="Description">
          <TextArea onChange={(el) => setGlobalStateModalWindow({ ...globalStateModalWindow, newDescription: (el.target as HTMLTextAreaElement).value })} />
        </Form.Item>
      }
      {
        currentType.descriptionUrl && <Form.Item label="Description Url">
          <Input onChange={(el) => setGlobalStateModalWindow({ ...globalStateModalWindow, newDescriptionUrl: (el.target as HTMLInputElement).value })} />
        </Form.Item>
      }
      {
        currentType.eventURL && <Form.Item label="Event URL">
          <Input onChange={(el) => setGlobalStateModalWindow({ ...globalStateModalWindow, newEventUrl: (el.target as HTMLInputElement).value })} />
        </Form.Item>
      }
      {
        currentType.deadlinedateTime && <Form.Item label="Deadline date">
          <DatePicker showTime onChange={getTaskDedlineDate} />
        </Form.Item>
      }
      {
        currentType.deadlineDescription && <Form.Item label="DeadlineDescription">
          <TextArea onChange={(el) => setGlobalStateModalWindow({ ...globalStateModalWindow, newDeadlineDescription: (el.target as HTMLTextAreaElement).value })} />
        </Form.Item>
      }
      {
        currentType.organizer && <Form.Item label="Organizer">
          <Input onChange={(el) => {
            const link = (el.target as HTMLInputElement).value.trim();
            arrayOrganizers.push(link);
            setGlobalStateModalWindow({ ...globalStateModalWindow, newOrganizer: arrayOrganizers })
          }} />
        </Form.Item>
      }
      {
        currentType.duration && <Form.Item label="Duration">
          <Input onChange={(el) => setGlobalStateModalWindow({ ...globalStateModalWindow, newDuration: (el.target as HTMLInputElement).value })} />
        </Form.Item>
      }
      {
        currentType.comment && <Form.Item label="Comment">
          <TextArea onChange={(el) => setGlobalStateModalWindow({ ...globalStateModalWindow, newComment: (el.target as HTMLTextAreaElement).value })} />
        </Form.Item>
      }
      {
        currentType.descriptionUrl && <Form.Item label="IsFeedback">
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}

            onChange={(checked) => {
              setGlobalStateModalWindow({ ...globalStateModalWindow, newIsFeedback: checked })
              setGlobalStateModalWindow({ ...globalStateModalWindow, newFeedback: checked })
              console.log(checked);
              return;
            }
            }
          />
        </Form.Item>
      }
      {
        globalStateModalWindow.newIsFeedback && currentType.isFeedback && <Form.Item label="Feedback">
          <Form.Item label="User name:">
            <Input />
          </Form.Item>
          <Form.Item label="Text:">
            <TextArea />
          </Form.Item>
        </Form.Item>
      }
      {
        currentType.materials &&
        <Form.Item label="Materials:">
          <Form.Item label="Add image">
            <Input onChange={(el) => {
              const link = (el.target as HTMLInputElement).value.trim();
              materialImage.push(link);
              setGlobalStateModalWindow({
                ...globalStateModalWindow, newMaterials: {
                  ...globalStateModalWindow.newMaterials,
                  image: materialImage
                }
              })
            }} />
          </Form.Item>
          <Form.Item label="Add Video">
            <Input onChange={(el) => {
              const link = (el.target as HTMLInputElement).value.trim();
              materialVideo.push(link);
              setGlobalStateModalWindow({
                ...globalStateModalWindow, newMaterials: {
                  ...globalStateModalWindow.newMaterials, video: materialVideo
                }
              })
            }} />
          </Form.Item>
          <Form.Item label="Add link">
            <Input onChange={(el) => {
              const link = (el.target as HTMLInputElement).value.trim();
              materialLinks.push(link);
              setGlobalStateModalWindow({
                ...globalStateModalWindow, newMaterials: {
                  ...globalStateModalWindow.newMaterials,
                  links: materialLinks
                }
              })
            }} />
          </Form.Item>
        </Form.Item>
      }
      {
        currentType.stage && <Form.Item label="Stage">
          <Select onChange={(e) => setGlobalStateModalWindow({ ...globalStateModalWindow, newStage: e as HTMLSelectElement["value"] })}>
            <Select.Option key={"stage" + 1} value="1">1</Select.Option>
            <Select.Option key={"stage" + 2} value="2">2</Select.Option>
            <Select.Option key={"stage" + 3} value="3">3</Select.Option>
            <Select.Option key={"stage" + 4} value="4">4</Select.Option>
            <Select.Option key={"stage" + 5} value="4">5</Select.Option>
          </Select>
        </Form.Item>
      }
    </>
  )


  const FORM: any = (
    <Modal
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={"60vw"}
      footer={[
        <Button
          key="new type task"
          onClick={handleAdd}
          disabled={isDisabled}>
          Add new type task
  </Button>,
        <Button
          key="back"
          onClick={handleCancel}>
          Return
      </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleOk}>
          Submit
      </Button>,
      ]}>
      <Title level={3}>Add new task</Title>
      <Form
        layout="vertical"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}

        className='editWindow-form'>
        <Form.Item label="Type task">
          {typeBlock()}
          {globalStateModalWindow.newType !== '' && FIELD_FORMS}
        </Form.Item>
      </Form>
    </Modal >
  )

  return (
    <div className='editWindow'>
      {FORM}
    </div>
  );
}
export default EditWindow;
