export interface PriceConfig {
  id: string;
  label: string;
  price: number;
  category: 'can_imm' | 'uk_tb' | 'aus_imm';
}

export interface FormInputs {
  [key: string]: string;
}

export interface AdminFormInputs {
  label: string;
  price: number;
  category: 'can_imm' | 'uk_tb' | 'aus_imm';
}