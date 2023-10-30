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

- Pocketbase (v0.18.10)

## :hammer_and_wrench: How To Run

First, navigate to root folder of the project and run the following commands.

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
