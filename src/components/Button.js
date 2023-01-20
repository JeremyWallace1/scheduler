import React from "react";

import "components/Button.scss";

import classNames from "classnames";

/* button takes in four props
  * confirm (boolean) for styling
  * danger (boolean) for styling
  * onClick (function)
  * disabled (boolean) for ability to click
  * children for button text
*/
const Button = (props) => {
  const buttonClass = classNames('button', { "button--confirm": props.confirm, "button--danger": props.danger });

  return ( 
    <button 
      className={buttonClass} 
      onClick={props.onClick} 
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;