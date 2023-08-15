export const validateName = (name) => {
    if (!name || name.trim().length === 0) {
      return "Name is required";
    }
    if (name.trim().length > 30) {
      return "Name should not exceed 30 characters";
    }
    return "";
  };
  
  export const validateRating = (rating) => {
    if (rating < 1 || rating > 5) {
      return "Rating should be between 1 and 5";
    }
    return "";
  };
  