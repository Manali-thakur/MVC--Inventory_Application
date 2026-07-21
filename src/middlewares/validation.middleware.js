// Hoisted Declaration => a function
// class
// assignment expression
import { body, validationResult } from "express-validator";

// validationResult for errors

const validateRequest = async (req, res, next) => {
  // validate the data
  // printing the errors
  console.log(req.body);

  // 1.Setup the rules for validation.
  const rules = [
    body("title").notEmpty().withMessage("Name is Required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price should be a positive value"),
    body("image").isURL().withMessage("Invalid URL"),
    body("description").notEmpty().withMessage("Description is Necessary"),
    body("rating").isFloat({ gt: 0 }).withMessage("Rating should more than 0"),
    body("count").isFloat({ gt: 0 }).withMessage("Count is Invalid"),
  ];

  // 2.Run those Rules
  await Promise.all(rules.map((rule) => rule.run(req)));

  // 3. Check if there are any error after running the rules
  // will return all the errors
  var validationErrors = validationResult(req);

  // 4. if error then written the error message
  if (!validationErrors.isEmpty()) {
    return res.render("new-product", {
      errorMessage: validationErrors.array(),
      success: false,
    });
  }

  // if no error then it will point to another middleware to the pipeline
  next();
};

export default validateRequest;
