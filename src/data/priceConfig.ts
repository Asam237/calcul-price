import { PriceConfig } from "@/types";

export const defaultPriceConfig: PriceConfig[] = [
  // CAN_IMM Prices.
  {
    id: "can_less_5",
    label: "Less than 5 years",
    price: 72485,
    category: "can_imm",
  },
  { id: "can_5_10", label: "5 to 10 years", price: 75275, category: "can_imm" },
  {
    id: "can_11_14",
    label: "11 to 14 years",
    price: 86425,
    category: "can_imm",
  },
  {
    id: "can_15_plus",
    label: "15 years and above",
    price: 107055,
    category: "can_imm",
  },

  // UK_TB Prices.
  {
    id: "uk_less_11",
    label: "Less than 11 years",
    price: 36245,
    category: "uk_tb",
  },
  {
    id: "uk_11_plus",
    label: "11 years and above",
    price: 47395,
    category: "uk_tb",
  },

  // AUS_IMM Prices.
  {
    id: "aus_less_2",
    label: "Less than 2 years",
    price: 50380,
    category: "aus_imm",
  },
  {
    id: "aus_2_11",
    label: "5 t 10 years",
    price: 58305,
    category: "aus_imm",
  },
  {
    id: "aus_11_14",
    label: "11 to 14 years",
    price: 61700,
    category: "aus_imm",
  },
  {
    id: "aus_15_plus",
    label: "15 years and above",
    price: 75855,
    category: "aus_imm",
  },
  // NZ_IMM Prices.
  {
    id: "nz_less_5",
    label: "Less than 11 years",
    price: 58305,
    category: "nz_imm",
  },
  {
    id: "nz_11_14",
    label: "11 to 14 years",
    price: 61700,
    category: "nz_imm",
  },
  {
    id: "nz_15_plus",
    label: "15 years and above",
    price: 75855,
    category: "nz_imm",
  },
];
