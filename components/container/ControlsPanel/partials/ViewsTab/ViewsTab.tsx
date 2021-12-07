import { Plus } from "@sonnat/icons";
import { Button } from "@sonnat/ui";
import c from "classnames";
import * as React from "react";
import { EntityItem, Segment } from "..";
import useStyles from "./styles";

interface ViewsTabBaseProps {
  className?: string;
}

type ViewsTabProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof ViewsTabBaseProps
> &
  ViewsTabBaseProps;

const ViewsTabBase = (props: ViewsTabProps, ref: React.Ref<HTMLDivElement>) => {
  const { className, ...otherProps } = props;

  const classes = useStyles();

  return (
    <div ref={ref} className={c(className, classes.root)} {...otherProps}>
      <Segment
        title="گروه سؤالات"
        description="ایجاد گروه باعث می‌شود که بتوانید دسته‌ای از سؤالات که به هم مرتبط هستند را در یک مرحله از کاربر بپرسید."
      />
      <Segment
        title="لیست گروه‌ها"
        headingAction={
          <Button
            label="ایجاد گروه"
            leadingIcon={<Plus />}
            size="small"
            color="secondary"
            variant="inlined"
          />
        }
      >
        <EntityItem
          title="عنوان گروه"
          subtitle="۵ سؤال"
          moveUpLabel="انتقال گروه به بالا"
          moveDownLabel="انتقال گروه به پایین"
          editLabel="ویرایش گروه"
          removeLabel="حذف گروه"
          onMoveDown={() => void 0}
          onMoveUp={() => void 0}
          onEdit={() => void 0}
          onRemove={() => void 0}
        />
        <EntityItem
          title="عنوان گروه"
          subtitle="۵ سؤال"
          moveUpLabel="انتقال گروه به بالا"
          moveDownLabel="انتقال گروه به پایین"
          editLabel="ویرایش گروه"
          removeLabel="حذف گروه"
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
          لیست گروه‌های شما خالی می‌باشد.
        </Text> */}
      </Segment>
    </div>
  );
};

const ViewsTab = React.forwardRef(ViewsTabBase) as typeof ViewsTabBase;

export default ViewsTab;
