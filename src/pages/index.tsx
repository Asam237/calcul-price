import { useState } from 'react';
import { DefaultLayout } from '@/components/layout';
import { PriceCalculator } from '@/components/PriceCalculator';
import { AdminPanel } from '@/components/AdminPanel';
import { usePriceConfig } from '@/hooks/usePriceConfig';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FaExclamation, FaCog, FaCalculator, FaInfoCircle, FaExpand } from 'react-icons/fa';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<'can_imm' | 'uk_tb' | 'aus_imm'>('can_imm');
  const [showInfo, setShowInfo] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const { priceConfig, updatePrice, addPriceItem, removePriceItem, resetToDefault } = usePriceConfig();

  const categories = [
    { id: 'can_imm' as const, label: 'CAN Immigration', flag: '/images/can.png', color: 'from-red-500 to-red-600' },
    { id: 'uk_tb' as const, label: 'UK Tuberculosis', flag: '/images/uk.png', color: 'from-blue-500 to-blue-600' },
    { id: 'aus_imm' as const, label: 'AUS Immigration', flag: '/images/aus.png', color: 'from-green-500 to-green-600' },
  ];

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="h-full flex flex-col overflow-hidden">
        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          className="fixed top-4 right-4 z-50 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 hover:border-white/50 rounded-full flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
        >
          <FaExpand size={14} className="text-white" />
        </button>

        {/* Compact Header */}
        <div className="flex-shrink-0 text-center py-4 px-4">
          <div className="flex items-center justify-center space-x-4 mb-3">
            <div className="floating-animation">
              <img src="/images/logo-02.png" alt="OIM Logo" className="w-auto h-12 drop-shadow-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white drop-shadow-lg">
                OIM Price Calculator
              </h1>
              <p className="text-blue-100 text-sm">
                Organisation Internationale pour les Migrations
              </p>
            </div>
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 hover:border-white/50 rounded-full flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
            >
              <FaInfoCircle size={14} className="text-white" />
            </button>
          </div>

          {/* Mode Toggle */}
          <div className="flex justify-center space-x-3 mb-4">
            <Button
              onClick={() => setIsAdminMode(false)}
              variant={!isAdminMode ? 'primary' : 'secondary'}
              className="flex items-center space-x-2"
              size="sm"
            >
              <FaCalculator size={14} />
              <span>Calculator</span>
            </Button>
            <Button
              onClick={() => setIsAdminMode(true)}
              variant={isAdminMode ? 'primary' : 'secondary'}
              className="flex items-center space-x-2"
              size="sm"
            >
              <FaCog size={14} />
              <span>Administration</span>
            </Button>
          </div>

          {/* Info Panel - Compact */}
          {showInfo && (
            <div className="max-w-sm mx-auto mb-4 slide-in">
              <Card className="p-4">
                <div className="text-center">
                  <h3 className="text-sm font-bold text-gray-800 mb-3">Payment Information</h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-2 rounded-lg">
                      <div className="font-semibold text-gray-700">Bank</div>
                      <div className="text-blue-600 font-bold">ECOBANK</div>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-2 rounded-lg">
                      <div className="font-semibold text-gray-700">Account</div>
                      <div className="text-green-600 font-bold">30830023091</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden px-4">
          {!isAdminMode ? (
            <div className="h-full grid lg:grid-cols-3 gap-4">
              {/* Left Column - Category Selection - Compact */}
              <div className="lg:col-span-1 flex flex-col">
                <div className="text-center lg:text-left mb-3">
                  <h2 className="text-lg font-bold text-white mb-1">Select Category</h2>
                  <p className="text-blue-100 text-sm">Choose examination type</p>
                </div>
                
                <div className="flex lg:flex-col gap-2 flex-1">
                  {categories.map(category => (
                    <Button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      variant={selectedCategory === category.id ? 'primary' : 'outline'}
                      className="flex items-center justify-start space-x-3 p-3 text-left shadow-lg h-auto flex-1 lg:flex-none"
                      size="sm"
                    >
                      <img src={category.flag} className="w-6 h-6 rounded-sm shadow-sm" alt={category.label} />
                      <div className="text-left">
                        <div className="font-bold text-sm">{category.label}</div>
                        <div className="text-xs opacity-80">
                          {priceConfig.filter(item => item.category === category.id).length} options
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Right Column - Price Calculator */}
              <div className="lg:col-span-2 overflow-hidden">
                <PriceCalculator 
                  priceConfig={priceConfig} 
                  category={selectedCategory} 
                />
              </div>
            </div>
          ) : (
            /* Admin Panel - Full Width with scroll */
            <div className="h-full overflow-y-auto">
              <AdminPanel
                priceConfig={priceConfig}
                onUpdatePrice={updatePrice}
                onAddItem={addPriceItem}
                onRemoveItem={removePriceItem}
                onResetToDefault={resetToDefault}
              />
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Home;