export const isStudent = (req, res, next) => {
    if (req.user.role !== 'Student') {
      return res.status(403).json({ 
        success: false, 
        message: "Access restricted to students only" 
      });
    }
    next();
  };
  
  export const isFaculty = (req, res, next) => {
    if (req.user.role !== 'Faculty') {
      return res.status(403).json({ 
        success: false, 
        message: "Access restricted to faculty only" 
      });
    }
    next();
  };
  
  export const isAdmin = (req, res, next) => {
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ 
        success: false, 
        message: "Access restricted to admins only" 
      });
    }
    next();
  };
  
  export const isFacultyOrAdmin = (req, res, next) => {
    if (!['Faculty', 'Admin'].includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: "Access restricted to faculty and admins only" 
      });
    }
    next();
  };