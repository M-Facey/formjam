import { defineStore } from "pinia";
import { Question } from "@/types/pocketbase";
import pb from "@/db/pocketBase";

export const useQuestionStore = defineStore({
  id: "questions",
  state: () => ({
    questions: [] as Question[],
    currentQuestion: {
      text: "",
      description: "",
      type: "short-text",
      required: false,
      answers: [],
      form: "",
    },
  }),
  actions: {
    async fetchQuestions(formId: string) {
      const { items } = await pb
        .collection("questions")
        .getList<Question>(1, 100, {
          filter: `form="${formId}"`,
          sort: "order",
        });
      this.questions = items;
    },
    async createQuestion(formId: string) {
      console.log(this.questions.length);
      const question = await pb.collection("questions").create({
        text: `Question ${this.questions.length + 1}`,
        description: "",
        type: "short-text",
        required: false,
        answers: null,
        form: formId,
        order: this.questions.length + 1,
      });
      await this.fetchQuestions(formId);
      return question.id;
    },
    // TODO: The duplicate funcion needs to be fixed as well as the correct order function
    async duplicateQuestion(question: Question) {
      const { id, text, description, type, required, answers, form, order } =
        question;

      const index = this.questions.findIndex((question) => question.id === id);
      await pb.collection("questions").create({
        text,
        description,
        type,
        required,
        answers,
        form,
        order: order + 1,
      });
      if (index < this.questions.length) {
        console.log(index + 1, this.questions.length);
        this.correctOrder(index + 1, this.questions.length, order + 1);
      }

      this.fetchQuestions(form);
    },
    async shuffleQuestions(idx1: number, idx2: number) {
      await pb.collection("questions").update(this.questions[idx1].id, {
        ...this.questions[idx1],
        order: this.questions[idx2].order,
      });

      await pb.collection("questions").update(this.questions[idx2].id, {
        ...this.questions[idx2],
        order: this.questions[idx1].order,
      });

      this.fetchQuestions(this.questions[idx1].form);
    },
    async updateQuestion(question: Question) {
      await pb.collection("questions").update(question.id, question);
      await this.fetchQuestions(question.form);
    },
    async correctOrder(start: number, end: number, currentOrder?: number) {
      let accumulator = currentOrder ? currentOrder + 1 : start;

      for (let i = start; i < end; i++) {
        await pb.collection("questions").update(this.questions[i].id, {
          ...this.questions[i],
          order: accumulator,
        });
      }
      accumulator += 1;
    },
    async deleteQuestion(questionId: string, formId: string) {
      const index = this.questions.findIndex(
        (question) => question.id === questionId
      );

      this.correctOrder(index + 1, this.questions.length);

      await pb.collection("questions").delete(questionId);
      await this.fetchQuestions(formId);
    },
  },
});
