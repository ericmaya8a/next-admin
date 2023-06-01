export function handleInvalidClassName(message?: string) {
  return message ? "p-invalid" : undefined;
}

export function setSeverity(matchPath: boolean) {
  return matchPath ? undefined : "secondary";
}
