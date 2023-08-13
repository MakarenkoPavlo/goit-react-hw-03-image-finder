import React, { Component } from 'react';
import LoaderSpinner from 'react-loader-spinner';
import './Loader.module.css';

class Loader extends Component {
  render() {
    return (
      <div className="Loader">
        <LoaderSpinner type="ThreeDots" color="#00BFFF" height={80} width={80} />
      </div>
    );
  }
}

export default Loader;
