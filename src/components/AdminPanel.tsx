import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PriceConfig, AdminFormInputs } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { FaEdit, FaTrash, FaPlus, FaCog, FaUndo, FaDollarSign } from 'react-icons/fa';

interface AdminPanelProps {
  priceConfig: PriceConfig[];
  onUpdatePrice: (id: string, newPrice: number) => void;
  onAddItem: (item: Omit<PriceConfig, 'id'>) => void;
  onRemoveItem: (id: string) => void;
  onResetToDefault: () => void;
}

export const AdminPanel = ({
  priceConfig,
  onUpdatePrice,
  onAddItem,
  onRemoveItem,
  onResetToDefault
}: AdminPanelProps) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PriceConfig | null>(null);

  const { register: registerAdd, handleSubmit: handleSubmitAdd, reset: resetAdd } = useForm<AdminFormInputs>();
  const { register: registerEdit, handleSubmit: handleSubmitEdit, reset: resetEdit, setValue } = useForm<{ price: number }>();

  const onAddSubmit = (data: AdminFormInputs) => {
    onAddItem(data);
    resetAdd();
    setIsAddModalOpen(false);
  };

  const onEditSubmit = (data: { price: number }) => {
    if (editingItem) {
      onUpdatePrice(editingItem.id, data.price);
      setEditingItem(null);
      resetEdit();
    }
  };

  const startEdit = (item: PriceConfig) => {
    setEditingItem(item);
    setValue('price', item.price);
  };

  const categoryLabels = {
    can_imm: 'CAN Immigration',
    uk_tb: 'UK Tuberculosis',
    aus_imm: 'AUS Immigration'
  };

  const categoryColors = {
    can_imm: 'from-red-500 to-red-600',
    uk_tb: 'from-blue-500 to-blue-600',
    aus_imm: 'from-green-500 to-green-600'
  };

  const groupedConfig = priceConfig.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, PriceConfig[]>);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl floating-animation">
          <FaCog className="text-white text-3xl" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Price Administration</h2>
        <p className="text-blue-100">Manage pricing configuration for all categories</p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 mb-8">
        <Button 
          onClick={() => setIsAddModalOpen(true)} 
          className="flex items-center space-x-2 shadow-xl"
        >
          <FaPlus size={16} />
          <span>Add New Price</span>
        </Button>
        <Button 
          onClick={onResetToDefault} 
          variant="outline"
          className="flex items-center space-x-2"
        >
          <FaUndo size={16} />
          <span>Reset to Default</span>
        </Button>
      </div>

      {/* Categories Grid */}
      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {Object.entries(groupedConfig).map(([category, items]) => (
          <Card key={category} className="slide-in">
            <div className="text-center mb-6">
              <div className={`w-12 h-12 bg-gradient-to-r ${categoryColors[category as keyof typeof categoryColors]} rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                <FaDollarSign className="text-white text-lg" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                {categoryLabels[category as keyof typeof categoryLabels]}
              </h3>
              <div className="text-sm text-gray-600 mt-1">
                {items.length} price {items.length === 1 ? 'item' : 'items'}
              </div>
            </div>

            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 mb-1">{item.label}</div>
                      <div className="text-lg font-bold text-blue-600">
                        {new Intl.NumberFormat('en-US').format(item.price)} FCFA
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        onClick={() => startEdit(item)} 
                        className="flex items-center space-x-1 shadow-md"
                      >
                        <FaEdit size={12} />
                        <span>Edit</span>
                      </Button>
                      <Button 
                        size="sm" 
                        variant="danger" 
                        onClick={() => onRemoveItem(item.id)}
                        className="flex items-center space-x-1 shadow-md"
                      >
                        <FaTrash size={12} />
                        <span>Delete</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Add Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Price Item"
      >
        <form onSubmit={handleSubmitAdd(onAddSubmit)} className="space-y-6">
          <Input
            {...registerAdd('label', { required: true })}
            label="Age Group Label"
            placeholder="e.g., 5 to 10 years"
            icon={<FaEdit />}
          />
          <Input
            {...registerAdd('price', { required: true, valueAsNumber: true })}
            label="Price (FCFA)"
            type="number"
            min="0"
            placeholder="Enter price"
            icon={<FaDollarSign />}
          />
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select
              {...registerAdd('category', { required: true })}
              className="input-modern"
            >
              <option value="">Select a category</option>
              <option value="can_imm">CAN Immigration</option>
              <option value="uk_tb">UK Tuberculosis</option>
              <option value="aus_imm">AUS Immigration</option>
            </select>
          </div>
          <div className="flex space-x-3 pt-4">
            <Button type="submit" className="flex-1">Add Price Item</Button>
            <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        title={`Edit: ${editingItem?.label}`}
      >
        <form onSubmit={handleSubmitEdit(onEditSubmit)} className="space-y-6">
          <Input
            {...registerEdit('price', { required: true, valueAsNumber: true })}
            label="Price (FCFA)"
            type="number"
            min="0"
            icon={<FaDollarSign />}
          />
          <div className="flex space-x-3 pt-4">
            <Button type="submit" className="flex-1">Update Price</Button>
            <Button type="button" variant="outline" onClick={() => setEditingItem(null)} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};