# Next Admin

This project uses the following technologies:

- <a href="https://nextjs.org/docs" target="_blank">Next.js</a>
- <a href="https://www.prisma.io/docs" target="_blank">Prisma.io</a>
- <a href="https://formik.org/" target="_blank">Formik.org</a>
- <a href="https://primereact.org/" target="_blank">PrimeReact.org</a>

## Getting Started

1. Install <a href="https://docs.docker.com/desktop/install/mac-install/" target="_blank">`docker desktop`</a>
2. Install dependencies:

```bash
yarn
```

3. Set your environment variables (example in `.env.example` file)

4. Start postgres container, seed data and run development server:

```bash
yarn dev:open
```

1. Open <a href="http://localhost:3000" target="_blank">http://localhost:3000</a> with your browser to see the application.

## Other commands

- If for some reason stop the server and want to run it again:

```bash
yarn dev
```

- After you stop the server; and want to remove the `postgres` container:

```bash
yarn dev:close
```
