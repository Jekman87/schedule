import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  // Cascader,
  DatePicker,
  // InputNumber,
  // Switch,
  Typography,
  Modal,
} from 'antd';
import ApiService from '../../services/api-service';
import { templateModalWindow } from '../editWindow/template';
import './editWindow.scss';

const { Title } = Typography;
const { RangePicker } = DatePicker;
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
  const api = new ApiService();
  const getAllEvents = () => api.getAllEvents().then((data) => console.log(data));
  const createEvent = (newEvent: object) => api.createEvent(newEvent).then((data) => console.log(data));

  function dataUpdate() {
    let arrayEvents = getAllEvents();
    arrayEvents += objEvent;
    return arrayEvents;
  }

  const [newName, setNewName] = useState('');

  const [newDescription, setNewDescription] = useState('');
  const [newType, setNewType] = useState('');
  const [newPlace, setNewPlace] = useState('');
  const [newComment, setNewComment] = useState('');
  // const [newStartTask, setNewStartTask] = useState('');
  // const [newDedlineTask, setNewDedlineTask] = useState('');
  const [loading, setLoadint] = useState(false);
  const [visible, setVisible] = useState(true);



  const objEvent: any = {
    name: newName,
    key: newName + new Date(),
    description: newDescription,
    type: newType,
    place: newPlace,
    comment: newComment,
    startTask: "start date",
    dedlineTask: "dedline",
  }

  const handleOk: any = () => {
    setLoadint(true);
  };

  const handleCancel: any = () => {
    setVisible(false);
  };


  const FORM: any = (
    <Modal
      visible={visible}
      title="Title"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
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
      {/* <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        layout="vertical"
        className='editWindow-form'
      >
        <Form.Item label="Title new task">
          <Input
            value={newName}
            onChange={(el) => setNewName((el.target as HTMLInputElement).value)}
          />
        </Form.Item>
        <Form.Item label="Type task">
          <Select onChange={(e) => setNewType(e as HTMLSelectElement["value"])}>
            <Select.Option key={"jstask"} value={"jstask"}>Jstask</Select.Option>
            <Select.Option key={"kotlintask"} value={"kotlintask"}>Kotlintask</Select.Option>
            <Select.Option key={"objctask"} value={"objctask"}>Objctask</Select.Option>
            <Select.Option key={"htmltask"} value={"htmltask"}>Htmltask</Select.Option>
            <Select.Option key={"cv:markdown"} value={"cv:markdown"}>Cv:markdown</Select.Option>
            <Select.Option key={"cv:html"} value={"cv:html"}>Cv:html</Select.Option>
            <Select.Option key={"selfeducation"} value={"selfeducation"}>Selfeducation</Select.Option>
            <Select.Option key={"codewars"} value={"codewars"}>Codewars</Select.Option>
            <Select.Option key={"codewars:stage1"} value={"codewars:stage1"}>Codewars:stage1</Select.Option>
            <Select.Option key={"codewars:stage2"} value={"codewars:stage2"}>Codewars:stage2</Select.Option>
            <Select.Option key={"test"} value={"test"}>Test</Select.Option>
            <Select.Option key={"interview"} value={"interview"}>Interview</Select.Option>
            <Select.Option key={"stage-interview"} value={"stage-interview"}>Stage-interview</Select.Option>
            <Select.Option key={"codejam"} value={"codejam"}>Codejam</Select.Option>
          </Select>
        </Form.Item>


        <Form.Item label="Task completion period">
          <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>
        <Form.Item label="Link to GitHub">
          <Input
            value={newPlace}
            onChange={(el) => setNewPlace((el.target as HTMLInputElement).value)} />
        </Form.Item>
        <Form.Item label="Description">
          <TextArea
            placeholder="Autosize height with minimum and maximum number of lines"
            autoSize
            value={newDescription}
            onChange={(el) => setNewDescription((el.target as HTMLTextAreaElement).value)}
          />
        </Form.Item>
        <Form.Item label="Сomment">
          <TextArea
            placeholder="Autosize height with minimum and maximum number of lines"
            autoSize
            value={newComment}
            onChange={(el) => setNewComment((el.target as HTMLTextAreaElement).value)}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" onClick={() => {
            dataUpdate();
            createEvent(objEvent)
          }}>Save data</Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary">Preview</Button>
        </Form.Item>
      </Form> */}
      <Form layout="vertical">
        {templateModalWindow[0].template.stage && <Form.Item label="Stage">
          <Select>
            <Select.Option value="1">1</Select.Option>
            <Select.Option value="2">2</Select.Option>
            <Select.Option value="3">3</Select.Option>
            <Select.Option value="4">4</Select.Option>
            <Select.Option value="4">5</Select.Option>
          </Select>

        </Form.Item>
        }
        {templateModalWindow[0].template.courese && <Form.Item label="Courese">
          <Input />
        </Form.Item>
        }
        {templateModalWindow[0].template.name && <Form.Item label="Name">
          <Input />
        </Form.Item>
        }
        {templateModalWindow[0].template.subname && <Form.Item label="Subname">
          <Input />
        </Form.Item>
        }
        {templateModalWindow[0].template.form && <Form.Item label="Form">
          <Select>
            <Select.Option value={"online"}>online</Select.Option>
            <Select.Option value={"offline"}>offline</Select.Option>
          </Select>
        </Form.Item>
        }
        {templateModalWindow[0].template.tags && <Form.Item label="Tags">
          <Select mode="tags">
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
        {templateModalWindow[0].template.kind && <Form.Item label="Kind">
          <Select>
            <Select.Option value={"basic"}>basic</Select.Option>
            <Select.Option value={"optional"}>optional</Select.Option>
          </Select>
        </Form.Item>
        }
        {templateModalWindow[0].template.step && <Form.Item label="Step">
          <Select>
            <Select.Option value={"start"}>start</Select.Option>
            <Select.Option value={"deadline"}>deadline</Select.Option>
            <Select.Option value={"review"}>review</Select.Option>
            <Select.Option value={"other"}>other</Select.Option>
          </Select>
        </Form.Item>
        }
        {templateModalWindow[0].template.place && <Form.Item label="Place">
          <Input />
        </Form.Item>
        }
        {templateModalWindow[0].template.start && <Form.Item label="Start">
          <RangePicker />
        </Form.Item>
        }
        {templateModalWindow[0].template.end && <Form.Item label="End">
          <RangePicker />
        </Form.Item>
        }
        {templateModalWindow[0].template.term && <Form.Item label="Term">
          <Select>
            <Select.Option value={"short"}>short</Select.Option>
            <Select.Option value={"long"}>long</Select.Option>
          </Select>
        </Form.Item>
        }
        {templateModalWindow[0].template.comment && <Form.Item label="Comment">
          <TextArea />
        </Form.Item>
        }
        {templateModalWindow[0].template.descriptionUrl && <Form.Item label="Description Url">
          <Input />
        </Form.Item>
        }
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
