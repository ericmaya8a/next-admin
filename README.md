# Next Admin

This project uses the following technologies:

- [Next.js](https://nextjs.org/docs){:target="\_blank"}
- [Prisma.io](https://www.prisma.io/docs){:target="\_blank"}
- [Formik.org](https://formik.org/){:target="\_blank"}
- [PrimeReact.org](https://primereact.org/){:target="\_blank"}

## Getting Started

1. Install [`docker desktop`](https://docs.docker.com/desktop/install/mac-install/){:target="\_blank"}
2. Install dependencies:

```bash
yarn
```

3. Set your environment variables (example in `.env.example` file)

4. Start postgres container, seed data and run development server:

```bash
yarn dev:open
```

5. Open [http://localhost:3000](http://localhost:3000){:target="\_blank"} with your browser to see the application.

## Other commands

- If for some reason stop the server and want to run it again:

```bash
yarn dev
```

- After you stop the server; and want to remove the `postgres` container:

```bash
yarn dev:close
```
