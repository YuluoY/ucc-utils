import * as types from "./types";
import * as core from "./core";

export { types, core };

console.log(
  JSON.stringify(
    core.convertRoutesToLevel([
      { id: 1, name: "home", path: "/" },
      { id: 2, name: "about", path: "/about" },
      { id: 3, name: "blog", path: "/blog" },
      { id: 4, name: "blog-detail", path: "/blog/:id", parentId: 3 },
      {
        id: 5,
        name: "blog-detail",
        path: "/blog/:id/:slug",
        parentId: 4,
      },
      { id: 6, name: "about-us", path: "/about-us", parentId: 2 },
    ])
  )
);
