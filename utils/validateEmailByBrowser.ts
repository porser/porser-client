const validateEmailByBrowser = (email: string): boolean => {
  const input = document.createElement("input");

  input.type = "email";
  input.value = email;

  return input.checkValidity();
};

export default validateEmailByBrowser;
