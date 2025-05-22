import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  //index
  index("routes/home.tsx"),

  route("auth", "layouts/authLayout.tsx", [
    index("routes/auth/loginPage.tsx"),
    route("register", "routes/auth/registerPage.tsx"),
    route("testing", "routes/auth/testingPage.tsx"),
    route("testing-arg/:id/:name/:age", "routes/auth/testingArgPage.tsx")
  ]),
  route("chat", "layouts/chatLayout.tsx", [
    // child routes
    index("routes/chat/noChatSelectedPage.tsx"),
    route(":contactId", "routes/chat/chatPage.tsx")
  ])
] satisfies RouteConfig;
