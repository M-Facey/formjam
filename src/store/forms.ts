import { defineStore } from "pinia";
import pb from "@/db/pocketBase";
import type { Form } from "@/types/pocketbase";
import { useQuestionStore } from "@/store/questions";

export const useFormStore = defineStore({
  id: "forms",
  state: () => ({
    forms: [] as Form[],
    searchTerm: "",
    selectedForms: [] as string[],
    selectAll: false,
  }),
  getters: {
    getFilteredForms(state) {
      if (state.searchTerm === "") {
        return state.forms;
      }
      return state.forms.filter((form) =>
        form.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    },
    totalForms(): number {
      return this.forms.length;
    },
    totalSelectedForms(): number {
      return this.selectedForms.length;
    },
  },
  actions: {
    // general functions
    selectForm(id: string) {
      if (this.selectedForms.includes(id)) {
        this.selectedForms = this.selectedForms.filter(
          (formId) => formId !== id
        );
      } else {
        this.selectedForms.push(id);
      }
    },
    selectAllForms() {
      this.selectedForms = this.forms.map((form) => form.id);
    },
    isSelected(id: string) {
      return this.selectedForms.includes(id);
    },
    deleteSelectedForms() {
      this.selectedForms.forEach((id) => {
        pb.collection("forms").delete(id);
      });

      this.selectedForms = [];
      this.fetchForms();
    },
    // api functions
    async fetchForms() {
      this.forms = await pb
        .collection("forms")
        .getFullList({ sort: "-created" });
    },
    async createForm() {
      const questionStore = useQuestionStore();
      const form = await pb.collection("forms").create<Form>({
        title: "Untitled Form",
        description: "",
        view: "list",
        questions: [],
        preview_link: "",
        link: "",
        user: pb.authStore.model?.id,
      });
      const questionId = await questionStore.createQuestion(form.id);
      this.updateForm({
        ...form,
        questions: [questionId],
      });

      return form.id;
    },
    async updateForm(form: Form) {
      await pb.collection("forms").update(form.id, form);
      this.fetchForms();
    },
    async deleteForm(formId: string) {
      await pb.collection("forms").delete(formId);
      this.fetchForms();
    },
  },
});
