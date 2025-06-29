import { useState, useEffect } from 'react';
import { PriceConfig } from '@/types';
import { defaultPriceConfig } from '@/data/priceConfig';

export const usePriceConfig = () => {
  const [priceConfig, setPriceConfig] = useState<PriceConfig[]>(defaultPriceConfig);

  useEffect(() => {
    const savedConfig = localStorage.getItem('priceConfig');
    if (savedConfig) {
      setPriceConfig(JSON.parse(savedConfig));
    }
  }, []);

  const updatePriceConfig = (newConfig: PriceConfig[]) => {
    setPriceConfig(newConfig);
    localStorage.setItem('priceConfig', JSON.stringify(newConfig));
  };

  const updatePrice = (id: string, newPrice: number) => {
    const updatedConfig = priceConfig.map(item =>
      item.id === id ? { ...item, price: newPrice } : item
    );
    updatePriceConfig(updatedConfig);
  };

  const addPriceItem = (item: Omit<PriceConfig, 'id'>) => {
    const newItem: PriceConfig = {
      ...item,
      id: `${item.category}_${Date.now()}`
    };
    updatePriceConfig([...priceConfig, newItem]);
  };

  const removePriceItem = (id: string) => {
    const updatedConfig = priceConfig.filter(item => item.id !== id);
    updatePriceConfig(updatedConfig);
  };

  return {
    priceConfig,
    updatePrice,
    addPriceItem,
    removePriceItem,
    resetToDefault: () => updatePriceConfig(defaultPriceConfig)
  };
};