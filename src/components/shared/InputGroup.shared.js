import React from 'react';
import './InputGroup.styles.scss';

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const InputGroup = ({ id, type, placeholder, value, onChange, onShowPassword }) => {
  return (
    <div className="input__group">
      <input
        id={id}
        className="input__field"
        type={type}
        placeholder={placeholder}
        autoComplete="true"
        required
        value={value}
        onChange={onChange}
      />
      {id === 'password' && (
        <button className="input__eye" onClick={onShowPassword}>
          {type === 'password' ? (
            <AiOutlineEye className="input__eye-show" />
          ) : (
            <AiOutlineEyeInvisible className="input__eye-hide" />
          )}
        </button>
      )}
      <label htmlFor={id} className="input__label">
        {id}
      </label>
    </div>
  );
};

export default InputGroup;
