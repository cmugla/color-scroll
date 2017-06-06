import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state={
    r: 255,
    g: 255,
    b: 255
  }

  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll)
  }

  // adapted from answer by Edd https://stackoverflow.com/a/37657940
  RGBToComplimentary = (red, green, blue) => {
    let r = red
    let g = green
    let b = blue

    // Convert RGB to HSL
    // Adapted from answer by 0x000f http://stackoverflow.com/a/34946092/4939630
    r /= 255.0;
    g /= 255.0;
    b /= 255.0;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2.0;

    if(max == min) {
        h = s = 0;  // achromatic
    } else {
        var d = max - min;
        s = (l > 0.5 ? d / (2.0 - max - min) : d / (max + min));

        if(max == r && g >= b) {
            h = 1.0472 * (g - b) / d ;
        } else if(max == r && g < b) {
            h = 1.0472 * (g - b) / d + 6.2832;
        } else if(max == g) {
            h = 1.0472 * (b - r) / d + 2.0944;
        } else if(max == b) {
            h = 1.0472 * (r - g) / d + 4.1888;
        }
    }

    h = h / 6.2832 * 360.0 + 0;

    // Shift hue to opposite side of wheel and convert to [0-1] value
    h += 180;
    if (h > 360) { h -= 360; }
    h /= 360;

    // Convert h s and l values into r g and b values
    // Adapted from answer by Mohsen http://stackoverflow.com/a/9493060/4939630
    if(s === 0){
        r = g = b = l; // achromatic
    } else {
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;

        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    r = Math.round(r * 255);
    g = Math.round(g * 255); 
    b = Math.round(b * 255);

    return `rgb(${r}, ${g}, ${b})`
  }

  handleScroll = () => {
    let { scrollY } = window
    let howMany = Math.floor(scrollY / 255)
    let isThird = howMany > 0 && howMany % 3 === 0
    // let isEven = howMany > 0 && (howMany / 3) % 2 === 0

    const rDelta = 255 * 2
    const gDelta = 255 * 1
    const bDelta = 255 * 0

    const rMax = 255 * 3
    const gMax = 255 * 2
    const bMax = 255 * 1
    
    let r, g, b
    r = scrollY > gMax ? (scrollY <= rMax ? 255 - (scrollY - rDelta) : 0) : 255
    g = scrollY > bMax ? (scrollY <= gMax ? 255 - (scrollY - gDelta) : 0) : 255
    b = scrollY <= bMax ? (255 - scrollY) : 0

    this.setState({
      r, g, b
    })
  }

  setBGColor = () => {
    const { r, g, b } = this.state

    return {
      backgroundColor: `rgb(${r}, ${g}, ${b})`,
      // color: `complement(rgb(${r}, ${g}, ${b}))`
      color: this.RGBToComplimentary(r, g, b)
    }
  }

  render() {
    const bgColor = this.setBGColor()

    console.log( 'bgColor', bgColor )

    return (
      <div className="App" style={bgColor}>
        <h1>
          bg: {bgColor.backgroundColor}<br/>
          color: {bgColor.color}
        </h1>
      </div>
    );
  }
}

export default App;
