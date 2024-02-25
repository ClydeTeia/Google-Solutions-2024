## Link to hosted version
https://visionx-413000.web.app/gesture

# Getting Started
## Clone the repository
Kindly refer to the official [GitHub documentation](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) for cloning a repository.

## Install all dependencies

After cloning the repository, install the project dependencies by running this command in the terminal. Make sure you are in the correct directory.

```bash
npm install
# or
npm i
```

## Create .env files

Create a .env file inside the root directory. Which means you create the .env on the same level where the package.json, tsconfig.json, etc. are located. For the env credentials, refer to the [Google Firebase documentation](https://firebase.google.com/docs/web/learn-more?authuser=0&hl=en#config-object) for how to set up the Firebase config object.

Once the config object has been generated, format it like this and paste it to the .env file:

```bash
NEXT_PUBLIC_apiKey= "key-here"
NEXT_PUBLIC_authDomain= "key-here"
NEXT_PUBLIC_projectId= "key-here"
NEXT_PUBLIC_storageBucket= "key-here"
NEXT_PUBLIC_messagingSenderId= "key-here"
NEXT_PUBLIC_appId= "key-here"
NEXT_PUBLIC_measurementId= "key-here"
```

## Run the project
The project should now be ready to run. To run it:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).