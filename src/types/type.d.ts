type Route = {
  path?: string;
  index?: boolean;
  element?: React.ReactNode;
  children?: Array<Route>;
};
