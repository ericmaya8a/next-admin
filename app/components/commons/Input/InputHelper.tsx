type InputHelper = {
  name: string;
  helper?: string;
};

export function InputHelper({ name, helper }: InputHelper) {
  //#region CONSTANTS
  const helpDescribedby = helper ? `${name}-help` : undefined;
  //#endregion

  //#region JSX
  if (helper) return <small id={helpDescribedby}>{helper}</small>;

  return null;
  //#endregion
}
