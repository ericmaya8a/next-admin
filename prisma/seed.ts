const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const users = ["Eric", "John", "Mike", "Jane", "Diana"];

async function load() {
  try {
    await prisma.post.createMany({
      data: [
        {
          title: "post title 1",
          content: "post content 1",
        },
        {
          title: "post title 2",
          content: "post content 2",
        },
        {
          title: "post title 3",
          content: "post content 3",
        },
        {
          title: "post title 4",
          content: "post content 4",
        },
      ],
    });

    users.map(
      async (user) =>
        await prisma.user.create({
          data: {
            name: user,
            email: `${user.toLowerCase()}@gmail.com`,
            password:
              "$2a$10$QuXvPZQn7WVbRVIVG1bIEeB70uCqKyAa7bqLqznbhLoAjOsltXfVe", // Test!234
            role:
              user === "Eric"
                ? "SUPER_ADMIN"
                : user === "Jane"
                ? "ADMIN"
                : "USER",
          },
        })
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

load();
