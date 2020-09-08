import React from 'react';

import './header.scss';


function Header() {
  return (
    <div className="header">
      <img src="https://rs.school/images/rs_school.svg" alt="" />
      <div className="title">Schedule</div>
      <button type="button">Login|LogOut</button>
    </div>
  );
}

export default Header;
