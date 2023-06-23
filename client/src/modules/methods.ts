export function validateInput(value: string, type: string) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  let feedback = "",
    feedbackColor = "#DD0000",
    isValid = false;

  switch (type) {
    case "email":
      if (value === "") {
        feedback = "Don't forget to provide your email address.";
        feedbackColor = "#DD9999";
      }

      if (!emailRegex.test(value) && value != "") {
        feedback = "Please enter a valid email address.";
      }

      if (emailRegex.test(value)) {
        feedback = "Looks good! The email address is valid.";
        feedbackColor = "#00DD00";
        isValid = true;
      }

      break;

    case "password":
      if (value === "") {
        feedback = "Don't forget to provide a password.";
        feedbackColor = "#DD9999";
      }

      if (!passwordRegex.test(value) && value != "") {
        if (value.length < 8) {
          feedback = "Password must be at least 8 characters long.";
        } else if (!/(?=.*[a-z])/.test(value)) {
          feedback = "Password must contain atleast a lowercase letter";
        } else if (!/(?=.*[A-Z])/.test(value)) {
          feedback = "Password must contain atleast an uppercase letter";
        } else if (!/(?=.*\d)/.test(value)) {
          feedback = "Password must contain atleast a digit";
        } else {
          feedback = "Oops! The password is not strong enough.";
        }
      }

      if (passwordRegex.test(value)) {
        feedback = "Looks good! The password is strong and secure.";
        feedbackColor = "#00DD00";
        isValid = true;
      }

      break;

    default:
      if (value.length < 3) {
        feedback = `Your ${type} must be more than 3 characters long`;
        feedbackColor = "DD0000";
        isValid = false;
      } else {
        feedback = `Your ${type} is valid`;
        feedbackColor = "00DD00";
        isValid = true;
      }
  }

  return {
    feedback,
    feedbackColor,
    isValid,
  };
}
