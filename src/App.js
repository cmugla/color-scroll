import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state={
    bgColor: {
      backgroundColor: `rgb(255,255,255)`
    }
  }

  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    this.setState({
      bgColor: {
        backgroundColor: `rgb(${window.scrollY > 255 * 2 && window.scrollY <= 255 * 3 ? 255 - (window.scrollY - 255 * 2) : 255},${window.scrollY > 255 && window.scrollY <= 255 * 2 ? 255 - (window.scrollY - 255) : window.scrollY <= 255 ? 255 : 0},${window.scrollY <= 255 ? 255 - window.scrollY : 0})`
      }
    })
  }

  render() {
    const { bgColor } = this.state

    console.log( 'bgColor', bgColor )

    return (
      <div className="App" style={bgColor}>
      </div>
    );
  }
}

export default App;
