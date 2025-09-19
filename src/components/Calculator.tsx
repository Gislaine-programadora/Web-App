import { useState } from "react";
import { Calculator as CalcIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Calculator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "×":
        return firstValue * secondValue;
      case "÷":
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const buttons = [
    ["C", "±", "%", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="]
  ];

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="secondary"
        size="sm"
        className="mb-2 bg-secondary/50 hover:bg-secondary border-border/50"
      >
        <CalcIcon className="w-4 h-4 mr-2" />
        Calculadora
      </Button>

      {isOpen && (
        <Card className="absolute top-full left-0 z-50 p-4 w-64 bg-gradient-card border-border/50 shadow-card">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold text-foreground">Calculadora</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-auto p-1"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="bg-background/20 p-3 rounded mb-3 text-right">
            <div className="text-xl font-mono text-foreground overflow-hidden">
              {display}
            </div>
          </div>

          <div className="grid gap-2">
            {buttons.map((row, i) => (
              <div key={i} className="grid grid-cols-4 gap-2">
                {row.map((btn) => (
                  <Button
                    key={btn}
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      if (btn === "C") clear();
                      else if (btn === "=") performCalculation();
                      else if (["+", "-", "×", "÷"].includes(btn)) inputOperation(btn);
                      else if (btn === "±") setDisplay(String(-parseFloat(display)));
                      else if (btn === "%") setDisplay(String(parseFloat(display) / 100));
                      else inputNumber(btn);
                    }}
                    className={`h-10 ${
                      ["+", "-", "×", "÷", "="].includes(btn)
                        ? "bg-primary/20 hover:bg-primary/30 text-primary"
                        : "bg-secondary/30 hover:bg-secondary/50"
                    } ${btn === "0" ? "col-span-2" : ""}`}
                  >
                    {btn}
                  </Button>
                ))}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};