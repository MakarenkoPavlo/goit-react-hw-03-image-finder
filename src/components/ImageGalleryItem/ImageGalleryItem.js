import React from 'react';
import './styles.css';

const ImageGalleryItem = ({ image, onClick }) => {
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
};

export default ImageGalleryItem;