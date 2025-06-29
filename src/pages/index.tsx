import { useState } from 'react';
import { DefaultLayout } from '@/components/layout';
import { PriceCalculator } from '@/components/PriceCalculator';
import { AdminPanel } from '@/components/AdminPanel';
import { usePriceConfig } from '@/hooks/usePriceConfig';
import { Button } from '@/components/ui/Button';
import { FaExclamation, FaCog, FaCalculator } from 'react-icons/fa';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<'can_imm' | 'uk_tb' | 'aus_imm'>('can_imm');
  const [showInfo, setShowInfo] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  
  const { priceConfig, updatePrice, addPriceItem, removePriceItem, resetToDefault } = usePriceConfig();

  const categories = [
    { id: 'can_imm' as const, label: 'CAN Immigration', flag: '/images/can.png' },
    { id: 'uk_tb' as const, label: 'UK Tuberculosis', flag: '/images/uk.png' },
    { id: 'aus_imm' as const, label: 'AUS Immigration', flag: '/images/aus.png' },
  ];

  return (
    <DefaultLayout>
      <div className="min-h-screen py-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <img src="/images/logo-02.png" alt="logo" className="w-auto h-16" />
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="border rounded-full p-2 border-gray-400 hover:border-gray-300 transition-colors"
            >
              <FaExclamation size={12} className="text-gray-400" />
            </button>
          </div>

          {showInfo && (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6 max-w-md mx-auto">
              <p className="text-sm font-semibold text-white mb-2">Payment Information:</p>
              <div className="text-xs space-y-2 text-gray-200">
                <div>Bank: <span className="bg-white/20 px-2 py-1 rounded">ECOBANK</span></div>
                <div>Account: <span className="bg-white/20 px-2 py-1 rounded">30830023091</span></div>
              </div>
            </div>
          )}

          {/* Mode Toggle */}
          <div className="flex justify-center space-x-2 mb-6">
            <Button
              onClick={() => setIsAdminMode(false)}
              variant={!isAdminMode ? 'primary' : 'secondary'}
              className="flex items-center space-x-2"
            >
              <FaCalculator size={14} />
              <span>Calculator</span>
            </Button>
            <Button
              onClick={() => setIsAdminMode(true)}
              variant={isAdminMode ? 'primary' : 'secondary'}
              className="flex items-center space-x-2"
            >
              <FaCog size={14} />
              <span>Admin</span>
            </Button>
          </div>
        </div>

        {!isAdminMode ? (
          <>
            {/* Category Selection */}
            <div className="flex justify-center space-x-2 mb-8 flex-wrap">
              {categories.map(category => (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  variant={selectedCategory === category.id ? 'primary' : 'secondary'}
                  className="flex items-center space-x-2 mb-2"
                >
                  <img src={category.flag} className="w-4 h-4" alt={category.label} />
                  <span className="text-xs">{category.label}</span>
                </Button>
              ))}
            </div>

            {/* Price Calculator */}
            <PriceCalculator 
              priceConfig={priceConfig} 
              category={selectedCategory} 
            />
          </>
        ) : (
          /* Admin Panel */
          <AdminPanel
            priceConfig={priceConfig}
            onUpdatePrice={updatePrice}
            onAddItem={addPriceItem}
            onRemoveItem={removePriceItem}
            onResetToDefault={resetToDefault}
          />
        )}
      </div>
    </DefaultLayout>
  );
};

export default Home;