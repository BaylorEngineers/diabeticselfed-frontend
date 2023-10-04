import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ text, backgroundColor, textColor }) => {
  const footerStyle = {
    backgroundColor: backgroundColor,
    color: textColor,
    padding: '10px',
    textAlign: 'center',
    position: 'fixed',
    bottom: 0,
    width: '100%',
  };

  return (
    <footer style={footerStyle}>
      <p>{text}</p>
    </footer>
  );
};

Footer.propTypes = {
  text: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
};

Footer.defaultProps = {
  backgroundColor: '#333',
  textColor: '#fff',
};

export default Footer;
