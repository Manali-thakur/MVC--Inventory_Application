// Hoisted Declaration => a function
// class
// assignment expression

const validateRequest = (req, res, next) => {
  // validate the data
  const { title, price, description, category, image, rating, count } =
    req.body;

  let errors = [];

  if (!title || title.trim() == "") {
    errors.push("Name is Required");
  }
  if (!price || parseFloat(price) < 1) {
    errors.push("Price is Invalid");
  }
  if (!description || description.trim() == "") {
    errors.push("Description is Required");
  }
  if (description.length > 0 && description.length < 10) {
    errors.push("Description should be more than 10 characters");
  }
  if (!rating || parseFloat(rating) < 1) {
    errors.push("Rating is Invalid");
  }
  if (!count || parseFloat(count) < 1) {
    errors.push("Count is Invalid");
  }
  try {
    const validUrl = new URL(image);
  } catch (err) {
    errors.push("URL is Invalid");
  }

  if (errors.length > 0) {
    return res.render("new-product", {
      errorMessage: errors,
      success: false,
    });
  }

  // if no error then it will point to another middleware to the pipeline
  next();
};


export default validateRequest;
