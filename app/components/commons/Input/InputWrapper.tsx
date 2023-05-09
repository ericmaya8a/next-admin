import styled from "styled-components";

type InputWrapperProps = {
  id?: string;
  label: string;
  children: React.ReactNode;
};

export function InputWrapper({ id, label, children }: InputWrapperProps) {
  return (
    <Wrapper>
      <label htmlFor={id}>{label}</label>
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 1rem;
`;
