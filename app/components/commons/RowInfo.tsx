import { Header } from "./Header";

type RowInfoProps = {
  title: string;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
};

export function RowInfo({
  title,
  description,
  icon,
  iconPosition = "left",
}: RowInfoProps) {
  return (
    <Header
      icon={icon}
      iconPosition={iconPosition}
      bold={false}
      style={{ marginBottom: "0.5rem" }}
    >
      <strong>{title}</strong>
      {description}
    </Header>
  );
}
