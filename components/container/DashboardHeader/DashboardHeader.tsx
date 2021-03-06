import * as React from "react";
import c from "classnames";
import useStyles from "./styles";
import { Button, Container, Flex, FlexItem } from "@sonnat/ui";
import { Logout } from "@sonnat/icons";

interface DashboardHeaderBaseProps {
  className?: string;
  asPublicHeader?: boolean;
  subHeader?: JSX.Element;
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
  const { asPublicHeader = false, subHeader, className, ...otherProps } = props;

  const classes = useStyles();

  return (
    <header
      ref={ref}
      className={c(className, classes.root, {
        [classes.publicHeader]: asPublicHeader
      })}
      {...otherProps}
    >
      <Container fluid>
        <Flex direction="column" crossAxisAlignment="center">
          <FlexItem className={classes.main}>
            <img
              className={classes.logo}
              src="/static/media/porser.svg"
              alt="Branding"
            />
            {!asPublicHeader && (
              <Button
                className={classes.logoutBtn}
                label="خروج"
                size="large"
                leadingIcon={<Logout />}
                variant="inlined"
              />
            )}
          </FlexItem>
          {subHeader && (
            <FlexItem className={classes.sub}>{subHeader}</FlexItem>
          )}
        </Flex>
      </Container>
    </header>
  );
};

const DashboardHeader = React.forwardRef(
  DashboardHeaderBase
) as typeof DashboardHeaderBase;

export default DashboardHeader;
