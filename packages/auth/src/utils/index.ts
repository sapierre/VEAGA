export const generateName = (email: string) => {
  return email.split("@")[0] ?? "Guest";
};
