const publicRoutes = {
  ROOT: "/",

  HOME: "/home",

  COMMING_SOON: "/comming-soon",

  ERROR: "/*",
};

const privateRoutes = {
  TRANSACTION: {
    ROOT: "/transaction",
    UPDATE: "update",
  },
};

const routesConstants = {
  ...publicRoutes,
  ...privateRoutes,
};

export { routesConstants };
