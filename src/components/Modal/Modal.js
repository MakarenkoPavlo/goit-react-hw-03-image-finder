import React, { Component } from 'react';
import './Modal.module.css';

class Modal extends Component {
  render() {
    const { isOpen, onClose, imageUrl } = this.props;
    
    if (!isOpen) return null;

    return (
      <div className="Overlay" onClick={onClose}>
        <div className="Modal">
          <img src={imageUrl} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
