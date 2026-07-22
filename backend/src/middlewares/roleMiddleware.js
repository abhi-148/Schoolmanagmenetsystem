const authorizeRoles = (...roles) => {

  return (req, res, next) => {

    // User not found
    if (!req.user) {

      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });

    }

    // Role not allowed
    if (!roles.includes(req.user.role)) {

      return res.status(403).json({
        success: false,
        message: "Access Denied"
      });

    }

    next();

  };

};

module.exports = authorizeRoles;