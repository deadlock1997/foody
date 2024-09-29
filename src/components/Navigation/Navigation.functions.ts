export const IsOnHomePage = (path: string) => {
  return path === "/";
};
export const IsOnSignUpPage = (path: string) => {
  return path === "/signup";
};

export const activeLink = (path: string, link: string) => {
  return path === link ? "active" : "";
};