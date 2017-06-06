import React, { Component } from 'react';
import './App.css';

import RGBToComplimentary from './RGBToComplimentary.js'

class App extends Component {
  state={
    r: 255,
    g: 255,
    b: 255,
    order: [0, 1, 2]
  }

  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleClick = async e => {
    let newOrder = this.state.order.map((each, i) => {
      if (i === this.state.order.length - 1) {
        return this.state.order[0]
      }
      return this.state.order[i + 1]
    })
    
    await this.setState({
      order: newOrder
    })

    this.handleScroll()
  }

  handleScroll = () => {
    const { scrollY } = window
    const { order } = this.state
    const rDelta = 255 * order[2]
    const gDelta = 255 * order[1]
    const bDelta = 255 * order[0]

    const rMax = 255 * (order[2] + 1)
    const gMax = 255 * (order[1] + 1)
    const bMax = 255 * (order[0] + 1)
    
    let rMinMax = [rDelta, rMax]
    let gMinMax = [gDelta, gMax]
    let bMinMax = [bDelta, bMax]

    let r, g, b
    r = scrollY > rMinMax[0] ? (scrollY <= rMinMax[1] ? 255 - (scrollY - rDelta) : 0) : 255
    g = scrollY > gMinMax[0] ? (scrollY <= gMinMax[1] ? 255 - (scrollY - gDelta) : 0) : 255
    b = scrollY > bMinMax[0] ? (scrollY <= bMinMax[1] ? 255 - (scrollY - bDelta) : 0) : 255

    this.setState({
      r, g, b
    })
  }

  setStyles = () => {
    const { r, g, b } = this.state
    const colorComplement = RGBToComplimentary(r, g, b)

    return {
      global: {
        backgroundColor: `rgb(${r}, ${g}, ${b})`,
        color: colorComplement,
      },
      button: {
        border: `2px solid ${colorComplement}`,
        color: colorComplement
      }
    }
  }

  render() {
    const styles = this.setStyles()

    return (
      <div className="App" style={styles.global}>
        <div className="container">
          <h1>scroll</h1>
          <button
            style={styles.button}
            onClick={this.handleClick}
          >
            Change Scheme
          </button>
        </div>
      </div>
    );
  }
}

export default App;
