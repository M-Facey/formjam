# FormJam: A Simple Form App

This is a simple app created using Vue 3 and Pocketbase. The `src` documentation found [here](./src/README.md) can help newcomers understand how the project is broken down based on folder structure. :warning: The docs for different folders are still being worked on.

## :computer: The Tech I Used

### Front end

- [Vue 3](https://vuejs.org/) with Typescript
  - [Vue Router](https://router.vuejs.org/): for routing
- [Tiptap](https://tiptap.dev/) for rich text editor
  - Character Count plugin
  - Link plugin
  - Underline plugin
- [Icones](https://icones.js.org/) for icons
- [TailwindCSS](https://tailwindcss.com/)

### Back end

- [Pocketbase](https://pocketbase.io/) (v0.18.10)

## :hammer_and_wrench: How To Run

First, copy the values from `.env.example` into a `.env` file and set the value according what your specific setup. Afterwards, you should navigate the root folder and run any of the folling commands.

```sh
VITE_POCKET_BASE="http://127.0.0.1:8090" # default port for pocketbase
BASE_URL="http://localhost:5173" # default port for app

API_URL="http://127.0.0.1:8090" # same as the local or production pocketbase instance
USER_EMAIL="user@test.com" 
USER_PASSWORD="password"
```

### Install the dependencies

```sh
pnpm install
```

### Run dev mode

```sh
pnpm dev
```

### Type-check and run build for production

```sh
pnpm build
```

### Run production preview

```sh
pnpm preview
```

### Run E2E tests with headless browser/electron

```sh
pnpm test:e2e
```

### Run E2E tests with Cypress UI

```sh
pnpm cypress:open
```
