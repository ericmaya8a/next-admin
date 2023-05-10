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
    students.map(async () => {
      const random = Math.floor(Math.random() * 8);
      const randomArray = Array.from(Array(random).keys());
      const student = fakerUtils.createStudent();

      await prisma.student.create({
        data: {
          ...student,
          address: {
            create: fakerUtils.createAddress(),
          },
          communication: {
            create: fakerUtils.createCommInfo(
              student.firstName,
              student.lastName
            ),
          },
          promotion: {
            create: randomArray.map(() => fakerUtils.createPromotion()),
          },
          tuition: {
            create: randomArray.map(() => fakerUtils.createTuition()),
          },
        },
      });
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

load();
