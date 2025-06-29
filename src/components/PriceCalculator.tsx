import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PriceConfig, FormInputs } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

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
    <Card className="max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {categoryPrices.map(item => (
          <div key={item.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                {new Intl.NumberFormat('en-US').format(item.price)} FCFA
              </span>
            </div>
            <Input
              {...register(item.id)}
              type="number"
              min="0"
              defaultValue="0"
              className="text-center"
            />
          </div>
        ))}

        {familySize > 0 && (
          <div className="bg-blue-50 p-3 rounded-lg text-center">
            <div className="flex items-center justify-center space-x-2">
              <img 
                src={familySize === 1 ? "/images/man.png" : "/images/families.png"} 
                className="w-5 h-5" 
                alt="family"
              />
              <span className="text-sm font-medium text-blue-800">
                Family size: {familySize}
              </span>
            </div>
          </div>
        )}

        <div className="flex space-x-2">
          <Button type="submit" className="flex-1">
            Calculate
          </Button>
          <Button type="button" variant="secondary" onClick={clearForm} className="flex-1">
            Clear
          </Button>
        </div>

        {totalPrice > 0 && (
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-lg text-center">
            <h3 className="text-lg font-bold">
              {new Intl.NumberFormat('en-US').format(totalPrice)} FCFA
            </h3>
          </div>
        )}
      </form>

      {totalPrice > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Receipt Verification</h4>
          <div className="flex space-x-2">
            <Input
              type="number"
              placeholder="Receipt amount"
              value={receiptAmount}
              onChange={(e) => setReceiptAmount(parseInt(e.target.value) || 0)}
              className="flex-1"
            />
            <Button onClick={handleReceiptCheck} variant="success" size="sm">
              Check
            </Button>
          </div>

          {receiptAmount > 0 && (
            <div className="mt-3">
              {remaining === 0 && (
                <div className="bg-green-100 text-green-800 p-2 rounded text-sm text-center">
                  ✓ Payment is complete
                </div>
              )}
              {remaining > 0 && (
                <div className="bg-red-100 text-red-800 p-2 rounded text-sm text-center">
                  {new Intl.NumberFormat('en-US').format(remaining)} FCFA remaining
                </div>
              )}
              {remaining < 0 && (
                <div className="bg-green-100 text-green-800 p-2 rounded text-sm text-center">
                  ✓ Payment complete with {new Intl.NumberFormat('en-US').format(Math.abs(remaining))} FCFA surplus
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </Card>
  );
};