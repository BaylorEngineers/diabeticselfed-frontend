import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ label, onClick, color, size }) => {
  const buttonStyle = {
    backgroundColor: color,
    fontSize: size === 'small' ? '14px' : size === 'large' ? '18px' : '16px',
    padding: size === 'small' ? '8px 12px' : size === 'large' ? '12px 20px' : '10px 16px',
    color: '#fff',
    border: 'none',
    borderRadius: '25px',
    margin: '4px',
    cursor: 'pointer',
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  color: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

Button.defaultProps = {
  onClick: () => {},
  color: '#3498db', // blue color
  size: 'medium',
};

export default Button;
