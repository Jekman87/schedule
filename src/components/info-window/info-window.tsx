import { Button, Badge, Card, Popover, Timeline, Row, Col, Tag, Divider } from 'antd';
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
  HistoryOutlined
} from '@ant-design/icons';
import { convertDateTime } from '../../helpers/utils';

const { Title, Link, Paragraph } = Typography;

interface Props {
  event: any;
  settings: any;
  showEditWindow: any;
  deleteModalEvent: any;
  closeModal: any;
}

const InfoWindow: React.FunctionComponent<Props> = ({ settings, event, closeModal, ...props }: Props) => {
  
  const stage = event.stage === '' ? '' : ` Stage#${event.stage}`;

  const CreateLink = (link: any, text: any) => {

    return (
      <Popover placement="bottomLeft" content={<Link href={link} target="_blank">{link}</Link>} trigger="hover">
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

  console.log('info-window props', event, props);

  return (
    <Modal
      title={`RSS ${event.course}${stage}`}
      centered
      visible={true}
      onCancel={closeModal}
      footer={null}
      keyboard={true}
      bodyStyle={{ backgroundColor: '#ffe7e3', }}
      //bodyStyle= здесь функция которая навешивает цсс свойства в зависимости от типа ивента или попробовать навесить классы готовой функцией из апп
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
          {/* не рендерить этот параграф если нет даты старта */}
          <Paragraph className="modal-font">
            <span className="icon start-icon"><CalendarOutlined /></span>
            <i>start: </i><strong> {convertDateTime(event.dateTime, false, settings.timeZone)}   <span className="start-icon"><ClockCircleOutlined /></span> {convertDateTime(event.dateTime, true, settings.timeZone)}</strong>
          </Paragraph>
          {/* не рендерить этот параграф если нет даты дедлайна */}
          <Paragraph type="danger" className="modal-font">
            <span className="icon deadline-icon"><CalendarOutlined /></span>
            <i>deadline: </i><strong>{convertDateTime(event.deadlinedateTime, false, settings.timeZone)}   <span><ClockCircleOutlined /> </span>{convertDateTime(event.deadlinedateTime, true, settings.timeZone)}</strong>
          </Paragraph>
          {/* не рендерить этот параграф если нет дюрэйшн */}
          <Paragraph className="modal-font">
            <span className="icon usual-icon"><HistoryOutlined /></span>
            <i>it can take you about </i><strong>{event.duration}</strong>
          </Paragraph>
          {/* не рендерить этот параграф если нет орга, разсплитить и сджойнить имена  */}
          <Paragraph className="modal-font">
            <span className="icon usual-icon"><UserOutlined /></span>
            <i>organizer: </i><span>{event.organizer}</span>
          </Paragraph>
        </Col>
        <Col span={8}>
        {/* не рендерить этот параграф если нет, сделать 1 функцию на прием текста и параметра на эти 3 параграфа */}
          <Paragraph className="modal-font"><i>kind:</i> <span>{event.kind}</span></Paragraph>
          <Paragraph className="modal-font"><i>type:</i> <span>{event.type}</span></Paragraph>
          <Paragraph className="modal-font"><i>form:</i> <span>{event.form}</span></Paragraph>
          {/* не рендерить если нет, переделать на CreateLink  я ее уже написала */}
          <Popover placement="bottomLeft" content={<Link href={event.eventURL} target="_blank">{event.eventURL}</Link>} trigger="hover">
            <Paragraph className="modal-font">
              <Link className="modal-font" href={event.eventURL} target="_blank">
                <span className="icon usual-icon"><LinkOutlined />
                </span>
                link to event
                </Link>
            </Paragraph>
          </Popover>
        </Col>
      </Row>

      <Row>
        <Typography>
          <Title level={3}>Description</Title>
          <Paragraph>
          {/* здесь нужно размапить массив тегов выбрать на каждый вид цвет */}
            <Tag color="success">
              {event.tags}
            </Tag>
          </Paragraph>
          {/* не рендерить если нет  */}
          <Paragraph className="modal-font">
            {event.description}

          </Paragraph>
           {/* не рендерить если нет*/}
          {CreateLink(event.descriptionUrl, 'link to description')}
          {/* <Paragraph className="modal-font"><Link className="modal-font" href={event.descriptionUrl} target="_blank">
            <span className="icon usual-icon"><LinkOutlined /></span>link to description
          </Link>
          </Paragraph> */}
          {/* не рендерить если нет картинок ссылок или видео размапить массив */}
          <Title level={4}>Materials:</Title>
          {/* <Paragraph className="modal-font"><Link className="modal-font" href={event.materials.links[0].link} target="_blank">
            <span className="icon duration-icon"><LinkOutlined /></span>{event.materials.links[0].discription}
          </Link>
          </Paragraph> */}
        </Typography>
      </Row>
          {/* не рендерить если нет*/}
      <Row>
        <Typography>
          <Title level={3}>Description of Deadline</Title>
          <Paragraph className="modal-font">
            {event.deadlineDescription}
          </Paragraph>
        </Typography>
      </Row>
      {/* доделать фидбэк*/}
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
    </Modal>

  );
}

export default InfoWindow;
