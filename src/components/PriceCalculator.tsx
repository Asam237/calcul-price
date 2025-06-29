import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PriceConfig, FormInputs } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { FaUsers, FaUser, FaCalculator, FaEraser, FaReceipt, FaCheck } from 'react-icons/fa';

interface PriceCalculatorProps {
  priceConfig: PriceConfig[];
  category: 'can_imm' | 'uk_tb' | 'aus_imm';
}

export const PriceCalculator = ({ priceConfig, category }: PriceCalculatorProps) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [familySize, setFamilySize] = useState(0);
  const [receiptAmount, setReceiptAmount] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [showPaymentResult, setShowPaymentResult] = useState(false);

  const { register, handleSubmit, reset, watch } = useForm<FormInputs>();

  const categoryPrices = priceConfig.filter(item => item.category === category);

  const onSubmit = (data: FormInputs) => {
    let total = 0;
    let size = 0;

    categoryPrices.forEach(item => {
      const quantity = parseInt(data[item.id] || '0');
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
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card className="floating-animation">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <FaCalculator className="text-white text-2xl" />
          </div>
          <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">Price Calculator</h3>
          <p className="text-gray-600">Enter the number of people for each age group</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4">
            {categoryPrices.map(item => (
              <div key={item.id} className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                  <div className="flex-1">
                    <span className="font-semibold text-gray-800 text-lg">{item.label}</span>
                    <div className="text-sm text-blue-600 font-medium">
                      {new Intl.NumberFormat('en-US').format(item.price)} FCFA
                    </div>
                  </div>
                  <div className="w-24">
                    <Input
                      {...register(item.id)}
                      type="number"
                      min="0"
                      defaultValue="0"
                      className="text-center font-semibold text-lg"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {familySize > 0 && (
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl text-center shadow-lg pulse-glow">
              <div className="flex items-center justify-center space-x-4">
                {familySize === 1 ? (
                  <FaUser className="text-3xl" />
                ) : (
                  <FaUsers className="text-3xl" />
                )}
                <div>
                  <div className="text-sm opacity-90">Family Size</div>
                  <div className="text-3xl font-bold">{familySize}</div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Button type="submit" className="flex items-center justify-center space-x-2" size="lg">
              <FaCalculator size={18} />
              <span>Calculate</span>
            </Button>
            <Button type="button" variant="clear" onClick={clearForm} className="flex items-center justify-center space-x-2" size="lg">
              <FaEraser size={18} />
              <span>Clear</span>
            </Button>
          </div>

          {totalPrice > 0 && (
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-8 rounded-xl text-center shadow-xl">
              <div className="text-sm opacity-90 mb-2">Total Amount</div>
              <h3 className="text-4xl lg:text-5xl font-bold">
                {new Intl.NumberFormat('en-US').format(totalPrice)} FCFA
              </h3>
            </div>
          )}
        </form>
      </Card>

      {totalPrice > 0 && (
        <Card className="slide-in">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaReceipt className="text-white text-xl" />
            </div>
            <h4 className="text-xl font-bold text-gray-800">Receipt Verification</h4>
            <p className="text-gray-600">Verify payment amount</p>
          </div>
          
          <div className="space-y-6">
            <Input
              type="number"
              placeholder="Enter receipt amount"
              value={receiptAmount || ''}
              onChange={(e) => {
                setReceiptAmount(parseInt(e.target.value) || 0);
                setShowPaymentResult(false);
              }}
              className="text-center font-semibold text-xl py-4"
            />
            
            <Button 
              onClick={handleReceiptCheck} 
              variant="success" 
              className="w-full flex items-center justify-center space-x-2"
              disabled={!receiptAmount}
              size="lg"
            >
              <FaCheck size={18} />
              <span>Verify Payment</span>
            </Button>

            {showPaymentResult && receiptAmount > 0 && (
              <div className="slide-in">
                {remaining === 0 && (
                  <div className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 p-6 rounded-xl text-center font-semibold border-2 border-green-300">
                    <div className="flex items-center justify-center space-x-3 mb-3">
                      <FaCheck className="text-green-600 text-2xl" />
                      <span className="text-2xl font-bold">Payment Complete</span>
                    </div>
                    <div className="text-lg">All amounts match perfectly!</div>
                  </div>
                )}
                {remaining > 0 && (
                  <div className="bg-gradient-to-r from-red-100 to-red-200 text-red-800 p-6 rounded-xl text-center border-2 border-red-300">
                    <div className="font-semibold text-2xl mb-3">⚠️ Payment Incomplete</div>
                    <div className="text-2xl font-bold mb-2">
                      {new Intl.NumberFormat('en-US').format(remaining)} FCFA remaining
                    </div>
                    <div className="text-lg opacity-80">
                      Please complete the payment
                    </div>
                  </div>
                )}
                {remaining < 0 && (
                  <div className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 p-6 rounded-xl text-center border-2 border-green-300">
                    <div className="flex items-center justify-center space-x-3 mb-3">
                      <FaCheck className="text-green-600 text-2xl" />
                      <span className="text-2xl font-bold">Payment Complete</span>
                    </div>
                    <div className="text-lg">
                      <span className="font-semibold">Surplus:</span> {new Intl.NumberFormat('en-US').format(Math.abs(remaining))} FCFA
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};