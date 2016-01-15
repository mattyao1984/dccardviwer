import React from 'react';
import HeaderComponent from './components/Header/Header';
import FooterComponent from './components/Footer/Footer';

class App extends React.Component {
  render () {
    return (
      <div>
        <HeaderComponent />
          {this.props.children}
        <FooterComponent />
      </div>
    )
  }
}

export default App;
