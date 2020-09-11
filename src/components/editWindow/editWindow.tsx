import React from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  Switch,
  Typography,
} from 'antd';

import './editWindow.scss';

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { TextArea } = Input;


function EditWindow() {
    return (
        <div className='editWindow'>
            <Title level={3}>Добавить задание</Title>
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            className='editWindow-form'
          >
            <Form.Item label="Название">
              <Input />
            </Form.Item>
            <Form.Item label="Тип">
              <Cascader
              
                options={[
                  {
                    value: 'task',
                    label: 'task',
                    children: [
                      {
                        value: 'markup-task',
                        label: 'markup-task',
                      },
                      {
                        value: 'js-task',
                        label: 'js-task',
                      },
                      {
                        value: 'git-task',
                        label: 'git-task',
                      },
                      {
                        value: 'codewars-task',
                        label: 'codewars-task',
                      },
                    ],
                  },
                  {
                      value: 'event',
                      label: 'event',
                        children: [
                        {
                            value: 'online',
                            label: 'online',
                        },
                        {
                            value: 'offline',
                            label: 'offline',
                        },
                    ],
                  },
                  {
                    value: 'lecture',
                    label: 'lecture',
                  },
                  {
                    value: 'test',
                    label: 'test',
                  }
                ]}
              />
            </Form.Item>
            <Form.Item label="Дата">
                <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
            <Form.Item label="Ссылка">
              <Input />
            </Form.Item>
            <Form.Item label="Комментарий">
                <TextArea
                    placeholder="Autosize height with minimum and maximum number of lines"
                    autoSize
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" block>Submit</Button>
            </Form.Item>
          </Form>
        </div>
      );
    
}

export default EditWindow;