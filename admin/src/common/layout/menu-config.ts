export interface menuType {
  title: string;
  key: string;
  icon?: string;
  path?: string;
  children?: menuType[];
}

export const menuConfig: menuType[] = [
  {
    title: "HOME",
    key: "home",
    icon: "home",
    path: "/"
  },
  // {
  //   title: "文章管理",
  //   key: "article",
  //   icon: "edit",
  //   children: [
  //     {
  //       title: "文章列表",
  //       key: "article-list",
  //       path: "/article"
  //     },
  //     {
  //       title: "添加文章",
  //       key: "article-add",
  //       path: "/article-add"
  //     },
  //     {
  //       title: "草稿箱",
  //       key: "article-draft",
  //       path: "/article-draft"
  //     },
  //     {
  //       title: "文章归类",
  //       key: "article-classify",
  //       path: "/article-classify"
  //     }
  //   ]
  // },
  // {
  //   title: "tags",
  //   key: "tags",
  //   icon: "tags",
  //   children: [
  //     {
  //       title: "all tags",
  //       key: "tags-all",
  //       path: "/tags"
  //     },
  //     {
  //       title: "add new tag",
  //       key: "tags-add",
  //       path: "/tags-add"
  //     }
  //   ]
  // },
  // {
  //   title: "留言墙管理",
  //   key: "message",
  //   icon: "message",
  //   children: [
  //     {
  //       title: "全部留言",
  //       key: "message-all",
  //       path: "/message"
  //     },
  //     {
  //       title: "新增留言",
  //       key: "message-add",
  //       path: "/message-add"
  //     }
  //   ]
  // },
  // {
  //   title: "评论管理",
  //   key: "discuss",
  //   icon: "code",
  //   children: [
  //     {
  //       title: "文章评论",
  //       key: "discuss-article",
  //       path: "/discuss"
  //     }
  //   ]
  // },
  // {
  //   title: "项目管理",
  //   key: "project",
  //   icon: "project",
  //   children: [
  //     {
  //       title: "全部项目",
  //       key: "project-all",
  //       path: "/project"
  //     },
  //     {
  //       title: "新增项目",
  //       key: "project-add",
  //       path: "/project-add"
  //     }
  //   ]
  // },
  {
    title: "Lost posts",
    key: "lost",
    icon: "play-circle",
    children: [
      {
        title: "Lost posts",
        key: "lostpost-list",
        path: "/lostposts"
      }
      // {
      //   title: "add lost post",
      //   key: "lostpost-add",
      //   path: "/lostpost-add"
      // }
    ]
  },
  {
    title: "Found posts",
    key: "found",
    icon: "play-circle",
    children: [
      {
        title: "Found posts",
        key: "foundpost-list",
        path: "/foundposts"
      }
      // {
      //   title: "add found post",
      //   key: "foundpost-add",
      //   path: "/foundpost-add"
      // }
    ]
  }
];
