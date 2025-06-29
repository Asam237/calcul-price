import { PriceConfig } from "@/types";

export const defaultPriceConfig: PriceConfig[] = [
  // CAN_IMM Prices
  {
    id: "can_less_4",
    label: "Less than 4 years",
    price: 74750,
    category: "can_imm",
  },
  { id: "can_5_10", label: "5 to 10 years", price: 77625, category: "can_imm" },
  {
    id: "can_11_14",
    label: "11 to 14 years",
    price: 89125,
    category: "can_imm",
  },
  {
    id: "can_15_plus",
    label: "15 years and above",
    price: 110400,
    category: "can_imm",
  },

  // UK_TB Prices
  {
    id: "uk_less_11",
    label: "Less than 11 years",
    price: 37375,
    category: "uk_tb",
  },
  {
    id: "uk_11_plus",
    label: "11 years and above",
    price: 48875,
    category: "uk_tb",
  },

  // AUS_IMM Prices
  {
    id: "aus_11_plus",
    label: "11 years and above",
    price: 110400,
    category: "aus_imm",
  },
];
