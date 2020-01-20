import React from "react";
import PageLayout from "../../common/components/page-layout";
import Notification from "./add";

const AddNotification = (props: any) => {
  return (
    <>
      <PageLayout title="Add Notification">
        <Notification {...props} />
      </PageLayout>
    </>
  );
};

export default AddNotification;
