import { Button } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, {useState} from 'react';
import { Typography } from 'antd';

import './info-window.scss';

const { Title } = Typography;

interface Props {
  event: any;
}

// ДОЛЖЕН ПРИХОДИТЬ ИВЕНТ В ПРОПСАХ

const InfoWindow: React.FunctionComponent<Props> = (props: Props) => {
  const [visible, setVisible] = useState(true);

  return (
    <div className="info-window">
      <Button type="primary" onClick={() => setVisible(true)}>
        Open Modal of 1000px width
      </Button>
      <Modal
        title={'Help me'}
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
      >
        <Title level={3}>h3. Ant Design</Title>
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </div>
  );
}

export default InfoWindow;
