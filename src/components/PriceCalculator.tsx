import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { PriceConfig, FormInputs } from "@/types";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  FaUsers,
  FaUser,
  FaCalculator,
  FaEraser,
  FaReceipt,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

interface PriceCalculatorProps {
  priceConfig: PriceConfig[];
  category: "can_imm" | "uk_tb" | "aus_imm" | "nz_imm";
}

// Composant Calculatrice.
const Calculator = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = useCallback(
    (num: string) => {
      if (waitingForOperand) {
        setDisplay(String(num));
        setWaitingForOperand(false);
      } else {
        setDisplay(display === "0" ? String(num) : display + num);
      }
    },
    [display, waitingForOperand]
  );

  const inputOperation = useCallback(
    (nextOperation: string) => {
      const inputValue = parseFloat(display);

      if (previousValue === null) {
        setPreviousValue(inputValue);
      } else if (operation) {
        const currentValue = previousValue || 0;
        const newValue = calculate(currentValue, inputValue, operation);

        setDisplay(String(newValue));
        setPreviousValue(newValue);
      }

      setWaitingForOperand(true);
      setOperation(nextOperation);
    },
    [display, previousValue, operation]
  );

  const calculate = (
    firstValue: number,
    secondValue: number,
    operation: string
  ): number => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "×":
      case "*":
        return firstValue * secondValue;
      case "÷":
      case "/":
        return secondValue !== 0 ? firstValue / secondValue : 0;
      default:
        return secondValue;
    }
  };

  const performCalculation = useCallback(() => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  }, [display, previousValue, operation]);

  const clearAll = useCallback(() => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  }, []);

  const clearEntry = useCallback(() => {
    setDisplay("0");
  }, []);

  const inputDecimal = useCallback(() => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  }, [display, waitingForOperand]);

  const backspace = useCallback(() => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
    }
  }, [display]);

  // Gestion des événements clavier
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const { key } = event;

      // Empêcher le comportement par défaut pour les touches que nous gérons
      if (/[0-9+\-*/.=]|Enter|Escape|Backspace/.test(key)) {
        event.preventDefault();
      }

      // Nombres 0-9
      if (/[0-9]/.test(key)) {
        inputNumber(key);
      }
      // Opérations
      else if (key === "+") {
        inputOperation("+");
      } else if (key === "-") {
        inputOperation("-");
      } else if (key === "*") {
        inputOperation("×");
      } else if (key === "/") {
        inputOperation("÷");
      }
      // Point décimal
      else if (key === "." || key === ",") {
        inputDecimal();
      }
      // Égal ou Entrée
      else if (key === "=" || key === "Enter") {
        performCalculation();
      }
      // Effacer tout (Escape)
      else if (key === "Escape") {
        clearAll();
      }
      // Retour arrière
      else if (key === "Backspace") {
        backspace();
      }
    },
    [
      inputNumber,
      inputOperation,
      inputDecimal,
      performCalculation,
      clearAll,
      backspace,
    ]
  );

  // Ajouter/supprimer les écouteurs d'événements clavier
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-80 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">Number cruncher</h3>
          <Button onClick={onClose} size="sm" className="p-2">
            <FaTimes />
          </Button>
        </div>

        {/* Instructions clavier */}
        <div className="text-xs text-gray-500 mb-2 text-center">
          Use your keyboard: 0-9, +, -, *, /, =, Enter, Esc, ←
        </div>

        {/* Écran */}
        <div className="bg-gray-900 text-white p-4 rounded-lg mb-4 text-right text-2xl font-mono min-h-[60px] flex items-center justify-end">
          {display}
        </div>

        {/* Boutons */}
        <div className="grid grid-cols-4 gap-2">
          {/* Première ligne */}
          <Button
            onClick={clearAll}
            className="bg-red-500 hover:bg-red-600 text-white col-span-2"
            size="sm"
          >
            AC
          </Button>
          <Button
            onClick={clearEntry}
            className="bg-orange-500 hover:bg-orange-600 text-white"
            size="sm"
          >
            CE
          </Button>
          <Button
            onClick={() => inputOperation("÷")}
            className="bg-blue-500 hover:bg-blue-600 text-white"
            size="sm"
          >
            ÷
          </Button>

          {/* Deuxième ligne */}
          <Button
            onClick={() => inputNumber("7")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800"
            size="sm"
          >
            7
          </Button>
          <Button
            onClick={() => inputNumber("8")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800"
            size="sm"
          >
            8
          </Button>
          <Button
            onClick={() => inputNumber("9")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800"
            size="sm"
          >
            9
          </Button>
          <Button
            onClick={() => inputOperation("×")}
            className="bg-blue-500 hover:bg-blue-600 text-white"
            size="sm"
          >
            ×
          </Button>

          {/* Troisième ligne */}
          <Button
            onClick={() => inputNumber("4")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800"
            size="sm"
          >
            4
          </Button>
          <Button
            onClick={() => inputNumber("5")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800"
            size="sm"
          >
            5
          </Button>
          <Button
            onClick={() => inputNumber("6")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800"
            size="sm"
          >
            6
          </Button>
          <Button
            onClick={() => inputOperation("-")}
            className="bg-blue-500 hover:bg-blue-600 text-white"
            size="sm"
          >
            -
          </Button>

          {/* Quatrième ligne */}
          <Button
            onClick={() => inputNumber("1")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800"
            size="sm"
          >
            1
          </Button>
          <Button
            onClick={() => inputNumber("2")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800"
            size="sm"
          >
            2
          </Button>
          <Button
            onClick={() => inputNumber("3")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800"
            size="sm"
          >
            3
          </Button>
          <Button
            onClick={() => inputOperation("+")}
            className="bg-blue-500 hover:bg-blue-600 text-white"
            size="sm"
          >
            +
          </Button>

          {/* Cinquième ligne */}
          <Button
            onClick={() => inputNumber("0")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 col-span-2"
            size="sm"
          >
            0
          </Button>
          <Button
            onClick={inputDecimal}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800"
            size="sm"
          >
            .
          </Button>
          <Button
            onClick={performCalculation}
            className="bg-green-500 hover:bg-green-600 text-white"
            size="sm"
          >
            =
          </Button>
        </div>

        {/* Bouton Backspace */}
        <div className="mt-2">
          <Button
            onClick={backspace}
            className="w-full bg-gray-400 hover:bg-gray-500 text-white"
            size="sm"
          >
            ← Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export const PriceCalculator = ({
  priceConfig,
  category,
}: PriceCalculatorProps) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [familySize, setFamilySize] = useState(0);
  const [receiptAmount, setReceiptAmount] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [showPaymentResult, setShowPaymentResult] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);

  const { register, handleSubmit, reset, watch } = useForm<FormInputs>();

  const categoryPrices = priceConfig.filter(
    (item) => item.category === category
  );

  const onSubmit = (data: FormInputs) => {
    let total = 0;
    let size = 0;

    categoryPrices.forEach((item) => {
      const quantity = parseInt(data[item.id] || "0");
      total += quantity * item.price;
      size += quantity;
    });

    setTotalPrice(total);
    setFamilySize(size);
  };

  const handleReceiptCheck = () => {
    const remaining = totalPrice - receiptAmount;
    setRemaining(remaining);
    setShowPaymentResult(true);
  };

  const clearForm = () => {
    reset();
    setTotalPrice(0);
    setFamilySize(0);
    setReceiptAmount(0);
    setRemaining(0);
    setShowPaymentResult(false);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto space-y-4">
        <Card className="floating-animation p-4">
          <div className="text-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
              <FaCalculator className="text-white text-lg" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">
              Price Calculator
            </h3>
            <p className="text-gray-600 text-sm">
              Enter number of people per age group
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-3">
              {categoryPrices.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl"
                >
                  <div className="flex-1">
                    <span className="font-semibold text-gray-800 text-sm">
                      {item.label}
                    </span>
                    <div className="text-xs text-blue-600 font-medium">
                      {new Intl.NumberFormat("en-US").format(item.price)} FCFA
                    </div>
                  </div>
                  <div className="w-16">
                    <Input
                      {...register(item.id)}
                      type="number"
                      min="0"
                      defaultValue="0"
                      className="text-center font-semibold text-sm p-2"
                    />
                  </div>
                </div>
              ))}
            </div>

            {familySize > 0 && (
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl text-center shadow-lg pulse-glow">
                <div className="flex items-center justify-center space-x-3">
                  {familySize === 1 ? (
                    <FaUser className="text-xl" />
                  ) : (
                    <FaUsers className="text-xl" />
                  )}
                  <div>
                    <div className="text-xs opacity-90">Family Size</div>
                    <div className="text-2xl font-bold">{familySize}</div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-3 gap-2">
              <Button
                type="submit"
                className="flex items-center justify-center space-x-2"
                size="sm"
              >
                <FaCalculator size={14} />
                <span>Calculate</span>
              </Button>
              <Button
                type="button"
                variant="clear"
                onClick={clearForm}
                className="flex items-center justify-center space-x-2"
                size="sm"
              >
                <FaEraser size={14} />
                <span>Clear</span>
              </Button>
              <Button
                type="button"
                // variant="secondary"
                onClick={() => setShowCalculator(true)}
                className="flex items-center justify-center space-x-2"
                size="sm"
              >
                <FaCalculator size={14} />
                <span>Number cruncher</span>
              </Button>
            </div>

            {totalPrice > 0 && (
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl text-center shadow-xl">
                <div className="text-xs opacity-90 mb-1">Total Amount</div>
                <h3 className="text-2xl font-bold">
                  {new Intl.NumberFormat("en-US").format(totalPrice)} FCFA
                </h3>
              </div>
            )}
          </form>
        </Card>

        {totalPrice > 0 && (
          <Card className="slide-in p-4">
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaReceipt className="text-white text-lg" />
              </div>
              <h4 className="text-lg font-bold text-gray-800">
                Receipt Verification
              </h4>
              <p className="text-gray-600 text-sm">Verify payment amount</p>
            </div>

            <div className="space-y-4">
              <Input
                type="number"
                placeholder="Enter receipt amount"
                value={receiptAmount || ""}
                onChange={(e) => {
                  setReceiptAmount(parseInt(e.target.value) || 0);
                  setShowPaymentResult(false);
                }}
                className="text-center font-semibold text-lg py-3"
              />

              <Button
                onClick={handleReceiptCheck}
                variant="success"
                className="w-full flex items-center justify-center space-x-2"
                disabled={!receiptAmount}
                size="sm"
              >
                <FaCheck size={14} />
                <span>Verify Payment</span>
              </Button>

              {showPaymentResult && receiptAmount > 0 && (
                <div className="slide-in">
                  {remaining === 0 && (
                    <div className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 p-4 rounded-xl text-center font-semibold border-2 border-green-300">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <FaCheck className="text-green-600 text-lg" />
                        <span className="text-lg font-bold">
                          Payment Complete
                        </span>
                      </div>
                      <div className="text-sm">
                        All amounts match perfectly!
                      </div>
                    </div>
                  )}
                  {remaining > 0 && (
                    <div className="bg-gradient-to-r from-red-100 to-red-200 text-red-800 p-4 rounded-xl text-center border-2 border-red-300">
                      <div className="font-semibold text-lg mb-2">
                        ⚠️ Payment Incomplete
                      </div>
                      <div className="text-lg font-bold mb-1">
                        {new Intl.NumberFormat("en-US").format(remaining)} FCFA
                        remaining
                      </div>
                      <div className="text-sm opacity-80">
                        Please complete the payment
                      </div>
                    </div>
                  )}
                  {remaining < 0 && (
                    <div className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 p-4 rounded-xl text-center border-2 border-green-300">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <FaCheck className="text-green-600 text-lg" />
                        <span className="text-lg font-bold">
                          Payment Complete
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="font-semibold">Surplus:</span>{" "}
                        {new Intl.NumberFormat("en-US").format(
                          Math.abs(remaining)
                        )}{" "}
                        FCFA
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
      {/* Calculatrice Modal */}
      <Calculator
        isOpen={showCalculator}
        onClose={() => setShowCalculator(false)}
      />
    </div>
  );
};
