import React, { Component } from 'react';
import './Button.module.css';

class Button extends Component {
  render() {
    const { onClick } = this.props;

    return (
      <button className="Button" onClick={onClick}>
        Load more
      </button>
    );
  }
}

export default Button;






