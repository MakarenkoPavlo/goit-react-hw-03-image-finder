import React from 'react';
import LoaderSpinner from 'react-loader-spinner';
import './styles.css';

const Loader = () => {
  return (
    <div className="Loader">
      <LoaderSpinner type="ThreeDots" color="#00BFFF" height={80} width={80} />
    </div>
  );
};

export default Loader;