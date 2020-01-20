import React from "react";
import PageLayout from "../../common/components/page-layout";
import Tag from "./add";

const AddTag = (props: any) => {
  return (
    <>
      <PageLayout title="Add News">
        <Tag {...props} />
      </PageLayout>
    </>
  );
};

export default AddTag;
