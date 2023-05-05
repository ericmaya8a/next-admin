const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fakerUtils = require("./faker.utils");

const users = ["Eric", "John", "Mike", "Jane", "Diana"];
const students = Array.from(Array(15).keys());

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

    // create users
    users.map(
      async (user) =>
        await prisma.user.create({
          data: fakerUtils.createUser(user),
        })
    );

    // create students
    students.map(
      async () =>
        await prisma.student.create({
          data: fakerUtils.createStudent(),
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
