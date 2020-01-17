import React from "react";
import { Route } from "react-router-dom";
import loadable from "@loadable/component";

const Layout = loadable(() => import("../common/layout"));
const Login = loadable(() => import("../pages/login"));
const ArticleList = loadable(() => import("../pages/article-list"));
const AddArticle = loadable(() => import("../pages/article-add"));
const ArticleClassify = loadable(() => import("../pages/article-classify"));
const ArticleComments = loadable(() => import("../pages/article-comments"));
const ArticleDraft = loadable(() => import("../pages/article-draft"));
const AddMessage = loadable(() => import("../pages/message-add"));
const MessageList = loadable(() => import("../pages/messages-list"));
const ProjectAdd = loadable(() => import("../pages/project-add"));
const Projects = loadable(() => import("../pages/projects"));

const TagAdd = loadable(() => import("../pages/tag-add"));
const Tags = loadable(() => import("../pages/tags"));

const LostPostAdd = loadable(() => import("../pages/lostpost-add"));
const LostPostList = loadable(() => import("../pages/lostposts"));

const FoundPostAdd = loadable(() => import("../pages/foundpost-add"));
const FoundPostList = loadable(() => import("../pages/foundposts"));

const Home = loadable(() => import("../pages/home"));
export interface routeType {
  path: string;
  component: React.SFC;
}

export const routes = [
  {
    path: "/login",
    component: Login
  },
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/article",
        component: ArticleList
      },
      {
        path: "/article-add",
        component: AddArticle
      },
      {
        path: "/article-classify",
        component: ArticleClassify
      },
      {
        path: "/discuss",
        component: ArticleComments
      },
      {
        path: "/article-draft",
        component: ArticleDraft
      },
      {
        path: "/message-add",
        component: AddMessage
      },
      {
        path: "/message",
        component: MessageList
      },
      {
        path: "/project-add",
        component: ProjectAdd
      },
      {
        path: "/project",
        component: Projects
      },
      {
        path: "/tags-add",
        component: TagAdd
      },
      {
        path: "/tags",
        component: Tags
      },
      {
        path: "/lostpost-add",
        component: LostPostAdd
      },
      {
        path: "/lostposts",
        component: LostPostList
      },
      {
        path: "/foundpost-add",
        component: FoundPostAdd
      },
      {
        path: "/foundposts",
        component: FoundPostList
      },
      {
        path: "/",
        component: Home
      }
    ]
  }
];

export function RouteWithSubRoutes(route: any) {
  return (
    <Route
      path={route.path}
      render={props => <route.component {...props} {...route} />}
    />
  );
}
