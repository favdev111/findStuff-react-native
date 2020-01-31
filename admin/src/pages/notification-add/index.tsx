import React from "react";
import PageLayout from "../../common/components/page-layout";
import Notification from "./add";

const AddNotification = (props: any) => {
  return (
    <>
      <PageLayout title="添加通知">
        <Notification {...props} />
      </PageLayout>
    </>
  );
};

export default AddNotification;
