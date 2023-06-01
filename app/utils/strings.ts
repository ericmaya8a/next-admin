export function capitalizeEnum(enumValue: string) {
  const words = enumValue
    .replaceAll("_", " ")
    .toLowerCase()
    .split(" ")
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`);

  return words.join(" ");
}

export function capitalizeFirstChar(word: string) {
  return word.charAt(0).toUpperCase();
}

export function getInitials(firstName: string, lastName?: string) {
  if (!lastName) return capitalizeFirstChar(firstName);
  return `${capitalizeFirstChar(firstName)}${capitalizeFirstChar(lastName)}`;
}

export function getInitialsFromFullName(name: string) {
  const words = name.split(" ");
  return getInitials(words[0], words[1]);
}
