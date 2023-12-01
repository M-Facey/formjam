import { useBreakpoints } from "@vueuse/core";

const breakpoints = useBreakpoints({
  phone: "495px",
});

export const smallerOrEqual = breakpoints.smallerOrEqual('phone');