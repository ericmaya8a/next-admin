import { Card } from "primereact/card";
import styled from "styled-components";
import { Belt } from "@/app/components/commons/Belt";
import { RowInfo } from "@/app/components/commons/RowInfo";
import { StudentInfo } from "../page";

type PromotionInfoProps = {
  info: StudentInfo;
};

export function PromotionInfo({ info }: PromotionInfoProps) {
  if (info) {
    const { promotion } = info;
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

    return <Card title="Promotion Info">{promotions}</Card>;
  }
  return null;
}

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  gap: 1rem;
  justify-content: space-between;

  strong {
    min-width: 110px;
  }
`;
