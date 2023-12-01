export function autosizeTextarea(id: string) {
  if(id === "") return;

  const textarea = document.getElementById(id);
  if (textarea === null) return;

  textarea.setAttribute(
    "style",
    "height:" + textarea.scrollHeight + "px;overflow-y:hidden;"
  );

  textarea.addEventListener(
    "input",
    () => {
      textarea.style.height = "0";
      textarea.style.height = textarea.scrollHeight + "px";
    },
    false
  );
}