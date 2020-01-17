import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageLayout from "../../common/components/page-layout";
import Add from "./add";
import { fetchLostPost } from "../../utils/api";
import { useQuery } from "../../utils/index";
const LostPostAdd = (props: any) => {
  const [lostPost, setLostPost] = useState({});
  let location = useLocation();
  const query = useQuery();
  // 获取编辑数据
  useEffect(() => {
    (async () => {
      const _id = query.get("id");
      if (_id) {
        const { data } = await fetchLostPost({ _id });
        if (data.code) {
          setLostPost(data.result[0]);
        }
      } else {
        setLostPost({});
      }
    })();
  }, [location]);
  return (
    <PageLayout title="新增音乐">
      <Add {...props} item={lostPost} />
    </PageLayout>
  );
};

export default LostPostAdd;
