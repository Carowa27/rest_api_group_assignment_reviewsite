const {
  UnauthenticatedError,
  UnauthorizedError,
} = require("../utils/errorHandling");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
  let token;
  // Grab the Authorization header
  const authHeader = req.headers.authorization;

  // Check it contains JWT token and extract the token
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }

  // If no token, then throw UnauthenticatedError
  if (!token) {
    throw new UnauthenticatedError("Authentication invalid (no token)");
  }

  try {
    // Get the token payload (contents); user info
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Place the token info on the request object (create a new "user" field)
    req.user = {
      // @ts-ignore
      userId: payload.userId,
      // @ts-ignore
      //behöver fixa till if true?? då vi inte har roller utan boolean ist??
      role: payload.role,
      // @ts-ignore
      username: payload.username,
    };

    // Go to next step (controller || middleware)
    next();
  } catch (error) {
    throw new UnauthenticatedError(error);
    // throw new UnauthenticatedError("Authentication invalid (aM catch error)");
  }
};

// NOTE: Should always be placed AFTER isAuthenticated middleware
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user?.role || !roles.includes(req.user.role)) {
      throw new UnauthorizedError("Unauthorized Access (roles)");
    }
    next();
  };
};
