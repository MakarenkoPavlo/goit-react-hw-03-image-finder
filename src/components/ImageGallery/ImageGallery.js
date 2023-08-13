import React, { Component } from 'react';
import './ImageGallery.module.css';

class ImageGallery extends Component {
  render() {
    const { children } = this.props;

    return <ul className="ImageGallery">{children}</ul>;
  }
}

export default ImageGallery;