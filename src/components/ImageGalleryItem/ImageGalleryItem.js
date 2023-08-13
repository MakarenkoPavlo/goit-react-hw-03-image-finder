import React, { Component } from 'react';
import './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  render() {
    const { image, onClick } = this.props;

    return (
      <li className="ImageGalleryItem" key={image.id}>
        <img
          src={image.webformatURL}
          alt=""
          className="ImageGalleryItem-image"
          onClick={() => onClick(image.largeImageURL)}
        />
      </li>
    );
  }
}

export default ImageGalleryItem;