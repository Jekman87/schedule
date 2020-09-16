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
} from 'antd';
import ApiService from '../../services/api-service';

import './editWindow.scss';

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { TextArea } = Input;


const EditWindow: React.FunctionComponent = () => {
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

  const FORM: any = (
    <div>
      <Title level={3}>Add new task</Title>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
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
            <Select.Option key={"Markup-task"} value={"Markup-task"}>Markup-task</Select.Option>
            <Select.Option key={"Js-task"} value={"Js-task"}>Js-task</Select.Option>
            <Select.Option key={"Git-task"} value={"Git-task"}>Git-task</Select.Option>
            <Select.Option key={"Codewars-task"} value={"Codewars-task"}>Codewars-task</Select.Option>
            <Select.Option key={"Other"} value={"Other"}>Other</Select.Option>
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
      </Form>
    </div>
  )

  return (
    <div className='editWindow'>
      {FORM}
    </div>
  );
}
export default EditWindow;