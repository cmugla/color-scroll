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
    let r, g, b
    const { scrollY } = window

    r = 255 - (scrollY - 255 * 2)
    g = 255 - (scrollY - 255)
    b = 255 - scrollY


    this.setState({
      bgColor: {
        backgroundColor: `rgb(
          ${scrollY > 255 * 2 && scrollY <= 255 * 3 ? r : scrollY > 255 * 3 ? 0 : 255},
          ${scrollY > 255 && scrollY <= 255 * 2 ? g : scrollY > 255 * 2 ? 0 : 255},
          ${scrollY < 255 ? b : 0}
        )`
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
