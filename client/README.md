
# Wizard Universe - Intranet

This is a web app that allows Wizard Universe's staff members to manage the server



## Live URL

https://intranet.poudlardrp.fr




## Run Locally

Clone the project

```bash
  git clone https://git.poudlardrp.fr/Web/Intranet
```

Go to the project directory

```bash
  cd intranet
```

Install dependencies

```bash
  yarn
```

Start the server

```bash
  yarn dev
```

Go to http://localhost:3000



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

Env variables must start by VITE, to access them use import.meta.env.[key]

| Key          | Value               |
|--------------|---------------------|
| VITE_API_URI | L'api du votre back |

## API Reference

Refer to https://intranet.poudlardrp.fr/api



## Usage/Examples

```vue
<script setup lang="ts">
import { something } from 'something'
</script>

<template>
    <div class="myClass"></div>
</template>

<style scoped lang="scss">
.myClass {}
</style>

```

## Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Primary | ![#1f948e](https://via.placeholder.com/10/1f948e?text=+) #1f948e |

## Tech Stack

**Client:** Vuejs@3, Vuetify@3, TailwindCSS

**Server:** Node, Nestjs

