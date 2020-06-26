export const checkLoggedIn = (user) => {
  let isLoggedIn = false;
  if (user != null) {
    return (isLoggedIn = true);
  }
  return isLoggedIn;
};

export const getCategoryName = (categoryId) => {
  const categoryNames = ['', 'Dessert', 'Förrätt', 'Middag', 'Bakning'];

  return categoryNames[categoryId];
};

export default checkLoggedIn;
