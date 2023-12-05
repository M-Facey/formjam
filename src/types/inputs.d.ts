import { Component } from "vue";

interface BaseInput {
  id: string;
  type: "text" | "password";
  placeholder?: string;
  isOptional?: string;
  dataCy: string;
}

export interface ValidatedInputPropType extends BaseInput {
  label: string;
  name: string;
  required?: boolean;
  autocomplete: string;
}

export type TextPropType = {
  id: string;
  name?: string;
  label?: string;
  type: "text" | "password";
  placeholder?: string;
  modelValue?: string;
  isOptional?: boolean;
  isSearchable?: boolean;
  max?: string;
  min?: string;
  dataCy?: string;
};

export type TextEmitType = {
  (e: "update:modelValue", value: string): void;
};

export type ButtonPropType = {
  text: string;
  hasIcon?: boolean;
  reverseOrder?: boolean;
  align?: "left" | "center" | "right";
  size?: "compact" | "expand";
  loading?: boolean;
  dataCy?: string;
};

export type ButtonEmitType = {
  (e: "triggerEvent"): void;
};

export type CheckboxPropType = {
  id: string;
  text: string;
  modelValue: boolean;
  dataCy?: string;
};

export type CheckboxEmitType = {
  (e: "update:modelValue", value: boolean): void;
};

export type DropdownOption = {
  name: string;
  value: string;
  icon?: Component;
};

export type DropdownPropType = {
  modelValue: DropdownOption;
  options: DropdownOption[];
  isSearchable?: boolean;
  showSelectedOption?: boolean;
};

export type DropdownEmitType = {
  (e: "update:modelValue", value: DropdownOption): void;
  (e: "triggerEvent", value: string): void;
};

export type TogglePropType = {
  id: string;
  label: string;
  modelValue: boolean;
};
