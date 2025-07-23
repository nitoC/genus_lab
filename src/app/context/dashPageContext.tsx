import { createContext } from "react";

const dashPageContext = createContext({
  page: "dashboard",
  setPage: (val: string) => {},
});

export default dashPageContext;
