import validator from "validator";

//Register User Validation
export const validateSignupUser = (data) => {
    const errors = {};
  
    if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
      errors.name = 'Name cannot be Empty';
    }

    validateEmailAndPassword(data.email, data.password, errors);
  
    return { isValid: Object.keys(errors).length === 0, errors };
  };


  //login user validation
export const validateLoginUser = (loginData) => {
    const errors = {};

    validateEmailAndPassword(loginData.email, loginData.password, errors)

    return { isValid: Object.keys(errors).length === 0, errors };
}


//code refactoring
function validateEmailAndPassword(email, password, errors){
   if (!email || typeof email !== 'string' || !validator.isEmail(email)) {
      errors.email = 'Email is Not Valid';
    }
  
    if (!password || password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    return errors;
  }





  