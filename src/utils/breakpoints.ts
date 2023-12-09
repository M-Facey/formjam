import { useBreakpoints, breakpointsTailwind } from "@vueuse/core";

export const breakpoints = useBreakpoints({
  ...breakpointsTailwind,
  phone: "495px",
  tablet: "810px",
});

export const smallerOrEqual = breakpoints.smallerOrEqual('phone');
export const lteTablet = breakpoints.smallerOrEqual('tablet');