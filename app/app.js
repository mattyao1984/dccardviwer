import React from 'react';
import FooterComponent from './components/Footer/Footer';

class App extends React.Component {
  render () {
    return (
      <div>
        {this.props.children}
        <FooterComponent />
      </div>
    )
  }
}

export default App;
