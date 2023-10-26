import type { BaseAuthStore, PocketBase, RecordService } from "pocketbase";

// ** Dev Note **
// These types def for pocketbase seems to only affect
// retreival of records from pocketbase. Methods such as
// `getList`, `getOne`, etc.

// It is completely useless for managing the data used to
// create a record, sadly.

interface BaseCollectionType {
  id: string;
  created: string;
  updated: string;
}

interface Answer extends BaseCollectionType {
  text: string;
  question: string;
}

interface Question extends BaseCollectionType {
  text: string;
  description: string;
  type:
    | "short-text"
    | "paragraph"
    | "single-choice"
    | "checkboxes"
    | "dropdown";
  answers: string[];
  required: boolean;
  form: string;
}

interface Form extends BaseCollectionType {
  title: string;
  description: string;
  view: "list" | "step";
  starred: boolean;
  questions: string[];
  preview_link: string;
  link: string;
  user: string;
}

export interface TypedPocketBase extends Pocketbase {
  collection(idOrName: string): RecordService;
  collection(idOrName: "answers"): RecordService<Answer>;
  collection(idOrName: "questions"): RecordService<Question>;
  collection(idOrName: "forms"): RecordService<Form>;
  authStore: BaseAuthStore;
}
