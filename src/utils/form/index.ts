import { useTitle } from "@vueuse/core";
import pb from "@/db/pocketBase";
import { autosizeTextarea } from "@/utils/textareaAutosize";

// create form
export async function createForm(): Promise<string> {
  const formData = await pb.collection("forms").create({
    title: "Untitled Form",
    description: "",
    view: "list",
    questions: [],
    preview_link: "",
    link: "",
    user: pb.authStore.model?.id,
  });

  const questionData = await pb.collection("questions").create({
    text: "Question 1",
    type: "single-choice",
    answers: [],
    form: formData.id,
  });

  pb.collection("forms").update(formData.id, {
    ...formData,
    questions: [questionData.id],
  });

  return formData.id;
}

export function getDefaultAnswer(questionType: string) {
  return questionType === "checkboxes" ? ([] as string[]) : "";
}

export function setupParagraphInputs(inputs: string[]) {
  setTimeout(() => {
    inputs.map((id) => {
      autosizeTextarea("textarea-" + id);
    });
  }, 10);
}

export function setPageTitle(formTitle: string) {
  let pageTitle = formTitle.replaceAll(/<\/?[^>]+(>|$)/g, "");
  pageTitle = (pageTitle || "Untitled Form") + " | FormJAM";
  useTitle(pageTitle);
}
