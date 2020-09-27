import { Button, Badge, Card, Popover, Timeline, Row, Col, Tag, Divider } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react';
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
  FieldTimeOutlined,
  CalendarOutlined,
  LinkOutlined,
  FormOutlined
} from '@ant-design/icons';
import { red } from '@ant-design/colors';

const { Title, Text, Link, Paragraph } = Typography;

interface Props {
  event: any;
  settings: any;
  showEditWindow: any;
  deleteModalEvent: any;
  closeModal: any;
}

// ДОЛЖЕН ПРИХОДИТЬ ИВЕНТ В ПРОПСАХ

const InfoWindow: React.FunctionComponent<Props> = ({ event, closeModal, ...props }: Props) => {
  // const { event } = props;
  // const [visible, setVisible] = useState(true);
  const stage = event.stage === '' ? '' : ` Stage#${event.stage}`;


  console.log('info-window props', event, props);

  //  return <div></div>;

  return (
    // <div className="info-window">
    //    <div className="modal-window">
    //      <div className="ant-modal-content">
    //        <button onClick={() => closeModal()} type="button" aria-label="Close" className="ant-modal-close">
    //          <span className="ant-modal-close-x">
    //            <span role="img" aria-label="close" className="anticon anticon-close ant-modal-close-icon">
    //              <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true">
    //                <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z">
    //                </path>
    //              </svg>
    //            </span>
    //          </span>
    //        </button>
    //        <div className="ant-modal-header">
    //          <div className="ant-modal-title">
    //           RSS {event.course}{stage}
    //          </div>
    //        </div>
    //        <div className="ant-modal-body">
    //          <p className="ant-modal-title">TASKS NOT COMPLETED</p>
    //          <div className="ant-table-wrapper">
    //            <div className="ant-spin-nested-loading">
    //              <div className="ant-spin-container">
    //                {/* {event} */}
    //              </div>
    //            </div>
    //          </div>
    //        </div>
    //      </div>
    //   </div>
    // </div>



    <Modal
      title={`RSS ${event.course}${stage}`}
      centered
      visible={true}
      onCancel={closeModal}
      footer={null}
      keyboard={true}
      bodyStyle={{ backgroundColor: '#ffe7e3', }}
      //bodyStyle= здесь функция которая навешивает цсс свойства в зависимости от типа ивента
      width={"80%"}
    >
      <Badge.Ribbon text={event.form} color={'#45e21e'}>
        <Card bordered={false} style={{ backgroundColor: 'transparent', }}><Title level={2}>
          {/* здесь выбрать иконку в зав от типа ивента */}
          <Popover content={event.type} title="event type">
            {event.type === 'test' ? (
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
                          )}
          </Popover>
          {event.name}
        </Title>
        </Card>
      </Badge.Ribbon>

      <Row justify="space-between">
        <Col span={12}>
          <Paragraph className="modal-font">
            <span className="icon start-icon"><CalendarOutlined /></span>
            <i>start: </i><strong>{event.dateTime}</strong>
          </Paragraph>
          <Paragraph type="danger" className="modal-font">
            <span className="icon deadline-icon"><CalendarOutlined /></span>
            <i>deadline: </i><strong>{event.deadlinedateTime}</strong>
          </Paragraph>
          <Paragraph className="modal-font">
            <span className="icon usual-icon"><ClockCircleOutlined /></span>
            <i>it can take you about </i><strong>{event.duration}</strong>
          </Paragraph>
          <Paragraph className="modal-font">
            <span className="icon usual-icon"><UserOutlined /></span>
            <i>organizer: </i><span>{event.organizer}</span>
          </Paragraph>
          {/* <Timeline mode={"left"}>
            <Timeline.Item color='green' label={event.dateTime}>Start</Timeline.Item>
            <Timeline.Item color='red' dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />} label={event.deadlinedateTime}>Deadline</Timeline.Item>
          </Timeline> */}
        </Col>
        <Col span={8}>
          <Paragraph className="modal-font"><i>kind:</i> <span>{event.kind}</span></Paragraph>
          <Paragraph className="modal-font"><i>type:</i> <span>{event.type}</span></Paragraph>
          <Paragraph className="modal-font"><i>form:</i> <span>{event.form}</span></Paragraph>
          <Popover placement="bottomLeft" content={<Link href={event.eventURL} target="_blank">{event.eventURL}</Link>} trigger="hover">
            <Paragraph className="modal-font">
              <Link className="modal-font" href={event.eventURL} target="_blank">
                <span className="icon usual-icon"><LinkOutlined />
                </span>
                link to event
                </Link>
            </Paragraph>
          </Popover>

          {/* <Link href={event.eventURL} target="_blank">
            <span className="icon duration-icon"><LinkOutlined /></span>link to event
          </Link> */}
        </Col>


        {/* <Col span={10}>
          <a href={event.eventURL}> link to event</a>
          <p>{event.description}</p>
          здесь нужно размапить массив тегов выбрать им иконку и цвет
          <Tag icon={< ClockCircleOutlined />} color="success">
            {event.tags}
          </Tag>
        </Col> */}
      </Row>
      <Row>
        <Typography>
          <Title level={3}>Description</Title>
          <Paragraph>
            <Tag icon={< ClockCircleOutlined />} color="success">
              {event.tags}
            </Tag>
          </Paragraph>
          <Paragraph className="modal-font">
            {event.description}

          </Paragraph>
          <Paragraph className="modal-font"><Link className="modal-font" href={event.descriptionUrl} target="_blank">
            <span className="icon usual-icon"><LinkOutlined /></span>link to description
          </Link>
          </Paragraph>
          <Title level={4}>Materials:</Title>
          {/* <Paragraph className="modal-font"><Link className="modal-font" href={event.materials.links[0].link} target="_blank">
            <span className="icon duration-icon"><LinkOutlined /></span>{event.materials.links[0].discription}
          </Link>
          </Paragraph> */}
        </Typography>
      </Row>

      <Row>
        <Typography>
          <Title level={3}>Description of Deadline</Title>
          <Paragraph className="modal-font">
            {event.deadlineDescription}
          </Paragraph>
        </Typography>
      </Row>
      <Row>
        <Typography>
          <div className="feedback-title-wrapper">
            <Title className="feedback-title" level={3}>Feedback </Title>
            <Button type="primary" icon={<FormOutlined />} size='large' />
          </div>
          <Paragraph className="modal-font">
            {event.deadlineDescription}
          </Paragraph>
        </Typography>
      </Row>


      {/* <div>dateTime {event.dateTime}</div>
      <div>deadlinedateTime {event.deadlinedateTime}</div>
      <div>eventURL {event.eventURL}</div>
      <div>description{event.description}</div>
      <div>descriptionUrl{event.descriptionUrl}</div>
      <div> duration {event.duration}</div>
      <div>form {event.form}</div>
      <div>kind {event.kind}</div>
      {/* <div>{event.material.links[0].link}{event.material.links[0].description}</div>
        <div>{event.material.video[0].link}{event.material.video[0].description}</div>
        <div>{event.material.image[0].description}<img src={event.material.image[0].link} /></div> */}
      {/* <div>organizer {event.organizer}</div>
      <div>type {event.type}</div>
      <div>tags {event.tags}</div>
      <p>feedback</p> */}





    </Modal>

  );
}

export default InfoWindow;
