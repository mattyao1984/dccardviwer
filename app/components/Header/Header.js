import React from 'react';
import logger from 'morgan';

class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="container">
          <div className="download">
            <a className="store apple" href="https://itunes.apple.com/au/app/deadmans-cross/id757746345?mt=8" target="_blank"></a>
            <a className="store google" href="https://play.google.com/store/apps/details?id=com.square_enix.android_googleplay.deadmanscrossww&hl=en" target="_blank"></a>
          </div>
        </div>
      </header>
    );
  }
};

export default Header;
