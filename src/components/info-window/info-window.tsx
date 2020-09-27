import { Button, Badge, Card, Popover, Row, Col, Tag, Form, Input /*, Space*/ } from 'antd';
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
  EnvironmentOutlined
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
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input placeholder="Enter your github" />
        </Form.Item>
        <Form.Item
          label="Your Feedback"
          name="feedback"
          rules={[{ required: true, message: 'Please input your feedback!' }]}>
          <TextArea placeholder="Your feedback" rows={4} autoSize={{ minRows: 2, maxRows: 6 }} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          {/* <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary"> */}
          <Button type="primary" htmlType="submit">
            Add Feedback
          </Button>

        </Form.Item>

      </Form>
    )
  };

  console.log('info-window props', event, props);
  //
  const dateTimeParagraph = (event.dateTime > 0) ? (
    <Paragraph className="modal-font">
      <span className="icon start-icon"><CalendarOutlined /></span>
      <i>start: </i><strong> {convertDateTime(event.dateTime, false, settings.timeZone)}   <span className="start-icon"><ClockCircleOutlined /></span> {convertDateTime(event.dateTime, true, settings.timeZone)}</strong>
    </Paragraph>) : null;


  /* не рендерить этот параграф если нет даты дедлайна */
  const deadlinedateTimeParagraph = (event.deadlinedateTime > 0) ? (
    <Paragraph type="danger" className="modal-font">
      <span className="icon deadline-icon"><CalendarOutlined /></span>
      <i>deadline: </i><strong>{convertDateTime(event.deadlinedateTime, false, settings.timeZone)}   <span><ClockCircleOutlined /> </span>{convertDateTime(event.deadlinedateTime, true, settings.timeZone)}</strong>
    </Paragraph>) : null;

  /* не рендерить этот параграф если нет дюрэйшн */
  const durationParagraph = (event.duration) ? (<Paragraph className="modal-font">
    <span className="icon usual-icon"><HistoryOutlined /></span>
    <i>it can take you about </i><strong>{event.duration}</strong>
  </Paragraph>) : null;

  /* не рендерить этот параграф если нет орга, разсплитить и сджойнить имена  */
  const organizerParagraph = (event.organizer.length > 0) ? (<Paragraph className="modal-font">
    <span className="icon usual-icon"><UserOutlined /></span>
    <i>organizer: </i><span>{event.organizer.join(', ')}</span>
  </Paragraph>) : null;


  /* здесь нужно размапить массив тегов выбрать на каждый вид цвет */
  const tagsParagraph = (event.tags.length > 0) ? (
    <Paragraph>
      {
        event.tags.map((el: any) => {
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
            <Tag color={color}>
              {el}
            </Tag>
          );
        })
      }
    </Paragraph>) : null;

  /* не рендерить если нет  */
  const descriptionParagraph = (event.description) ? (
    <Paragraph className="modal-font">
      {event.description}
    </Paragraph>) : null;

  /* не рендерить если нет*/
  const descriptionUrlElement = (event.descriptionUrl) ? (CreateLink(event.descriptionUrl, 'link to description')) : null;

  const materialsLinks: any[] = [];
  if (event.materials.links.length > 0) {
    event.materials.links.map((el: any) => materialsLinks.push(CreateLink(el.link, el.discription || 'link')));
  }
  if (event.materials.video.length > 0) {
    event.materials.video.map((el: any) => materialsLinks.push(CreateLink(el.link, el.discription || 'link')));
  }
  if (event.materials.images.length > 0) {
    event.materials.images.map((el: any) => materialsLinks.push(CreateLink(el.link, el.discription || 'link')));
  }
  console.log('mat link', materialsLinks)
  const materialsElement = (materialsLinks.length > 0) ? (
    <Row>
      <Typography>
        <Title level={4}>Materials:</Title>
        {materialsLinks}
      </Typography>
    </Row>) : null;

  /* не рендерить если нет*/
  const deadlineDescriptionElement = (event.deadlineDescription) ? (
    <Row>
      <Typography>
        <Title level={3}>Description of Deadline</Title>
        <Paragraph className="modal-font">
          {event.deadlineDescription}
        </Paragraph>
      </Typography>
    </Row>) : null;



  /* не рендерить этот параграф если нет, сделать 1 функцию на прием текста и параметра на эти 3 параграфа */
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
  /* не рендерить если нет, переделать на CreateLink  я ее уже написала */
  const eventURLElement = (event.eventURL) ? (CreateLink(event.eventURL, 'link to event')) : null;

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
    // width={"80%"}
    >
      <Badge.Ribbon text={event.form} color={badgeColor}>
        <Card bordered={false} style={{ backgroundColor: 'transparent', }}><Title level={2}>
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
        <Col xs={24} md={14}>
          {/* не рендерить этот параграф если нет даты старта */}
          {dateTimeParagraph}
          {/* <Paragraph className="modal-font">
            <span className="icon start-icon"><CalendarOutlined /></span>
            <i>start: </i><strong> {convertDateTime(event.dateTime, false, settings.timeZone)}   <span className="start-icon"><ClockCircleOutlined /></span> {convertDateTime(event.dateTime, true, settings.timeZone)}</strong>
          </Paragraph> */}

          {/* не рендерить этот параграф если нет даты дедлайна */}
          {deadlinedateTimeParagraph}
          {/* <Paragraph type="danger" className="modal-font">
            <span className="icon deadline-icon"><CalendarOutlined /></span>
            <i>deadline: </i><strong>{convertDateTime(event.deadlinedateTime, false, settings.timeZone)}   <span><ClockCircleOutlined /> </span>{convertDateTime(event.deadlinedateTime, true, settings.timeZone)}</strong>
          </Paragraph> */}


          {/* не рендерить этот параграф если нет дюрэйшн */}
          {durationParagraph}
          {/* <Paragraph className="modal-font">
            <span className="icon usual-icon"><HistoryOutlined /></span>
            <i>it can take you about </i><strong>{event.duration}</strong>
          </Paragraph> */}


          {/* не рендерить этот параграф если нет орга, разсплитить и сджойнить имена  */}
          {organizerParagraph}
          {/* <Paragraph className="modal-font">
            <span className="icon usual-icon"><UserOutlined /></span>
            <i>organizer: </i><span>{event.organizer}</span>
          </Paragraph> */}
        </Col>
        <Col xs={24} md={8}>
          {/* не рендерить этот параграф если нет, сделать 1 функцию на прием текста и параметра на эти 3 параграфа */}
          {kindElement}
          {typeElement}
          {formElement}
          {/* <Paragraph className="modal-font"><i>kind:</i> <span>{event.kind}</span></Paragraph>
          <Paragraph className="modal-font"><i>type:</i> <span>{event.type}</span></Paragraph>
          <Paragraph className="modal-font"><i>form:</i> <span>{event.form}</span></Paragraph> */}
          {/* не рендерить если нет, переделать на CreateLink  я ее уже написала */}
          {placeElement}
          {eventURLElement}
          {/* <Popover placement="bottomLeft" content={<Link href={event.eventURL} target="_blank">{event.eventURL}</Link>} trigger="hover">
            <Paragraph className="modal-font">
              <Link className="modal-font" href={event.eventURL} target="_blank">
                <span className="icon usual-icon"><LinkOutlined />
                </span>
                link to event
                </Link>
            </Paragraph>
          </Popover> */}
        </Col>
      </Row>

      <Row>
        <Typography>
          <Title level={3}>Description</Title>

          {/* здесь нужно размапить массив тегов выбрать на каждый вид цвет */}
          {tagsParagraph}
          {/* <Paragraph>

            <Tag color="success">
              {event.tags}
            </Tag>
          </Paragraph> */}


          {/* не рендерить если нет  */}
          {descriptionParagraph}
          {/* <Paragraph className="modal-font">
            {event.description}
          </Paragraph> */}


          {/* не рендерить если нет*/}
          {/* {CreateLink(event.descriptionUrl, 'link to description')} */}
          {descriptionUrlElement}
          {/* <Paragraph className="modal-font"><Link className="modal-font" href={event.descriptionUrl} target="_blank">
            <span className="icon usual-icon"><LinkOutlined /></span>link to description
          </Link>
          </Paragraph> */}
        </Typography>
      </Row>
      {/* не рендерить если нет*/}
      {deadlineDescriptionElement}
      {/* <Row>
        <Typography>
          <Title level={3}>Description of Deadline</Title>
          <Paragraph className="modal-font">
            {event.deadlineDescription}
          </Paragraph>
        </Typography>
      </Row> */}
      {/* не рендерить если нет картинок ссылок или видео размапить массив */}
      {commentElement}
      {materialsElement}
      {/* <Row>
        <Typography>
          <Title level={4}>Materials:</Title>
          <Paragraph className="modal-font"><Link className="modal-font" href={event.materials.links[0].link} target="_blank">
            <span className="icon duration-icon"><LinkOutlined /></span>{event.materials.links[0].discription}
          </Link>
          </Paragraph>
        </Typography>
      </Row> */}
      {/* доделать фидбэк*/}
      <Row>
        <Typography>

          <Title className="feedback-title" level={3}><span className="icon usual-icon"><FormOutlined /></span>Feedback </Title>
          {/* <Button type="primary" icon={<FormOutlined />} size='large' /> */}

        </Typography>
        <Col span={24}>
          <Feedback
          // onChange={this.handleChange}
          // onSubmit={this.handleSubmit}
          // submitting={submitting}
          // value={value}
          />
        </Col>
      </Row>
    </Modal>

  );
}

export default InfoWindow;
