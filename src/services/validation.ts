const correctData = {
  name: "admin",
  password: "12345",
};
export const validateInput = (n: string, p: string): boolean => {
  if (n === correctData.name && p === correctData.password) {
    return true;
  } else {
    return false;
  }
};
