import React from 'react';

interface InputProps {
  id: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string; // Optional prop for type, default is text
  className?: string,
}

const Input: React.FC<InputProps> = ({ id, name, value, onChange, type = 'text' }) => {
  return (
    <input
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      className="border rounded p-2 w-full"
      required // Add required attribute if needed
    />
  );
};

export default Input;