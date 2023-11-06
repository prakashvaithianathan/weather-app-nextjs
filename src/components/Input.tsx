import React, { ChangeEvent, ChangeEventHandler, KeyboardEvent } from 'react';

interface InputProps {
  type?: string;
  name?: string;
  id?: string;
  value?: string | number;
  className?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onEnter?: () => void; // Callback to call when Enter key is pressed
}

const Input: React.FC<InputProps> = (props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(e);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && props.onEnter) {
      props.onEnter();
    }
  };

  return (
    <div className='w-full'>
      <input
        type={props.type}
        name={props.name}
        id={props.id}
        value={props.value}
        className={props.className}
        placeholder={props.placeholder}
        onChange={handleChange}
        onKeyDown={handleKeyPress} // Detect Enter key press
        {...props}
      />
    </div>
  );
};

export default Input;
