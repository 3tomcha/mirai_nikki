import React from 'react';
import './Loader.css';

const Loader = ({ text }) => {
    return (
        <div className="loader">
            <div className="loader-text">{text}</div>
        </div>
    );
};

export default Loader;