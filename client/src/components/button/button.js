import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classname';

const Button = ({
  children, onClick, className, disabled, active, value,
}) => {
  const classes = classNames(
    className,
    { active },
  );

  return (
    <button
      className = {classes}
      disabled = {disabled}
      onClick = {onClick}
    >{children}</button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onCllick: PropTypes.func,
  className: PropTypes.string,
  disable: PropTypes.bool,
  active: PropTypes.bool,
  value: PropTypes.number
};

Button.defaultProps = {
  children: 'default button',
  onClick: () => {},
  className: '',
  disable: false,
  active: false,
  value: null,
};

export default Button;
