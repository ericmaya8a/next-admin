# Next Admin

This project uses the following technologies:

- [Next.js](https://nextjs.org/docs)
- [Prisma.io](https://www.prisma.io/docs)
- [Formik.org](https://formik.org/)
- [PrimeReact.org](https://primereact.org/)

## Getting Started

1. Install [`docker desktop`](https://docs.docker.com/desktop/install/mac-install/)
2. Install dependencies:

```bash
yarn
```

3. Start postgres container, seed data and run development server:

```bash
yarn dev:open
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Other commands

- If for some reason stop the server and want to run it again:

```bash
yarn dev
```

- After you stop the server; and want to remove the `postgres` container:

```bash
yarn dev:close
```
