export const validateEmail = (email: string) => {
  const emailPattern = /\S+@\S+\.\S+/;
  let message = "";

  if (!email) {
    message = "Email address is required";
    return { isValid: false, message };
  } else if (!emailPattern.test(email)) {
    message = "Invalid email format";
    return { isValid: false, message };
  }

  return { isValid: true, message };
};

export const validatePassword = (password: string) => {
  let message = "";

  if (!password) {
    message = "Password is required";
    return { isValid: false, message };
  } else if (password.length < 6) {
    message = "Password should be at least 6 characters long";
    return { isValid: false, message };
  }

  return { isValid: true, message };
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
) => {
  let message = "";

  if (!confirmPassword) {
    message = "Confirm Password is required";
    return { isValid: false, message };
  } else if (password !== confirmPassword) {
    message = "Passwords do not match";
    return { isValid: false, message };
  }

  return { isValid: true, message };
};

export const validateName = (name: string) => {
  let message = "";

  if (!name) {
    message = "Name is required";
    return { isValid: false, message };
  }

  return { isValid: true, message };
};

export const validatePhone = (phone: string) => {
  const phonePattern = /^\d{10}$/;
  let message = "";

  if (!phone) {
    message = "Phone number is required";
    return { isValid: false, message };
  } else if (!phonePattern.test(phone)) {
    message = "Invalid phone number format";
    return { isValid: false, message };
  }

  return { isValid: true, message };
};

export const validatePhoto = (photo: string) => {
  let message = "";

  if (!photo) {
    message = "Photo is required";
    return { isValid: false, message };
  }

  return { isValid: true, message };
};
