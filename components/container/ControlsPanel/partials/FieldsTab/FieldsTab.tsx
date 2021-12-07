import { Plus } from "@sonnat/icons";
import { Button } from "@sonnat/ui";
import c from "classnames";
import * as React from "react";
import { EntityItem, Segment } from "..";
import useStyles from "./styles";

interface FieldsTabBaseProps {
  className?: string;
}

type FieldsTabProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof FieldsTabBaseProps
> &
  FieldsTabBaseProps;

const FieldsTabBase = (
  props: FieldsTabProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const { className, ...otherProps } = props;

  const classes = useStyles();

  return (
    <div ref={ref} className={c(className, classes.root)} {...otherProps}>
      <Segment
        title="سؤالات"
        description="سؤالات بلوک‌های سازنده فرم‌ها هستند. در این‌جا می‌توانید سؤالات خود را مدیریت، ایجاد، ویرایش و یا حذف کنید."
      />
      <Segment
        title="لیست سؤالات"
        headingAction={
          <Button
            label="ایجاد سؤال"
            leadingIcon={<Plus />}
            size="small"
            color="secondary"
            variant="inlined"
          />
        }
      >
        <EntityItem
          title="عنوان سؤال"
          subtitle="مجزا"
          moveUpLabel="انتقال سؤال به بالا"
          moveDownLabel="انتقال سؤال به پایین"
          editLabel="ویرایش سؤال"
          removeLabel="حذف سؤال"
          onMoveDown={() => void 0}
          onMoveUp={() => void 0}
          onEdit={() => void 0}
          onRemove={() => void 0}
        />
        <EntityItem
          title="عنوان سؤال"
          subtitle="عنوان گروه"
          moveUpLabel="انتقال سؤال به بالا"
          moveDownLabel="انتقال سؤال به پایین"
          editLabel="ویرایش سؤال"
          removeLabel="حذف سؤال"
          onMoveDown={() => void 0}
          onMoveUp={() => void 0}
          onEdit={() => void 0}
          onRemove={() => void 0}
        />
        {/* <Text
          align="center"
          variant="bodySmall"
          color="textHint"
          rootNode="p"
          display="block"
        >
          لیست سؤالات شما خالی می‌باشد.
        </Text> */}
      </Segment>
    </div>
  );
};

const FieldsTab = React.forwardRef(FieldsTabBase) as typeof FieldsTabBase;

export default FieldsTab;
