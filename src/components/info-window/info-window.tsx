import { Button, Badge, Card, Popover, Row, Col, Tag, Form, Input, Comment, List, Popconfirm, message } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import { Typography } from 'antd';
import './info-window.scss';
import {
  YoutubeOutlined,
  LaptopOutlined,
  TeamOutlined,
  QuestionOutlined,
  AudioOutlined,
  SearchOutlined,
  UserOutlined,
  NotificationOutlined,
  ClockCircleOutlined,
  ReadOutlined,
  CalendarOutlined,
  LinkOutlined,
  FormOutlined,
  HistoryOutlined,
  StopOutlined,
  EnvironmentOutlined,
  MessageOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { convertDateTime } from '../../helpers/utils';

const { Title, Link, Paragraph } = Typography;
const { TextArea } = Input;

interface Props {
  event: any;
  settings: any;
  showEditWindow: any;
  deleteModalEvent: any;
  closeModal: any;
  updateEvent: any;
}


interface commentData {
  author: string;
  content: any;
}

const InfoWindow: React.FunctionComponent<Props> = ({ updateEvent, deleteModalEvent, showEditWindow, settings, event, closeModal, ...props }: Props) => {

  const stage = event.stage === '' ? '' : ` Stage#${event.stage}`;

  const CreateLink = (link: any, text: any, key: number) => {
    return (
      <Popover key={key} placement="bottomLeft" content={<Link href={link} target="_blank">{link}</Link>} trigger="hover">
        <Paragraph className="modal-font">
          <Link className="modal-font" href={link} target="_blank">
            <span className="icon usual-icon"><LinkOutlined />
            </span>
            {text}
          </Link>
        </Paragraph>
      </Popover>
    );
  }

  const Feedback = () => {
    if (!event.isFeedback) {
      return (
        <Col span={24}>
          <div className="feedback-false deadline-icon"><StopOutlined /></div>
        </Col>
      );
    }
    const layout = {
      labelCol: { span: 6, md: { span: 5 }, xl: { span: 3 } },
      wrapperCol: { span: 24, xl: { span: 18 } },
    };
    const tailLayout = {
      wrapperCol: { offset: 0, sm: { offset: 6 }, md: { offset: 5 }, xl: { offset: 3, span: 18 }, span: 24 },
    };
    return (
      <Form
        {...layout}
        onFinish={(e) => {
          event.feedback.push(e);
          updateEvent(event.id, event);
        }}
      >
        <Form.Item
          label="Username"
          name="author"
          rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input placeholder="Enter your github (max 40 symbols)" maxLength={40} />
        </Form.Item>
        <Form.Item
          label="Your Feedback"
          name="text"
          rules={[{ required: true, message: 'Please input your feedback!' }]}>
          <TextArea placeholder="Your feedback (max 300 symbols)" maxLength={300} rows={4} autoSize={{ minRows: 2, maxRows: 6 }} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Add Feedback
          </Button>

        </Form.Item>

      </Form>
    )
  };

  const feedbackStudentElement = (settings.role === "Student") ? (
    <Row>
      <Typography>
        <Title className="feedback-title" level={3}><span className="icon usual-icon"><FormOutlined /></span>Feedback </Title>
      </Typography>
      <Col span={24}>
        <Feedback />
      </Col>
    </Row>
  ) : null;


  const data: commentData[] = event.feedback.map((el: any) => {
    return {
      author: el.author,
      content: (
        <p>
          {el.text}
        </p>
      ),
    }
  });


  const feedbacksArray = ((event.feedback.length > 0) && (settings.role === "Mentor")) ? (
    <>
      <Title className="feedback-title" level={3}><span className="icon usual-icon"><MessageOutlined /></span>Feedbacks </Title>
      <List
        className="comment-list"
        header={`${event.feedback.length} replies`}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <li>
            <Comment
              author={item.author}
              content={item.content}
            />
          </li>
        )}
      />
    </>
  ) : null;


  const confirm = (e: any, id: any) => {
    deleteModalEvent(id);
  }

  const cancel = (e: any) => {
    message.error('Canceled', 3);
  }

  const dateTimeParagraph = (event.dateTime > 0) ? (
    <Paragraph className="modal-font">
      <span className="icon start-icon"><CalendarOutlined /></span>
      <i>start: </i><strong> {convertDateTime(event.dateTime, false, settings.timeZone)}   <span className="start-icon"><ClockCircleOutlined /></span> {convertDateTime(event.dateTime, true, settings.timeZone)}</strong>
    </Paragraph>) : null;


  const deadlinedateTimeParagraph = (event.deadlinedateTime > 0) ? (
    <Paragraph type="danger" className="modal-font">
      <span className="icon deadline-icon"><CalendarOutlined /></span>
      <i>deadline: </i><strong>{convertDateTime(event.deadlinedateTime, false, settings.timeZone)}   <span><ClockCircleOutlined /> </span>{convertDateTime(event.deadlinedateTime, true, settings.timeZone)}</strong>
    </Paragraph>) : null;


  const durationParagraph = (event.duration) ? (<Paragraph className="modal-font">
    <span className="icon usual-icon"><HistoryOutlined /></span>
    <i>it can take you about </i><strong>{event.duration}</strong>
  </Paragraph>) : null;


  const organizerParagraph = (event.organizer.length > 0) ? (<Paragraph className="modal-font">
    <span className="icon usual-icon"><UserOutlined /></span>
    <i>organizer: </i><span>{event.organizer.join(', ')}</span>
  </Paragraph>) : null;


  const tagsParagraph = (event.tags.length > 0) ? (
    <Paragraph>
      {
        event.tags.map((el: any, ind: number) => {
          let color = "success"
          switch (el) {
            case 'js':
              color = 'geekblue';
              break;
            case 'git':
              color = 'cyan';
              break;
            case 'github':
              color = 'blue';
              break;
            case 'css':
              color = 'purple';
              break;
            case 'markdown':
              color = 'volcano';
              break;
            case 'html':
              color = 'magenta';
              break;
            case 'web':
              color = 'lime';
              break;
            default:
              color = 'pink';
              break;
          }
          return (
            <Tag color={color} key={ind}>
              {el}
            </Tag>
          );
        })
      }
    </Paragraph>) : null;


  const descriptionParagraph = (event.description) ? (
    <Paragraph className="modal-font">
      {event.description}
    </Paragraph>) : null;


  const descriptionUrlElement = (event.descriptionUrl) ? (CreateLink(event.descriptionUrl, 'link to description', 0)) : null;

  const materialsLinks: any[] = [];
  if (event.materials.links.length > 0) {
    event.materials.links.map((el: any) => materialsLinks.push(CreateLink(el.link, el.discription || 'link', materialsLinks.length)));
  }
  if (event.materials.video.length > 0) {
    event.materials.video.map((el: any) => materialsLinks.push(CreateLink(el.link, el.discription || 'link', materialsLinks.length)));
  }
  if (event.materials.images.length > 0) {
    event.materials.images.map((el: any) => materialsLinks.push(CreateLink(el.link, el.discription || 'link', materialsLinks.length)));
  }


  const materialsElement = (materialsLinks.length > 0) ? (
    <Row>
      <Typography>
        <Title level={4}>Materials:</Title>
        {materialsLinks}
      </Typography>
    </Row>) : null;


  const deadlineDescriptionElement = (event.deadlineDescription) ? (
    <Row>
      <Typography>
        <Title level={3}>Description of Deadline</Title>
        <Paragraph className="modal-font">
          {event.deadlineDescription}
        </Paragraph>
      </Typography>
    </Row>) : null;


  const kindElement = (event.kind) ?
    (<Paragraph className="modal-font"><i>kind:</i> <span>{event.kind}</span></Paragraph>) :
    null;
  const typeElement = (event.type) ?
    (<Paragraph className="modal-font"><i>type:</i> <span>{event.type}</span></Paragraph>) :
    null;
  const formElement = (event.form) ?
    (<Paragraph className="modal-font"><i>form:</i> <span>{event.form}</span></Paragraph>) :
    null;


  const placeElement = (event.place) ?
    (<Paragraph className="modal-font"><span className="icon usual-icon"><EnvironmentOutlined /></span><i>place:</i> <span>{event.place}</span></Paragraph>) :
    null;


  const eventURLElement = (event.eventURL) ? (CreateLink(event.eventURL, 'link to event', 0)) : null;

  const commentElement = (event.comment) ? (
    <Row>
      <Typography>
        <Title level={3}>Comment:</Title>
        <Paragraph className="modal-font">
          {event.comment}
        </Paragraph>
      </Typography>
    </Row>) : null;


  const badgeColor = (event.form === 'online') ? '#45e21e' : '#3c0058'
  const editButtons = (settings.role === 'Mentor') ? <><span className="edit-icon"><EditOutlined onClick={() => showEditWindow(event.id)} /></span>
    <Popconfirm
      title="Are you sure delete this task?"
      onConfirm={() => confirm('click', event.id)}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
    >
      <span className="edit-icon"><DeleteOutlined /></span>
    </Popconfirm></> : null;


  return (
    <Modal
      title={`RSS ${event.course}${stage}`}
      centered
      visible={true}
      onCancel={closeModal}
      footer={null}
      keyboard={true}
      bodyStyle={{ backgroundColor: '#ffe7e3', }}
    >
      <Badge.Ribbon text={event.form} color={badgeColor}>
        <Card bordered={false} style={{ backgroundColor: 'transparent', }}><Title level={2}>
          <Popover content={event.type} title="event type">
            <span className="event-icon">{event.type === 'test' ? (
              <QuestionOutlined />
            ) : event.type === 'crosscheck' || event.type === 'review' ? (
              <SearchOutlined />
            ) : event.type === 'broadcast live' ? (
              <YoutubeOutlined />
            ) : event.type === 'self education' ? (
              <ReadOutlined />
            ) : event.type === 'meetup' ? (
              <TeamOutlined />
            ) : event.type === 'interview' ? (
              <AudioOutlined />
            ) : event.type === 'presentation' ? (
              <NotificationOutlined />
            ) : (
                            <LaptopOutlined />
                          )}</span>
          </Popover>
          {event.name}
          {editButtons}
        </Title>
        </Card>
      </Badge.Ribbon>

      <Row justify="space-between">
        <Col xs={24} md={14}>

          {dateTimeParagraph}
          {deadlinedateTimeParagraph}
          {durationParagraph}
          {organizerParagraph}
        </Col>
        <Col xs={24} md={8}>
          {kindElement}
          {typeElement}
          {formElement}
          {placeElement}
          {eventURLElement}
        </Col>
      </Row>
      <Row>
        <Typography>
          <Title level={3}>Description</Title>
          {tagsParagraph}
          {descriptionParagraph}
          {descriptionUrlElement}
        </Typography>
      </Row>
      {deadlineDescriptionElement}
      {commentElement}
      {materialsElement}
      {feedbacksArray}
      {feedbackStudentElement}
    </Modal>
  );
}

export default InfoWindow;
