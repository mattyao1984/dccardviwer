import React from 'react';
import logger from 'morgan';

class Footer extends React.Component {
  constructor() {
    super();
    this.state = {
      year: new Date().getFullYear()
    };
  }

  render() {
    return (
      <footer>
        <div className="container">
          <h6>Matt Yao &copy; {this.state.year} - Deadman's Cross Card Viewer</h6>
        </div>
      </footer>
    );
  }
};

export default Footer;
