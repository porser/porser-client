import makeStyles from "@sonnat/ui/styles/makeStyles";
import c from "classnames";
import * as React from "react";
import { State } from "./GeneratePropsDialog";

const useStyles = makeStyles(
  () => ({
    root: {}
  }),
  { name: "ChoiceOptionCreator" }
);

interface ChoiceOptionCreatorBaseProps {
  className?: string;
  formState: State;
  setFormState: React.Dispatch<React.SetStateAction<State>>;
}

type ChoiceOptionCreatorProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof ChoiceOptionCreatorBaseProps
> &
  ChoiceOptionCreatorBaseProps;

const ChoiceOptionCreator = (props: ChoiceOptionCreatorProps) => {
  const { className, ...otherProps } = props;

  const classes = useStyles();

  const [choices, setChoices] = React.useState<
    { value: string; label: string; description?: string }[]
  >([]);

  return <div className={c(className, classes.root)} {...otherProps}></div>;
};

export default ChoiceOptionCreator;
