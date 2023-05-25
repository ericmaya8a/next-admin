import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import {
  FaAt,
  FaBarcode,
  FaCity,
  FaHome,
  FaMobile,
  FaPhone,
} from "react-icons/fa";
import { BsFillHouseAddFill } from "react-icons/bs";
import { RowInfo } from "@/app/components/commons/RowInfo";
import { COLOR } from "../StudentInfo";
import { StudentInfo } from "../page";

type ContactInfoProps = {
  address: StudentInfo["address"];
  communication: StudentInfo["communication"];
};

export function ContactInfo({ address, communication }: ContactInfoProps) {
  const completeAddress = `${address?.lineOne} ${address?.lineTwo ?? ""} ${
    address?.exteriorNumber
  } ${address?.interiorNumber ?? ""}`;

  return (
    <Card title="Contact Info">
      <RowInfo
        title="Address:"
        description={completeAddress}
        icon={<FaHome color={COLOR} />}
      />
      <RowInfo
        title="Suburb:"
        description={address!.suburb}
        icon={<BsFillHouseAddFill color={COLOR} />}
      />
      <RowInfo
        title="Municipality:"
        description={address!.municipality}
        icon={<FaCity color={COLOR} />}
      />
      <RowInfo
        title="Zip Code:"
        description={address!.zipCode}
        icon={<FaBarcode color={COLOR} />}
      />
      <Divider />
      <RowInfo
        title="Email:"
        description={communication!.email}
        icon={<FaAt color={COLOR} />}
      />
      <RowInfo
        title="Cell phone:"
        description={communication!.cellPhone}
        icon={<FaMobile color={COLOR} />}
      />
      {communication?.phone ? (
        <RowInfo
          title="Phone:"
          description={communication.phone}
          icon={<FaPhone color={COLOR} />}
        />
      ) : null}
    </Card>
  );
}
