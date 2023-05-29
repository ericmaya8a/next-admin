import Link from "next/link";
import styled from "styled-components";
import { PrimeIcons } from "primereact/api";
import { BreadCrumb, BreadCrumbProps } from "primereact/breadcrumb";
import { Button } from "primereact/button";
import { RxSlash } from "react-icons/rx";
import { CONSTANTS } from "@/app/constatnts";

interface AppBreadCrumbProps extends BreadCrumbProps {
  model: {
    label: string;
    url?: string;
  }[];
}

export function AppBreadCrumb({
  model,
  separatorIcon = <RxSlash />,
  ...otherProps
}: AppBreadCrumbProps) {
  return (
    <StyledBreadCrumb
      model={model.map(({ label, url }) => ({
        template: url ? (
          <Link href={url}>
            <Button label={label} size="small" text severity="secondary" />
          </Link>
        ) : (
          <Button label={label} size="small" text severity="secondary" />
        ),
      }))}
      home={{
        template: (
          <Link href={CONSTANTS.urls.HOME}>
            <Button
              icon={PrimeIcons.HOME}
              size="small"
              text
              severity="secondary"
            />
          </Link>
        ),
      }}
      separatorIcon={separatorIcon}
      {...otherProps}
    />
  );
}

//#region STYLES
const StyledBreadCrumb = styled(BreadCrumb)`
  background-color: transparent;
  border: none;
  margin-bottom: 1rem;
  padding: 0;
`;
//#endregion
