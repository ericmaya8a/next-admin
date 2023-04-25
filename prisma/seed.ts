const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

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

    await prisma.user.create({
      data: {
        name: "Eric",
        email: "eric@gmail.com",
        password:
          "$2a$10$lhx0BuWdQaFogSryz5Hr2OQKIkd5zy9P4nCrTl5df7qpoS4QW/IAy", // test123
      },
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

load();
