import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PriceConfig, AdminFormInputs } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

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

  const groupedConfig = priceConfig.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, PriceConfig[]>);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Price Administration</h2>
        <div className="space-x-2">
          <Button onClick={() => setIsAddModalOpen(true)} className="flex items-center space-x-2">
            <FaPlus size={14} />
            <span>Add Price</span>
          </Button>
          <Button onClick={onResetToDefault} variant="secondary">
            Reset to Default
          </Button>
        </div>
      </div>

      {Object.entries(groupedConfig).map(([category, items]) => (
        <Card key={category}>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {categoryLabels[category as keyof typeof categoryLabels]}
          </h3>
          <div className="space-y-3">
            {items.map(item => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium text-gray-800">{item.label}</span>
                  <div className="text-sm text-gray-600">
                    {new Intl.NumberFormat('en-US').format(item.price)} FCFA
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" onClick={() => startEdit(item)} className="flex items-center space-x-1">
                    <FaEdit size={12} />
                    <span>Edit</span>
                  </Button>
                  <Button 
                    size="sm" 
                    variant="danger" 
                    onClick={() => onRemoveItem(item.id)}
                    className="flex items-center space-x-1"
                  >
                    <FaTrash size={12} />
                    <span>Delete</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}

      {/* Add Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Price Item"
      >
        <form onSubmit={handleSubmitAdd(onAddSubmit)} className="space-y-4">
          <Input
            {...registerAdd('label', { required: true })}
            label="Label"
            placeholder="e.g., 5 to 10 years"
          />
          <Input
            {...registerAdd('price', { required: true, valueAsNumber: true })}
            label="Price (FCFA)"
            type="number"
            min="0"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              {...registerAdd('category', { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="can_imm">CAN Immigration</option>
              <option value="uk_tb">UK Tuberculosis</option>
              <option value="aus_imm">AUS Immigration</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <Button type="submit" className="flex-1">Add</Button>
            <Button type="button" variant="secondary" onClick={() => setIsAddModalOpen(false)} className="flex-1">
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
        <form onSubmit={handleSubmitEdit(onEditSubmit)} className="space-y-4">
          <Input
            {...registerEdit('price', { required: true, valueAsNumber: true })}
            label="Price (FCFA)"
            type="number"
            min="0"
          />
          <div className="flex space-x-2">
            <Button type="submit" className="flex-1">Update</Button>
            <Button type="button" variant="secondary" onClick={() => setEditingItem(null)} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};