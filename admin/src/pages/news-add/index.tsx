import React from "react";
import PageLayout from "../../common/components/page-layout";
import Tag from "./add";

const AddTag = (props: any) => {
  return (
    <>
      <PageLayout title="添加新闻">
        <Tag {...props} />
      </PageLayout>
    </>
  );
};

export default AddTag;
