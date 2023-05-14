type InputHelper = {
  name: string;
  helper?: string;
};

export function InputHelper({ name, helper }: InputHelper) {
  const helpDescribedby = helper ? `${name}-help` : undefined;

  if (helper) return <small id={helpDescribedby}>{helper}</small>;

  return null;
}
