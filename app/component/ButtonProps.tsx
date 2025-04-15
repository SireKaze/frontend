import React from 'react';

interface ButtonProps {
  title: string;
  colorSchema?: 'blue' | 'green' | 'red' | 'gray'; // Anda dapat menambahkan warna lain sesuai kebutuhan
  variant?: 'outline' | 'filled';
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  isLoading?: boolean; 
}

const Button: React.FC<ButtonProps> = ({
  title,
  colorSchema = 'blue',
  variant = 'filled',
  type = 'button',
  onClick,
  disabled = false,
  style,
}) => {
  const baseStyles = 'px-4 py-2 rounded focus:outline-none';
  const colorStyles = {
    blue: variant === 'outline' ? 'border border-blue-500 text-blue-500' : 'bg-blue-500 text-white',
    green: variant === 'outline' ? 'border border-green-500 text-green-500' : 'bg-green-500 text-white',
    red: variant === 'outline' ? 'border border-red-500 text-red-500' : 'bg-red-500 text-white',
    gray: variant === 'outline' ? 'border border-gray-500 text-gray-500' : 'bg-gray-500 text-white',
  };

  const opacity = disabled ? 0.5 : 1;

  return (
    <button
      type={type}
      className={`${baseStyles} ${colorStyles[colorSchema]}`}
      onClick={onClick}
      disabled={disabled}
      style={{ opacity, ...style }}
    >
      {title}
    </button>
  );
};

export default Button;


