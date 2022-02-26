import makeStyles from "@sonnat/ui/styles/makeStyles";
import { WithHeader } from "components/layout";
import FormSerializer, { SerializedForm } from "modules/FormSerializer";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import * as React from "react";
import type { PageLayout, PorserNextPage } from "types";
import { setTitleMeta } from "utils";

const useStyles = makeStyles({ root: {} }, { name: "Page" });

interface PageProps {
  data: SerializedForm;
}

const Page: PorserNextPage<PageProps> = ({ data }) => {
  const classes = useStyles();

  const form = React.useMemo(() => FormSerializer.deserialize(data), [data]);

  return (
    <React.Fragment>
      <Head>{setTitleMeta("PORSER | فرم رو پر کنید")}</Head>
      <section className={classes.root}>{form}</section>
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  await Promise.resolve();

  const form = new FormSerializer({
    title: "فرم هکتون",
    description: "فرمی که برای تست و ارائه پروژه در هکتون ایجاد شد."
  });

  form.createView({
    title: "سلام بچه‌ها",
    isInitialView: true,
    description:
      "خیلی خوشحالیم که ما این سه روز رو کنار شما گذروندیم. ایده ما درست کردن یه فرم‌ساز بود که محدودیت و مشکلاتمون رو با فرم‌سازهای قبلی حل کرد.\nحالا می‌خواهیم اولین فرمی که ساختیم رو با شما تست کنیم!"
  });

  form.createView({
    title: "گروه سؤال",
    description:
      "یکی از مشکلاتی که فرم‌سازای دیگه دارن (منظورمونم پرسلاین نیست!) این بود که نمی‌تونستیم چند‌تا سوال که به هم مرتبطن رو با هم نشون بدیم. اما اینجا می‌شه! حالا بهمون اطلاعات تیمتونو بگین که یه شام هکتون مهمونتون کنیم."
  });

  form.createView({
    title: "تک‌ انتخابی",
    description:
      "یکی دیگه از دردسرامون با فرم‌سازای دیگه،‌ نداشتن گزینه‌ی سایر و هیچ‌کدام و ... بود. که ما اینو با یه اشاره حلش کردیم *ـ*"
  });

  form.createView({ title: "چندگزینه‌ای‌ها" });

  form.createView({
    title: "ممنونیم که فرم رو پر کردید!",
    isFinalView: true
  });

  form.createField({
    type: "SINGLE_LINE_TEXT",
    title: "اسم تیمت چیه؟",
    description:
      "فیلد متنیِ پرسر می‌تونه ورودی‌های مختلف رو اعتبارسنجی کنه! یعنی شما عدد، متن، لینک و ... بده بهش، اون خودش می‌فهمه چی به چیه!",
    viewId: form.getViews()[1].id,
    props: { required: true }
  });

  form.createField({
    type: "NUMBER",
    title: "چند نفرین",
    viewId: form.getViews()[1].id,
    props: {}
  });

  form.createField({
    type: "URL",
    title: "لینک محصولتونو بهمون بدین.",
    viewId: form.getViews()[1].id,
    props: { placeholder: "http://example.com" }
  });

  form.createField({
    type: "CHOICE",
    title: "سایز هودیت چیه؟",
    description:
      "برای انتخاب درست تر سایزت،‌ هر گزینه یه توضیح هم داره که خب تو پرسلاین نمی‌شد همچین چیزیو داشته باشیم!",
    viewId: form.getViews()[2].id,
    props: {
      includeOther: true,
      otherDescription:
        "اینجام میتونی بهمون عرض سرشونه و قدتو بگی ما خودمون سایزتو در بیاریم.",
      options: [
        { label: "Small", description: "این واسه باربیاس", value: "small" },
        {
          label: "Medium",
          description:
            "این واسه اونایی که دلشون می‌خواد باربی باشن ولی پنیر پیتزا دوست دارن.",
          value: "medium"
        },
        {
          label: "Large",
          description: "این واسه مشتیاس که با خودشون روراستن..",
          value: "large"
        },
        {
          label: "X Large",
          description: "این واسه اوناس که همه‌چیو گشاد میپوشن.",
          value: "xlarge"
        },
        {
          label: "2X Large",
          description: "اینم واسه تپلای مهربونه :))",
          value: "xxlarge"
        }
      ]
    }
  });

  form.createField({
    type: "CHOICE",
    title: "رای شما کدوم تیماست؟",
    description:
      "می‌دونیم که فقط می‌تونیم به ۵ تا تیم رای بدیم. ما روی گزینه‌ها می‌تونیم محدودیت انتخاب بذاریم. حالا رای خودتونو بدین!",
    viewId: form.getViews()[3].id,
    props: {
      multiple: true,
      maxRequired: 5,
      minRequired: 5,
      includeOther: true,
      options: [
        { label: "پُرسِر", value: "a" },
        { label: "Porser", value: "b" },
        { label: "PORSER", value: "c" },
        { label: "porser", value: "d" },
        { label: "pors-er", value: "e" },
        { label: "por-ser", value: "f" }
      ]
    }
  });

  return { props: { data: form.serialize() } };
};

const Layout: PageLayout = page => <WithHeader>{page}</WithHeader>;

Page.getLayout = () => Layout;

export default Page;
