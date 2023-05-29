import { Card } from "primereact/card";
import styled from "styled-components";
import { Belt } from "@/app/components/commons/Belt";
import { RowInfo } from "@/app/components/commons/RowInfo";
import { useStudentInfo } from "../studentInfoContext";

export function PromotionInfo() {
  //#region HOOKS
  const { studentInfo } = useStudentInfo();
  //#endregion

  //#region JSX
  if (studentInfo) {
    const { promotion } = studentInfo;
    const promotions =
      promotion.length > 0 ? (
        <>
          {promotion.map(({ id, date, rank }) => (
            <RowInfo
              key={id}
              title=""
              icon={
                <Wrapper>
                  <strong>{date}</strong>
                  <Belt belt={rank} width={50} tooltip />
                </Wrapper>
              }
            />
          ))}
        </>
      ) : (
        <p>No promotions here 😪</p>
      );

    return <Card title="Promotions">{promotions}</Card>;
  }
  return null;
  //#endregion
}

//#region STYLES
const Wrapper = styled.div`
  align-items: center;
  display: flex;
  gap: 1rem;
  justify-content: space-between;

  strong {
    min-width: 110px;
  }
`;
//#endregion
