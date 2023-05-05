type DisplayDataProps<T> = {
  data: T;
};

export function DisplayData<T>({ data }: DisplayDataProps<T>) {
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
