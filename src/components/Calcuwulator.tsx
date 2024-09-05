import React, { useState } from 'react';
import './Calcuwulator.css';

interface CalcuwulatorProps {
  onClose: () => void;
}

type CalculatorMode = 'simple' | 'scientific' | 'financial';

export default function Calcuwulator({ onClose }: CalcuwulatorProps) {
  const [display, setDisplay] = useState('0');
  const [mode, setMode] = useState<CalculatorMode>('simple');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [memory, setMemory] = useState<number>(0);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const changeSign = () => {
    setDisplay(display.charAt(0) === '-' ? display.slice(1) : '-' + display);
  };

  const percentage = () => {
    const value = parseFloat(display);
    setDisplay((value / 100).toString());
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operator) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operator);

      setPreviousValue(newValue);
      setDisplay(String(newValue));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (a: number, b: number, op: string) => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return a / b;
      case 'pow': return Math.pow(a, b);
      case 'root': return Math.pow(a, 1 / b);
      default: return b;
    }
  };

  const handleEquals = () => {
    if (!operator || previousValue === null) return;

    const inputValue = parseFloat(display);
    const result = calculate(previousValue, inputValue, operator);

    setDisplay(String(result));
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  const scientificFunctions = {
    sin: Math.sin,
    cos: Math.cos,
    tan: Math.tan,
    log: Math.log10,
    ln: Math.log,
    sqrt: Math.sqrt,
    exp: Math.exp,
  };

  const applyScientificFunction = (func: keyof typeof scientificFunctions) => {
    const value = parseFloat(display);
    setDisplay(scientificFunctions[func](value).toString());
  };

  const financialFunctions = {
    compound: (principal: number, rate: number, time: number) => {
      return principal * Math.pow(1 + rate, time);
    },
    pv: (fv: number, rate: number, time: number) => {
      return fv / Math.pow(1 + rate, time);
    },
    fv: (pv: number, rate: number, time: number) => {
      return pv * Math.pow(1 + rate, time);
    },
  };

  const applyFinancialFunction = (func: keyof typeof financialFunctions) => {
    const value = parseFloat(display);
    const rate = parseFloat(prompt("Enter rate (as decimal):") || "0");
    const time = parseFloat(prompt("Enter time (in years):") || "0");
    setDisplay(financialFunctions[func](value, rate, time).toString());
  };

  const memoryFunctions = {
    MC: () => setMemory(0),
    MR: () => setDisplay(memory.toString()),
    M_plus: () => setMemory(memory + parseFloat(display)),
    M_minus: () => setMemory(memory - parseFloat(display)),
  };

  const renderKeypad = () => {
    switch (mode) {
      case 'simple':
        return (
          <>
            <button onClick={() => clear()}>C</button>
            <button onClick={() => changeSign()}>+/-</button>
            <button onClick={() => percentage()}>%</button>
            <button onClick={() => performOperation('/')}>/</button>
            <button onClick={() => inputDigit('7')}>7</button>
            <button onClick={() => inputDigit('8')}>8</button>
            <button onClick={() => inputDigit('9')}>9</button>
            <button onClick={() => performOperation('*')}>*</button>
            <button onClick={() => inputDigit('4')}>4</button>
            <button onClick={() => inputDigit('5')}>5</button>
            <button onClick={() => inputDigit('6')}>6</button>
            <button onClick={() => performOperation('-')}>-</button>
            <button onClick={() => inputDigit('1')}>1</button>
            <button onClick={() => inputDigit('2')}>2</button>
            <button onClick={() => inputDigit('3')}>3</button>
            <button onClick={() => performOperation('+')}>+</button>
            <button onClick={() => inputDigit('0')}>0</button>
            <button onClick={() => inputDecimal()}>.</button>
            <button onClick={() => handleEquals()}>=</button>
          </>
        );
      case 'scientific':
        return (
          <>
            <button onClick={() => clear()}>C</button>
            <button onClick={() => applyScientificFunction('sin')}>sin</button>
            <button onClick={() => applyScientificFunction('cos')}>cos</button>
            <button onClick={() => applyScientificFunction('tan')}>tan</button>
            <button onClick={() => applyScientificFunction('log')}>log</button>
            <button onClick={() => applyScientificFunction('ln')}>ln</button>
            <button onClick={() => applyScientificFunction('sqrt')}>√</button>
            <button onClick={() => performOperation('pow')}>x^y</button>
            <button onClick={() => applyScientificFunction('exp')}>exp</button>
            <button onClick={() => performOperation('root')}>y√x</button>
            <button onClick={() => inputDigit('π')}>π</button>
            <button onClick={() => inputDigit('e')}>e</button>
            {/* Include simple calculator buttons */}
          </>
        );
      case 'financial':
        return (
          <>
            <button onClick={() => clear()}>C</button>
            <button onClick={() => applyFinancialFunction('compound')}>Compound</button>
            <button onClick={() => applyFinancialFunction('pv')}>PV</button>
            <button onClick={() => applyFinancialFunction('fv')}>FV</button>
            <button onClick={() => memoryFunctions.MC()}>MC</button>
            <button onClick={() => memoryFunctions.MR()}>MR</button>
            <button onClick={() => memoryFunctions.M_plus()}>M+</button>
            <button onClick={() => memoryFunctions.M_minus()}>M-</button>
            {/* Include simple calculator buttons */}
            <button onClick={() => inputDigit('7')}>7</button>
            <button onClick={() => inputDigit('8')}>8</button>
            <button onClick={() => inputDigit('9')}>9</button>
            <button onClick={() => performOperation('/')}>/</button>
            <button onClick={() => inputDigit('4')}>4</button>
            <button onClick={() => inputDigit('5')}>5</button>
            <button onClick={() => inputDigit('6')}>6</button>
            <button onClick={() => performOperation('*')}>*</button>
            <button onClick={() => inputDigit('1')}>1</button>
            <button onClick={() => inputDigit('2')}>2</button>
            <button onClick={() => inputDigit('3')}>3</button>
            <button onClick={() => performOperation('-')}>-</button>
            <button onClick={() => inputDigit('0')}>0</button>
            <button onClick={() => inputDecimal()}>.</button>
            <button onClick={() => handleEquals()}>=</button>
            <button onClick={() => performOperation('+')}>+</button>
          </>
        );
    }
  };

  return (
    <div className="window calcuwulator">
      <div className="window-header">
        <span>Calcuwulator</span>
        <button onClick={onClose}>×</button>
      </div>
      <div className="window-content">
        <div className="calcuwulator-display">{display}</div>
        <div className="mode-switcher">
          <button onClick={() => setMode('simple')}>Simple</button>
          <button onClick={() => setMode('scientific')}>Scientific</button>
          <button onClick={() => setMode('financial')}>Financial</button>
        </div>
        <div className="calcuwulator-buttons">
          {renderKeypad()}
        </div>
      </div>
    </div>
  );
}