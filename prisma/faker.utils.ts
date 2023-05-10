const { faker } = require("@faker-js/faker");

function randomDate() {
  return faker.date.between("2021-01-01T00:00:00.000Z", new Date().toJSON());
}

function createUser(name: String) {
  return {
    name,
    email: `${name.toLowerCase()}@gmail.com`,
    password: "$2a$10$QuXvPZQn7WVbRVIVG1bIEeB70uCqKyAa7bqLqznbhLoAjOsltXfVe", // Test!234
    role: name === "Eric" ? "SUPER_ADMIN" : name === "Jane" ? "ADMIN" : "USER",
  };
}

function createStudent() {
  const sex = faker.name.sexType();
  const firstName = faker.name.firstName(sex);
  const lastName = faker.name.lastName();
  // const email = faker.internet.email(firstName, lastName);

  return {
    firstName,
    lastName,
    birthDate: faker.date.birthdate({ min: 6, max: 45, mode: "age" }),
    gender: sex.toUpperCase(),
    active: faker.datatype.boolean(),
    inscriptionDate: randomDate(),
    height: faker.datatype.float({ min: 1.3, max: 2, precision: 0.01 }),
    weight: faker.datatype.float({ min: 35, max: 110, precision: 0.1 }),
  };
}

function createAddress() {
  return {
    lineOne: faker.address.streetName(),
    lineTwo: faker.address.secondaryAddress(),
    exteriorNumber: faker.address.buildingNumber(),
    suburb: faker.address.cityName(),
    municipality: faker.address.city(),
    zipCode: faker.address.zipCode("#####"),
  };
}

function createCommInfo(firstName: string, lastName: string) {
  return {
    phone: faker.phone.number("## #### ####"),
    cellPhone: faker.phone.number("## #### ####"),
    email: faker.internet.email(firstName, lastName).toLowerCase(),
  };
}

function createPromotion() {
  const ranks = [
    "AMARILLA",
    "NARANJA",
    "VERDE",
    "AZUL",
    "MORADA",
    "CAFE",
    "ROJA",
    "DAN_1",
  ];
  const random = Math.floor(Math.random() * ranks.length);
  return {
    date: randomDate(),
    rank: ranks[random],
  };
}

function createTuition() {
  const date = randomDate();
  return {
    date,
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
}

module.exports = {
  createUser,
  createStudent,
  createAddress,
  createCommInfo,
  createPromotion,
  createTuition,
};
