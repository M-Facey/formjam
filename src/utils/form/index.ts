import pb from "../../db/pocketBase";

// create form
export async function createForm(): Promise<string> {
  const formData = await pb.collection("forms").create({
    title: "Untitled Form",
    description: "",
    categories: JSON.stringify({
      category: "",
    }),
    questions: [],
    preview_link: "",
    link: "",
    user: pb.authStore.model?.id,
  });

  const questionData = await pb.collection("questions").create({
    text: "Question 1",
    type: "multiple_choice",
    answers: [],
    form: formData.id,
  });

  pb.collection("forms").update(formData.id, {
    ...formData,
    questions: [questionData.id],
  });

  return formData.id;
}