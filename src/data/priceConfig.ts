import { PriceConfig } from "@/types";

export const defaultPriceConfig: PriceConfig[] = [
  // CAN_IMM Prices
  {
    id: "can_less_5",
    label: "Less than 5 years",
    price: 72605,
    category: "can_imm",
  },
  { id: "can_5_10", label: "5 to 10 years", price: 75395, category: "can_imm" },
  {
    id: "can_11_14",
    label: "11 to 14 years",
    price: 86565,
    category: "can_imm",
  },
  {
    id: "can_15_plus",
    label: "15 years and above",
    price: 107230,
    category: "can_imm",
  },

  // UK_TB Prices
  {
    id: "uk_less_11",
    label: "Less than 11 years",
    price: 36300,
    category: "uk_tb",
  },
  {
    id: "uk_11_plus",
    label: "11 years and above",
    price: 47470,
    category: "uk_tb",
  },

  // AUS_IMM Prices
  {
    id: "aus_less_2",
    label: "Less than 2 years",
    price: 49975,
    category: "aus_imm",
  },
  {
    id: "aus_2_11",
    label: "5 t 10 years",
    price: 57850,
    category: "aus_imm",
  },
  {
    id: "aus_11_14",
    label: "11 to 14 years",
    price: 61215,
    category: "aus_imm",
  },
  {
    id: "aus_15_plus",
    label: "15 years and above",
    price: 75250,
    category: "aus_imm",
  },
  // NZ_IMM Prices
  {
    id: "nz_less_5",
    label: "Less than 11 years",
    price: 57845,
    category: "nz_imm",
  },
  // { id: "nz_5_10", label: "5 to 10 years", price: 77625, category: "nz_imm" },
  {
    id: "nz_11_14",
    label: "11 to 14 years",
    price: 61215,
    category: "nz_imm",
  },
  {
    id: "nz_15_plus",
    label: "15 years and above",
    price: 75255,
    category: "nz_imm",
  },
];
