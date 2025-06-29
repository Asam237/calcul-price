import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PriceConfig, FormInputs } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { FaUsers, FaUser, FaCalculator, FaEraser, FaReceipt } from 'react-icons/fa';

interface PriceCalculatorProps {
  priceConfig: PriceConfig[];
  category: 'can_imm' | 'uk_tb' | 'aus_imm';
}

export const PriceCalculator = ({ priceConfig, category }: PriceCalculatorProps) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [familySize, setFamilySize] = useState(0);
  const [receiptAmount, setReceiptAmount] = useState(0);
  const [remaining, setRemaining] = useState(0);

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
  };

  const clearForm = () => {
    reset();
    setTotalPrice(0);
    setFamilySize(0);
    setReceiptAmount(0);
    setRemaining(0);
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <Card className="floating-animation">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <FaCalculator className="text-white text-2xl" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Price Calculator</h3>
          <p className="text-gray-600">Enter the number of people for each age group</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {categoryPrices.map(item => (
            <div key={item.id} className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                <div>
                  <span className="font-semibold text-gray-800">{item.label}</span>
                  <div className="text-sm text-blue-600 font-medium">
                    {new Intl.NumberFormat('en-US').format(item.price)} FCFA
                  </div>
                </div>
                <div className="w-20">
                  <Input
                    {...register(item.id)}
                    type="number"
                    min="0"
                    defaultValue="0"
                    className="text-center font-semibold"
                  />
                </div>
              </div>
            </div>
          ))}

          {familySize > 0 && (
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl text-center shadow-lg pulse-glow">
              <div className="flex items-center justify-center space-x-3">
                {familySize === 1 ? (
                  <FaUser className="text-2xl" />
                ) : (
                  <FaUsers className="text-2xl" />
                )}
                <div>
                  <div className="text-sm opacity-90">Family Size</div>
                  <div className="text-2xl font-bold">{familySize}</div>
                </div>
              </div>
            </div>
          )}

          <div className="flex space-x-3">
            <Button type="submit" className="flex-1 flex items-center justify-center space-x-2">
              <FaCalculator size={16} />
              <span>Calculate</span>
            </Button>
            <Button type="button" variant="outline" onClick={clearForm} className="flex-1 flex items-center justify-center space-x-2">
              <FaEraser size={16} />
              <span>Clear</span>
            </Button>
          </div>

          {totalPrice > 0 && (
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl text-center shadow-xl">
              <div className="text-sm opacity-90 mb-1">Total Amount</div>
              <h3 className="text-3xl font-bold">
                {new Intl.NumberFormat('en-US').format(totalPrice)} FCFA
              </h3>
            </div>
          )}
        </form>
      </Card>

      {totalPrice > 0 && (
        <Card className="slide-in">
          <div className="text-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaReceipt className="text-white text-lg" />
            </div>
            <h4 className="text-lg font-bold text-gray-800">Receipt Verification</h4>
            <p className="text-gray-600 text-sm">Verify payment amount</p>
          </div>
          
          <div className="space-y-4">
            <Input
              type="number"
              placeholder="Enter receipt amount"
              value={receiptAmount || ''}
              onChange={(e) => setReceiptAmount(parseInt(e.target.value) || 0)}
              className="text-center font-semibold text-lg"
            />
            
            <Button onClick={handleReceiptCheck} variant="success" className="w-full">
              Verify Payment
            </Button>

            {receiptAmount > 0 && (
              <div className="mt-4">
                {remaining === 0 && (
                  <div className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 p-4 rounded-xl text-center font-semibold">
                    ✅ Payment Complete
                  </div>
                )}
                {remaining > 0 && (
                  <div className="bg-gradient-to-r from-red-100 to-red-200 text-red-800 p-4 rounded-xl text-center">
                    <div className="font-semibold">⚠️ Payment Incomplete</div>
                    <div className="text-lg font-bold mt-1">
                      {new Intl.NumberFormat('en-US').format(remaining)} FCFA remaining
                    </div>
                  </div>
                )}
                {remaining < 0 && (
                  <div className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 p-4 rounded-xl text-center">
                    <div className="font-semibold">✅ Payment Complete</div>
                    <div className="text-sm mt-1">
                      Surplus: {new Intl.NumberFormat('en-US').format(Math.abs(remaining))} FCFA
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