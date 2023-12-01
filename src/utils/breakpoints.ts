import { useBreakpoints } from "@vueuse/core";

const breakpoints = useBreakpoints({
  phone: "495px",
  tablet: "810px",
});

export const smallerOrEqual = breakpoints.smallerOrEqual('phone');
export const lteTablet = breakpoints.smallerOrEqual('tablet');