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

export function RowExpansion(props: any) {
  const color = "var(--primary-color)";

  return (
    <StyledTabView>
      <TabPanel
        header="Communication"
        rightIcon={<FaComment style={{ marginLeft: "5px" }} />}
      >
        <Header icon={<FaMobile color={color} />}>
          {props.communication.cellPhone}
        </Header>
        <Header icon={<FaPhone color={color} />}>
          {props.communication.phone}
        </Header>
        <Header icon={<FaAt color={color} />}>
          {props.communication.email}
        </Header>
      </TabPanel>
      <TabPanel
        header="Size"
        rightIcon={<FaUserTag style={{ marginLeft: "5px" }} />}
      >
        <Header icon={<TfiRuler color={color} />}>{props.height} m.</Header>
        <Header icon={<GiWeight color={color} />}>{props.weight} kg.</Header>
      </TabPanel>
      <TabPanel
        header="Address"
        rightIcon={<FaAddressCard style={{ marginLeft: "5px" }} />}
      >
        <Header icon={<FaHome color={color} />}>
          {props.address.lineOne} {props.address.lineTwo}{" "}
          {props.address.exteriorNumber} {props.address.interiorNumber}
        </Header>
        <Header icon={<BsFillHouseHeartFill color={color} />}>
          {props.address.suburb}
        </Header>
        <Header icon={<FaCity color={color} />}>
          {props.address.municipality}
        </Header>
        <Header icon={<FaBarcode color={color} />}>
          {props.address.zipCode}
        </Header>
      </TabPanel>
      <TabPanel
        header="Promotions"
        rightIcon={<FaGraduationCap style={{ marginLeft: "5px" }} />}
      >
        {props.promotion.map((prom: any) => (
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
