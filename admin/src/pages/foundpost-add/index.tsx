import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageLayout from "../../common/components/page-layout";
import Add from "./add";
import { fetchFoundPost } from "../../utils/api";
import { useQuery } from "../../utils/index";
const FoundPostAdd = (props: any) => {
  const [foundPost, setFoundPost] = useState({});
  let location = useLocation();
  const query = useQuery();
  // 获取编辑数据
  useEffect(() => {
    (async () => {
      const _id = query.get("id");
      if (_id) {
        const { data } = await fetchFoundPost({ _id });
        if (data.code) {
          setFoundPost(data.result[0]);
        }
      } else {
        setFoundPost({});
      }
    })();
  }, [location]);
  return (
    <PageLayout title="新增音乐">
      <Add {...props} item={foundPost} />
    </PageLayout>
  );
};

export default FoundPostAdd;
