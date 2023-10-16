import PocketBase from "pocketbase";
const pocketBaseUrl = import.meta.env.VITE_POCKET_BASE;

const pb = new PocketBase(pocketBaseUrl);
export default pb;
