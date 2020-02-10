import React from "react";
// import { RouteComponentProps } from 'react-router'
import PageLayout from "../../common/components/page-layout";
const Home = () => {
  window.location.href = "/login";
  return <PageLayout title="首页">后台管理系统</PageLayout>;
};

export default Home;
