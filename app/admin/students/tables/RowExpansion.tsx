import { TabView, TabPanel } from "primereact/tabview";
import styled from "styled-components";
import { TfiRuler } from "react-icons/tfi";
import { GiWeight } from "react-icons/gi";
import { BsFillHouseHeartFill } from "react-icons/bs";
import {
  FaAddressCard,
  FaAt,
  FaBarcode,
  FaCalendarCheck,
  FaCity,
  FaComment,
  FaGraduationCap,
  FaHome,
  FaMobile,
  FaPhone,
  FaUserTag,
} from "react-icons/fa";
import { Header } from "@/app/components/commons/Header";
import { Belt } from "@/app/components/commons/Belt";
import { MappedStudent } from "./student-context";

export function RowExpansion({
  communication,
  height,
  weight,
  address,
  promotion,
}: MappedStudent) {
  const color = "var(--primary-color)";

  return (
    <StyledTabView>
      <TabPanel
        header="Communication"
        rightIcon={<FaComment style={{ marginLeft: "5px" }} />}
      >
        <Header icon={<FaMobile color={color} />}>
          {communication?.cellPhone}
        </Header>
        {communication?.phone ? (
          <Header icon={<FaPhone color={color} />}>
            {communication.phone}
          </Header>
        ) : null}
        <Header icon={<FaAt color={color} />}>{communication?.email}</Header>
      </TabPanel>
      <TabPanel
        header="Size"
        rightIcon={<FaUserTag style={{ marginLeft: "5px" }} />}
      >
        <Header icon={<TfiRuler color={color} />}>{height} m.</Header>
        <Header icon={<GiWeight color={color} />}>{weight} kg.</Header>
      </TabPanel>
      <TabPanel
        header="Address"
        rightIcon={<FaAddressCard style={{ marginLeft: "5px" }} />}
      >
        <Header icon={<FaHome color={color} />}>
          {address?.lineOne} {address?.lineTwo} {address?.exteriorNumber}{" "}
          {address?.interiorNumber}
        </Header>
        <Header icon={<BsFillHouseHeartFill color={color} />}>
          {address?.suburb}
        </Header>
        <Header icon={<FaCity color={color} />}>{address?.municipality}</Header>
        <Header icon={<FaBarcode color={color} />}>{address?.zipCode}</Header>
      </TabPanel>
      <TabPanel
        header="Promotions"
        rightIcon={<FaGraduationCap style={{ marginLeft: "5px" }} />}
      >
        {promotion.map((prom) => (
          <PromotionWrapper key={prom.id}>
            <Header
              icon={<FaCalendarCheck color={color} />}
              style={{ minWidth: "130px" }}
            >
              {prom.date}
            </Header>
            <Belt belt={prom.rank} width={90} />
          </PromotionWrapper>
        ))}
      </TabPanel>
    </StyledTabView>
  );
}

const StyledTabView = styled(TabView)`
  .p-tabview-panels {
    background-color: var(--highlight-bg);
  }
`;

const PromotionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
