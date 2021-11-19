import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Logo from 'components/atoms/Logo';

const TopBar = () => {
  return (
    <div className="head-wrap grade1">
      <div className="index-img water">&nbsp;</div>
      <div className="sunk">
        <div className="header-avatar">
          <img className="user-avatar hero" src="{PortraitURL-128}" />
        </div>

        <h1 className="head-title hero">Title</h1>

        <p className="header-desc hero">Description</p>
      </div>
    </div>
  );
};

export default TopBar;
