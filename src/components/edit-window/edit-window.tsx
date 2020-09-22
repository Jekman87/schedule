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
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
// import ApiService from '../../services/api-service';
import { templateModalWindow } from './template';
import './edit-window.scss';

const { Title } = Typography;
const { TextArea } = Input;



type Props = {
  settings: object,
  modalState: object,
  createModalEvent: (newEvent: object) => void,
  updateModalEvent: (newEvent: object) => void,
  deleteModalEvent: (newEvent: object) => void,
  closeModal: (newEvent: object) => void,
}




const EditWindow = ({ settings, modalState, createModalEvent, updateModalEvent, deleteModalEvent, closeModal }: Props) => {
  // const api = new ApiService();
  // const getAllEvents = () => api.getAllEvents().then((data) => console.log(data));
  // const createEvent = (newEvent: object) => api.createEvent(newEvent).then((data) => console.log(data));

  // function dataUpdate() {
  //   let arrayEvents = getAllEvents();
  //   arrayEvents += objEvent;
  //   return arrayEvents;
  // }

  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState('');
  const [newForm, setNewForm] = useState('');
  const [newPlace, setNewPlace] = useState('');
  const [newKind, setNewKind] = useState('');
  const [newTags, setNewTags] = useState('');
  const [newDateTime, setDateTime] = useState({});
  const [newDescription, setNewDescription] = useState('');
  const [newDescriptionUrl, setNewDescriptionURl] = useState('');
  const [newEventUrl, setNewEventUrl] = useState('');
  const [newDedlineDateTime, setNewDedlineTask] = useState({});
  const [newDeadlineDescription, setNewDeadlineDescription] = useState('');
  const [newOrganizer, setNewOrganizer] = useState('');
  const [newDuration, setNewDuration] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newIsFeedback, setIsNewFeedback] = useState(false);
  const [newFeedback, setNewFeedback] = useState('');
  const [newMaterials, setNewMaterials] = useState('');
  const [newStage, setNewstage] = useState('');
  const [newCourse, setNewCourse] = useState('');



  const [loading, setLoadint] = useState(false);
  const [visible, setVisible] = useState(true);


  const [currentType, setCurrentType] = useState({
    name: true, // *; mentor enters text in input
    type: true, // *; select
    form: true,
    place: true,
    kind: true, // *; select
    tags: true, // select | input | textarea
    dateTime: true,
    description: true, // mentor enters text in textarea
    descriptionUrl: true, // mentor enters text in input
    eventURL: true,
    deadlinedateTime: true,
    deadlineDescription: true,
    organizer: true, // *; mentor enters text in input; array strings
    duration: true, //? or number
    comment: true,
    isFeedback: true, // *; switcher
    feedback: true,
    materials: true, // {links: string | null, video: string | null, images: string | null}
    stage: true, // *; select
    course: true, // *; mentor enters text in input     
  }
  );

  const objEvent: any = {
    key: newName + new Date(),
    name: newName,
    type: newType,
    form: newForm,
    place: newPlace,
    kind: newKind,
    tags: newTags,
    dateTime: newDateTime,
    description: newDescription,
    descriptionUrl: newDescriptionUrl,
    eventURL: newEventUrl,
    deadlinedateTime: newDedlineDateTime,
    deadlineDescription: newDeadlineDescription,
    organizer: newOrganizer,
    duration: newDuration,
    comment: newComment,
    isFeedback: newIsFeedback,
    feedback: newFeedback,
    materials: newMaterials,
    stage: newStage,
    course: newCourse,
  }

  const handleOk: any = () => {
    console.log(objEvent);
    setLoadint(true);
  };

  const handleCancel: any = () => {
    setVisible(false);
  };

  function getTaskStartDate(range: any) {
    const valueOfInput1 = new Date(range);

    setDateTime(valueOfInput1.getTime());
    console.log(valueOfInput1.getTime());
  }

  function getTaskDedlineDate(range: any) {
    const valueOfInput1 = new Date(range);

    setNewDedlineTask(valueOfInput1.getTime());
    console.log(valueOfInput1.getTime());
  }

  const FIELD_FORMS = (
    <>
      {
        currentType.name && <Form.Item label="Title new task">
          <Input
            value={newName}
            onChange={(el) => setNewName((el.target as HTMLInputElement).value)}
          />
        </Form.Item>
      }
      {
        currentType.type && <Form.Item label="Type task">
          <Input
            value={newType}
            onChange={(el) => setNewType((el.target as HTMLInputElement).value)}
          />
        </Form.Item>
      }
      {
        currentType.form && <Form.Item label="Form">
          <Select onChange={(e) => setNewForm(e as HTMLSelectElement["value"])}>
            <Select.Option value={"online"}>online</Select.Option>
            <Select.Option value={"offline"}>offline</Select.Option>
          </Select>
        </Form.Item>
      }
      {
        currentType.place && <Form.Item label="Place">
          <Input onChange={(el) => setNewPlace((el.target as HTMLInputElement).value)} />
        </Form.Item>
      }
      {
        currentType.kind && <Form.Item label="Kind">
          <Select onChange={(e) => setNewKind(e as HTMLSelectElement["value"])}>
            <Select.Option value={"basic"}>basic</Select.Option>
            <Select.Option value={"optional"}>optional</Select.Option>
          </Select>
        </Form.Item>
      }
      {
        currentType.tags && <Form.Item label="Tags">
          <Select mode="tags" onChange={(e) => setNewTags(e as HTMLSelectElement["value"])}>
            {OptionsObject()}
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
          <TextArea onChange={(el) => setNewDescription((el.target as HTMLTextAreaElement).value)} />
        </Form.Item>
      }
      {
        currentType.descriptionUrl && <Form.Item label="Description Url">
          <Input onChange={(el) => setNewDescriptionURl((el.target as HTMLInputElement).value)} />
        </Form.Item>
      }
      {
        currentType.eventURL && <Form.Item label="Event URL">
          <Input onChange={(el) => setNewEventUrl((el.target as HTMLInputElement).value)} />
        </Form.Item>
      }
      {
        currentType.deadlinedateTime && <Form.Item label="Deadline date">
          <DatePicker showTime onChange={getTaskDedlineDate} />
        </Form.Item>
      }
      {
        currentType.deadlineDescription && <Form.Item label="DeadlineDescription">
          <TextArea onChange={(el) => setNewDeadlineDescription((el.target as HTMLTextAreaElement).value)} />
        </Form.Item>
      }
      {
        currentType.organizer && <Form.Item label="Organizer">
          <Input onChange={(el) => setNewOrganizer((el.target as HTMLInputElement).value)} />
        </Form.Item>
      }
      {
        currentType.duration && <Form.Item label="Duration">
          <Input onChange={(el) => setNewDuration((el.target as HTMLInputElement).value)} />
        </Form.Item>
      }
      {
        currentType.comment && <Form.Item label="Comment">
          <TextArea onChange={(el) => setNewComment((el.target as HTMLTextAreaElement).value)} />
        </Form.Item>
      }
      {
        currentType.descriptionUrl && <Form.Item label="IsFeedback">
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}

            onChange={(checked) => {
              setIsNewFeedback(checked);
              console.log(checked);
              return;
            }
            }
          />
        </Form.Item>
      }
      {
        newIsFeedback && currentType.isFeedback && <Form.Item label="Feedback">
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
            <Input />
          </Form.Item>
          <Form.Item label="Add Video">
            <Input />
          </Form.Item>
          <Form.Item label="Add link">
            <Input />
          </Form.Item>
        </Form.Item>
      }
      {
        currentType.stage && <Form.Item label="Stage">
          <Select onChange={(e) => setNewstage(e as HTMLSelectElement["value"])}>
            <Select.Option key={"stage" + 1} value="1">1</Select.Option>
            <Select.Option key={"stage" + 2} value="2">2</Select.Option>
            <Select.Option key={"stage" + 3} value="3">3</Select.Option>
            <Select.Option key={"stage" + 4} value="4">4</Select.Option>
            <Select.Option key={"stage" + 5} value="4">5</Select.Option>
          </Select>
        </Form.Item>
      }
      {
        currentType.course && <Form.Item label="Courese">
          <Input onChange={(el) => setNewCourse((el.target as HTMLInputElement).value)} />
        </Form.Item>
      }
    </>
  )


  const FORM: any = (
    <Modal
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={"90vw"}
      footer={[
        <Button key="new type task" onClick={handleCancel}>
          Add new type task
  </Button>,
        <Button key="back" onClick={handleCancel}>
          Return
      </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
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
          <Select onChange={(e) => {
            console.log(newIsFeedback);
            setNewType('');
            setNewType(e as HTMLSelectElement["value"]);
            for (let i: number = 0; i < templateModalWindow.length; i += 1) {
              if (e === templateModalWindow[i].key) {
                setCurrentType({
                  name: templateModalWindow[i].template.name,
                  type: templateModalWindow[i].template.type,
                  form: templateModalWindow[i].template.form,
                  place: templateModalWindow[i].template.place,
                  kind: templateModalWindow[i].template.kind,
                  tags: templateModalWindow[i].template.tags,
                  dateTime: templateModalWindow[i].template.dateTime,
                  description: templateModalWindow[i].template.description,
                  descriptionUrl: templateModalWindow[i].template.descriptionUrl,
                  eventURL: templateModalWindow[i].template.eventURL,
                  deadlinedateTime: templateModalWindow[i].template.deadlinedateTime,
                  deadlineDescription: templateModalWindow[i].template.deadlineDescription,
                  organizer: templateModalWindow[i].template.organizer,
                  duration: templateModalWindow[i].template.duration,
                  comment: templateModalWindow[i].template.comment,
                  isFeedback: templateModalWindow[i].template.isFeedback,
                  feedback: templateModalWindow[i].template.feedback,
                  materials: templateModalWindow[i].template.materials,
                  stage: templateModalWindow[i].template.stage,
                  course: templateModalWindow[i].template.course,
                });
              }
            }
          }
          }>
            {OptionsObject()}
          </Select>
          {newType !== '' && FIELD_FORMS}
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
