import PocketBase from "pocketbase";
import { TypedPocketBase } from "../types/pocketbase";
const pocketBaseUrl = import.meta.env.VITE_POCKET_BASE;

const pb = new PocketBase(pocketBaseUrl) as TypedPocketBase;
export default pb;
