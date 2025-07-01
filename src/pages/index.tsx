import { useState } from "react";
import { DefaultLayout } from "@/components/layout";
import { PriceCalculator } from "@/components/PriceCalculator";
import { AdminPanel } from "@/components/AdminPanel";
import { usePriceConfig } from "@/hooks/usePriceConfig";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  FaExclamation,
  FaCog,
  FaCalculator,
  FaInfoCircle,
} from "react-icons/fa";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    "can_imm" | "uk_tb" | "aus_imm"
  >("can_imm");
  const [showInfo, setShowInfo] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const {
    priceConfig,
    updatePrice,
    addPriceItem,
    removePriceItem,
    resetToDefault,
  } = usePriceConfig();

  const categories = [
    {
      id: "can_imm" as const,
      label: "CAN Immigration",
      flag: "/images/can.png",
      color: "from-red-500 to-red-600",
    },
    {
      id: "uk_tb" as const,
      label: "UK Tuberculosis",
      flag: "/images/uk.png",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "aus_imm" as const,
      label: "AUS Immigration",
      flag: "/images/aus.png",
      color: "from-green-500 to-green-600",
    },
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
      <div className="w-full max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8 lg:mb-12">
          <div className="flex items-center justify-center space-x-6 mb-6">
            <div className="floating-animation">
              <img
                src="/images/logo-02.png"
                alt="OIM Logo"
                className="w-auto h-16 lg:h-24 drop-shadow-2xl"
              />
            </div>
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 hover:border-white/50 rounded-full flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
            >
              <FaInfoCircle size={16} className="text-white" />
            </button>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl lg:text-5xl font-bold text-white mb-3 drop-shadow-lg">
              OIM Price Calculator
            </h1>
            <p className="text-blue-100 text-lg lg:text-xl">
              Organisation Internationale pour les Migrations
            </p>
          </div>

          {showInfo && (
            <Card className="max-w-md mx-auto mb-8 slide-in">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaExclamation className="text-white text-lg" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Payment Information
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-lg">
                    <div className="font-semibold text-gray-700 mb-1">Bank</div>
                    <div className="text-blue-600 font-bold">ECOBANK</div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-lg">
                    <div className="font-semibold text-gray-700 mb-1">
                      Account Number
                    </div>
                    <div className="text-green-600 font-bold text-lg">
                      30830023091
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Mode Toggle */}
          <div className="flex justify-center space-x-4 mb-8">
            <Button
              onClick={() => setIsAdminMode(false)}
              variant={!isAdminMode ? "primary" : "secondary"}
              className="flex items-center space-x-2 shadow-xl"
              size="lg"
            >
              <FaCalculator size={18} />
              <span>Calculator</span>
            </Button>
            <Button
              onClick={() => setIsAdminMode(true)}
              variant={isAdminMode ? "primary" : "secondary"}
              className="flex items-center space-x-2 shadow-xl"
              size="lg"
            >
              <FaCog size={18} />
              <span>Administration</span>
            </Button>
          </div>
        </div>

        {!isAdminMode ? (
          <div className="grid lg:grid-cols-2 gap-8 xl:gap-12 items-start">
            {/* Left Column - Category Selection */}
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Select Category
                </h2>
                <p className="text-blue-100 mb-6">
                  Choose the type of medical examination
                </p>
              </div>

              <div className="grid gap-4">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    variant={
                      selectedCategory === category.id ? "primary" : "outline"
                    }
                    className="flex items-center justify-start space-x-4 p-6 text-left shadow-lg h-auto"
                    size="lg"
                  >
                    <img
                      src={category.flag}
                      className="w-8 h-8 rounded-sm shadow-sm"
                      alt={category.label}
                    />
                    <div>
                      <div className="font-bold text-lg">{category.label}</div>
                      <div className="text-sm opacity-80">
                        {
                          priceConfig.filter(
                            (item) => item.category === category.id
                          ).length
                        }{" "}
                        price options
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Right Column - Price Calculator */}
            <div className="lg:sticky lg:top-8">
              <PriceCalculator
                priceConfig={priceConfig}
                category={selectedCategory}
              />
            </div>
          </div>
        ) : (
          /* Admin Panel - Full Width */
          <div className="w-full">
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
    </DefaultLayout>
  );
};

export default Home;
