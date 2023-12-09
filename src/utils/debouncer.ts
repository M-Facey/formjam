import { ref } from "vue";

let timeoutId = ref<NodeJS.Timeout>();
export default (callback: Function, duration: number = 350) => {
  if (timeoutId.value !== undefined) clearTimeout(timeoutId.value);
  timeoutId.value = setTimeout(() => callback(), duration);
}