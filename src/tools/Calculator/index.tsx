import { useState } from 'react';
import { BackButton } from '../../components/BackButton';
import { Button } from './Button';
import { Display } from './Display';

interface CalculatorProps {
  onBack: () => void;
}

export const Calculator = ({ onBack }: CalculatorProps) => {
  const [display, setDisplay] = useState('');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (op: string) => {
    const current = parseFloat(display);
    
    if (previousValue === null) {
      setPreviousValue(current);
    } else if (operation) {
      const result = calculate(previousValue, current, operation);
      setPreviousValue(result);
      setDisplay(result.toString());
    }
    
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return a / b;
      default: return b;
    }
  };

  const handleEquals = () => {
    if (previousValue === null || !operation) return;
    
    const current = parseFloat(display);
    const result = calculate(previousValue, current, operation);
    
    setDisplay(result.toString());
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleClear = () => {
    setDisplay('');
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[80vh]">
      <BackButton onClick={onBack} />
      
      <h1 className="text-3xl font-bold mb-8">Calculator</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-sm">
        <Display value={display} />
        
        <div className="grid grid-cols-4 gap-2">
          <Button value="7" onClick={() => handleNumber('7')} />
          <Button value="8" onClick={() => handleNumber('8')} />
          <Button value="9" onClick={() => handleNumber('9')} />
          <Button value="÷" onClick={() => handleOperator('÷')} variant="operator" />
          
          <Button value="4" onClick={() => handleNumber('4')} />
          <Button value="5" onClick={() => handleNumber('5')} />
          <Button value="6" onClick={() => handleNumber('6')} />
          <Button value="×" onClick={() => handleOperator('×')} variant="operator" />
          
          <Button value="1" onClick={() => handleNumber('1')} />
          <Button value="2" onClick={() => handleNumber('2')} />
          <Button value="3" onClick={() => handleNumber('3')} />
          <Button value="-" onClick={() => handleOperator('-')} variant="operator" />
          
          <Button value="0" onClick={() => handleNumber('0')} />
          <Button value="." onClick={() => handleNumber('.')} />
          <Button value="=" onClick={handleEquals} variant="equals" />
          <Button value="+" onClick={() => handleOperator('+')} variant="operator" />
          
          <Button value="C" onClick={handleClear} variant="clear" />
        </div>
      </div>
    </div>
  );
};