const validateEmailByBrowser = (email: string): boolean => {
  const input = document.createElement("input");

  input.type = "email";
  input.value = email;
  input.required = true;

  return input.checkValidity();
};

export default validateEmailByBrowser;
