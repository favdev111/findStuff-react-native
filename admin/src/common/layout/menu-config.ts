export interface menuType {
  title: string;
  key: string;
  icon?: string;
  path?: string;
  children?: menuType[];
}

export const menuConfig: menuType[] = [
  {
    title: "文章与举报投诉",
    key: "stuffposts",
    icon: "play-circle",
    children: [
      {
        title: "文章列表",
        key: "stuffposts-list",
        path: "/stuffposts"
      },
      {
        title: "举报投诉列表",
        key: "stuffposts-add",
        path: "/stuffposts-add"
      }
    ]
  },
  {
    title: "新闻",
    key: "news",
    icon: "play-circle",
    children: [
      {
        title: "列表",
        key: "news-all",
        path: "/news"
      },
      {
        title: "添加新闻",
        key: "news-add",
        path: "/news-add"
      }
    ]
  },
  {
    title: "通知",
    key: "notifications",
    icon: "play-circle",
    children: [
      {
        title: "列表",
        key: "notifications-all",
        path: "/notifications"
      },
      {
        title: "添加通知",
        key: "notifications-add",
        path: "/notifications-add"
      }
    ]
  },
  {
    title: "电话号",
    key: "contacts",
    icon: "play-circle",
    children: [
      {
        title: "列表",
        key: "contacts-all",
        path: "/contacts"
      },
      {
        title: "添加电话号",
        key: "contacts-add",
        path: "/contacts-add"
      }
    ]
  },
  {
    title: "应用信息",
    key: "profiles",
    icon: "play-circle",
    children: [
      {
        title: "列表",
        key: "profiles-all",
        path: "/profiles"
      },
      {
        title: "添加资料",
        key: "profiles-add",
        path: "/profiles-add"
      }
    ]
  },
  {
    title: "用户",
    key: "users",
    icon: "play-circle",
    children: [
      {
        title: "列表",
        key: "users-all",
        path: "/users"
      }
    ]
  }
];
