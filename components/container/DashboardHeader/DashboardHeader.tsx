import * as React from "react";
import c from "classnames";
import useStyles from "./styles";
import { Button, Container } from "@sonnat/ui";
import { Logout } from "@sonnat/icons";

interface DashboardHeaderBaseProps {
  className?: string;
}

type DashboardHeaderProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof DashboardHeaderBaseProps
> &
  DashboardHeaderBaseProps;

const DashboardHeaderBase = (
  props: DashboardHeaderProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const { className, ...otherProps } = props;

  const classes = useStyles();

  return (
    <header ref={ref} className={c(className, classes.root)} {...otherProps}>
      <Container className={classes.container}>
        <img
          className={classes.logo}
          src="/static/media/porser.svg"
          alt="Branding"
        />
        <Button
          className={classes.logoutBtn}
          label="خروج"
          size="large"
          leadingIcon={<Logout />}
          variant="inlined"
        />
      </Container>
    </header>
  );
};

const DashboardHeader = React.forwardRef(
  DashboardHeaderBase
) as typeof DashboardHeaderBase;

export default DashboardHeader;
