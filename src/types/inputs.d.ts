import { Component } from "vue";

export type TextPropType = {
  id: string;
  name?: string;
  type: "text" | "password";
  placeholder?: string;
  modelValue?: string;
  isOptional?: boolean;
  isSearchable?: boolean;
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
};

export type ButtonEmitType = {
  (e: "triggerEvent"): void;
};

export type CheckboxPropType = {
  id?: string;
  text: string;
  modelValue: boolean;
};

export type CheckboxEmitType = {
  (e: "update:modelValue", value: boolean): void;
};

export type DropdownPropType = {
  selectOption: {
    name: string;
    value: string;
    icon?: Component;
  };
  options: {
    name: string;
    value: string;
    icon?: Component;
  }[];
  isSearchable?: string;
};

export type TogglePropType = {
  id: string;
  label: string;
  modelValue: boolean;
};
