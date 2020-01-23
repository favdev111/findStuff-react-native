import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageLayout from "../../common/components/page-layout";
import Add from "./add";
import { fetchStuffPost } from "../../utils/api";
import { useQuery } from "../../utils/index";
const StuffPostAdd = (props: any) => {
  const [stuffPost, setStuffPost] = useState({
    user: "",
    tag: "",
    place: "",
    address: "",
    kind: "lost",
    fee: 0,
    description: "",
    photos: []
  });

  let location = useLocation();
  const query = useQuery();
  // 获取编辑数据
  useEffect(() => {
    (async () => {
      const _id = query.get("id");
      if (_id) {
        const { data } = await fetchStuffPost({ _id });
        if (data.code) {
          setStuffPost(data.result[0]);
        }
      } else {
        // setStuffPost();
      }
    })();
  }, [location]);
  return (
    <PageLayout title="Add stuff post">
      <Add {...props} item={stuffPost} />
    </PageLayout>
  );
};

export default StuffPostAdd;
