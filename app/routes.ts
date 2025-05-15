import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route
} from "@react-router/dev/routes";

export default [
  //index
  index("routes/home.tsx"),

  //prefix
  ...prefix("auth", [
    //layout
    layout("layouts/authLayout.tsx", [
      index("routes/auth/loginPage.tsx"),
      route("register", "routes/auth/registerPage.tsx")
    ])
  ]),
  //chat
  route("chat", "layouts/chatLayout.tsx", [
    // child routes
    index("routes/chat/noChatSelectedPage.tsx"),
    route(":contactId", "routes/chat/chatPage.tsx")
  ])
] satisfies RouteConfig;
