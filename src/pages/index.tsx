import { useState } from 'react';
import { DefaultLayout } from '@/components/layout';
import { PriceCalculator } from '@/components/PriceCalculator';
import { AdminPanel } from '@/components/AdminPanel';
import { usePriceConfig } from '@/hooks/usePriceConfig';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FaExclamation, FaCog, FaCalculator, FaGlobe, FaInfoCircle } from 'react-icons/fa';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<'can_imm' | 'uk_tb' | 'aus_imm'>('can_imm');
  const [showInfo, setShowInfo] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  
  const { priceConfig, updatePrice, addPriceItem, removePriceItem, resetToDefault } = usePriceConfig();

  const categories = [
    { id: 'can_imm' as const, label: 'CAN Immigration', flag: '/images/can.png', color: 'from-red-500 to-red-600' },
    { id: 'uk_tb' as const, label: 'UK Tuberculosis', flag: '/images/uk.png', color: 'from-blue-500 to-blue-600' },
    { id: 'aus_imm' as const, label: 'AUS Immigration', flag: '/images/aus.png', color: 'from-green-500 to-green-600' },
  ];

  return (
    <DefaultLayout>
      <div className="min-h-screen py-8 px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-6 mb-6">
            <div className="floating-animation">
              <img src="/images/logo-02.png" alt="OIM Logo" className="w-auto h-20 drop-shadow-2xl" />
            </div>
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 hover:border-white/50 rounded-full flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
            >
              <FaInfoCircle size={16} className="text-white" />
            </button>
          </div>

          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">
              OIM Price Calculator
            </h1>
            <p className="text-blue-100 text-lg">
              Organisation Internationale pour les Migrations
            </p>
          </div>

          {showInfo && (
            <Card className="max-w-md mx-auto mb-8 slide-in">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaExclamation className="text-white text-lg" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Payment Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-lg">
                    <div className="font-semibold text-gray-700 mb-1">Bank</div>
                    <div className="text-blue-600 font-bold">ECOBANK</div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-lg">
                    <div className="font-semibold text-gray-700 mb-1">Account Number</div>
                    <div className="text-green-600 font-bold text-lg">30830023091</div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Mode Toggle */}
          <div className="flex justify-center space-x-4 mb-8">
            <Button
              onClick={() => setIsAdminMode(false)}
              variant={!isAdminMode ? 'primary' : 'secondary'}
              className="flex items-center space-x-2 shadow-xl"
              size="lg"
            >
              <FaCalculator size={18} />
              <span>Calculator</span>
            </Button>
            <Button
              onClick={() => setIsAdminMode(true)}
              variant={isAdminMode ? 'primary' : 'secondary'}
              className="flex items-center space-x-2 shadow-xl"
              size="lg"
            >
              <FaCog size={18} />
              <span>Administration</span>
            </Button>
          </div>
        </div>

        {!isAdminMode ? (
          <>
            {/* Category Selection */}
            <div className="flex justify-center space-x-4 mb-12 flex-wrap">
              {categories.map(category => (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  variant={selectedCategory === category.id ? 'primary' : 'outline'}
                  className="flex items-center space-x-3 mb-2 shadow-lg"
                  size="lg"
                >
                  <img src={category.flag} className="w-6 h-6 rounded-sm shadow-sm" alt={category.label} />
                  <span className="font-semibold">{category.label}</span>
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