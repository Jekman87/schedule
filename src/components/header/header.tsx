import React from 'react';
import Button from 'antd/es/button';

import './header.scss';


function Header() {
  return (
    <div className="header">
      <img src="https://rs.school/images/rs_school.svg" alt="" />
      <div className="title">Schedule</div>
      <Button type="dashed" className="logIn">Login|LogOut</Button>
    </div>
  );
}

export default Header;
