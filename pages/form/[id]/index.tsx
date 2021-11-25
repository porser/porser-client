import makeStyles from "@sonnat/ui/styles/makeStyles";
import { nanoid } from "nanoid";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import * as React from "react";
import type { Layout, NextPageWithLayout } from "types";
import { setTitleMeta } from "utils";
import {
  ChoiceField,
  deserialize,
  Form,
  MultiLineTextField,
  Serialize,
  SingleLineTextField,
  NumberField,
  View,
  URLField
} from "utils/serialization";

const useStyles = makeStyles(
  {
    root: {}
  },
  { name: "Page" }
);

interface PageProps {
  data: Serialize;
}

const Page: NextPageWithLayout<PageProps> = props => {
  const { data } = props;
  const classes = useStyles();

  const form = React.useMemo(() => deserialize(data), [data]);

  return (
    <React.Fragment>
      <Head>{setTitleMeta("PORSER | فرم رو پر کنید")}</Head>
      <section className={classes.root}>{form}</section>
    </React.Fragment>
  );
};

const PageLayout: Layout = page => <React.Fragment>{page}</React.Fragment>;

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  await Promise.resolve();

  const form = new Form();

  const view = new View(form, {
    title: "گروه سؤال",
    description:
      "یکی از مشکلاتی که فرم‌سازای دیگه دارن (منظورمونم پرسلاین نیست!) این بود که نمی‌تونستیم چند‌تا سوال که به هم مرتبطن رو با هم نشون بدیم. اما اینجا می‌شه! حالا بهمون اطلاعات تیمتونو بگین که یه شام هکتون مهمونتون کنیم."
  });
  form.createView(view);

  const view1 = new View(form, {
    title: "تک‌ انتخابی",
    description:
      "یکی دیگه از دردسرامون با فرم‌سازای دیگه،‌ نداشتن گزینه‌ی سایر و هیچ‌کدام و ... بود. که ما اینو با یه اشاره حلش کردیم *ـ*"
  });
  form.createView(view1);

  const view2 = new View(form, {
    title: "چندگزینه‌ای‌ها",
    description: ""
  });
  form.createView(view2);

  const field1 = new SingleLineTextField(view, {
    title: "اسم تیمت چیه؟",
    description:
      "فیلد متنیِ پرسر می‌تونه ورودی‌های مختلف رو اعتبارسنجی کنه! یعنی شما عدد، متن، لینک و ... بده بهش، اون خودش می‌فهمه چی به چیه!",
    props: { defaultValue: "" }
  });
  const field2 = new NumberField(view, {
    title: "چند نفرین",
    description: "",
    props: { defaultValue: 0 }
  });
  const field3 = new URLField(view, {
    title: "لینک محصولتونو بهمون بدین.",
    description: "",
    props: { defaultValue: "" }
  });

  const field4 = new ChoiceField(view1, {
    title: "سایز هودیت چیه؟",
    description:
      "برای انتخاب درست تر سایزت،‌ هر گزینه یه توضیح هم داره که خب تو پرسلاین نمی‌شد همچین چیزیو داشته باشیم!",
    props: {
      allowOther: true,
      otherDescription:
        "اینجام میتونی بهمون عرض سرشونه و قدتو بگی ما خودمون سایزتو در بیاریم.",
      options: [
        {
          id: nanoid(),
          index: 0,
          label: "Small",
          description: "این واسه باربیاس",
          value: "small"
        },
        {
          id: nanoid(),
          index: 0,
          label: "Medium",
          description:
            "این واسه اونایی که دلشون می‌خواد باربی باشن ولی پنیر پیتزا دوست دارن.",
          value: "medium"
        },
        {
          id: nanoid(),
          index: 0,
          label: "Large",
          description: "این واسه مشتیاس که با خودشون روراستن..",
          value: "large"
        },
        {
          id: nanoid(),
          index: 0,
          label: "X Large",
          description: "این واسه اوناس که همه‌چیو گشاد میپوشن.",
          value: "xlarge"
        },
        {
          id: nanoid(),
          index: 0,
          label: "2X Large",
          description: "اینم واسه تپلای مهربونه :))",
          value: "2xlarge"
        }
      ]
    }
  });
  const field5 = new ChoiceField(view2, {
    title: "رای شما کدوم تیماست؟",
    description:
      "می‌دونیم که فقط می‌تونیم به ۵ تا تیم رای بدیم. ما روی گزینه‌ها می‌تونیم محدودیت انتخاب بذاریم. حالا رای خودتونو بدین!",
    props: {
      multiple: true,
      max: 5,
      options: [
        {
          id: nanoid(),
          index: 0,
          label: "پرسر",
          value: "a"
        },
        {
          id: nanoid(),
          index: 0,
          label: "Porser",
          value: "b"
        },
        {
          id: nanoid(),
          index: 0,
          label: "پرسرِ خالی",
          value: "c"
        },
        {
          id: nanoid(),
          index: 0,
          label: "پرسرِ پلاستیکی",
          value: "d"
        },
        {
          id: nanoid(),
          index: 0,
          label: "Porser Plus",
          value: "e"
        },
        {
          id: nanoid(),
          index: 0,
          label: "Porser Pro",
          value: "f"
        }
      ]
    }
  });

  form.createField(field1);
  form.createField(field2);
  form.createField(field3);
  form.createField(field4);
  form.createField(field5);

  return { props: { data: form.getSerializedVersion() } };
};
Page.getLayout = () => PageLayout;

export default Page;
