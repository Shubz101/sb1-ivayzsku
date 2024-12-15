interface CalculatorButtonProps {
  value: string;
  onClick: () => void;
  variant?: 'number' | 'operator' | 'equals' | 'clear';
}

const Button = ({ value, onClick, variant = 'number' }: CalculatorButtonProps) => {
  const baseStyles = 'text-xl font-semibold rounded-lg transition-all duration-200 hover:scale-105 active:scale-95';
  
  const variantStyles = {
    number: 'bg-gray-100 hover:bg-gray-200 text-gray-800',
    operator: 'bg-blue-100 hover:bg-blue-200 text-blue-800',
    equals: 'bg-green-500 hover:bg-green-600 text-white',
    clear: 'bg-red-500 hover:bg-red-600 text-white'
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} p-4`}
    >
      {value}
    </button>
  );
};

export default Button;