 

// const asyncHandler = require('express-async-handler');
// const Department = require('../models/Department');
// const AuditLog = require('../models/AuditLog');

// // @desc Get all departments
// // @route GET /api/departments
// // @access Public
// const getDepartments = asyncHandler(async (req, res) => {
//   const depts = await Department.find({});
//   res.json(depts);
// });

// // @desc Get single department
// // @route GET /api/departments/:id
// // @access Public
// const getDepartmentById = asyncHandler(async (req, res) => {
//   const dept = await Department.findById(req.params.id);
//   if (dept) {
//     res.json(dept);
//   } else {
//     res.status(404);
//     throw new Error('Department not found');
//   }
// });

// // @desc Create a new department
// // @route POST /api/departments
// // @access Private (Staff/Admin)
// const createDepartment = asyncHandler(async (req, res) => {
//   const { name, description, icon } = req.body;
  
//   const deptExists = await Department.findOne({ name });
//   if (deptExists) {
//     res.status(400);
//     throw new Error('Department already exists');
//   }

//   const dept = await Department.create({ name, description, icon });
  
//   // Check if req.user exists before logging
//   if (req.user) {
//     await AuditLog.create({ 
//       actorName: req.user.fullName, 
//       action: 'CREATE_DEPT', 
//       details: `Created department: ${name}` 
//     });
//   }
  
//   res.status(201).json(dept);
// });

// // @desc Add resource to department
// // @route POST /api/departments/:id/resources
// // @access Private
// const addDepartmentResource = asyncHandler(async (req, res) => {
//   const dept = await Department.findById(req.params.id);
//   if (!dept) {
//     res.status(404);
//     throw new Error('Department not found');
//   }

//   const { title, type, url, fileType } = req.body;
  
//   dept.resources.push({
//     title,
//     type,
//     url,
//     fileType,
//     uploadedBy: req.user.fullName,
//     date: Date.now()
//   });

//   await dept.save();
  
//   if (req.user) {
//     await AuditLog.create({ 
//       actorName: req.user.fullName, 
//       action: 'ADD_DEPT_RESOURCE', 
//       details: `Added ${type} to ${dept.name}: ${title}` 
//     });
//   }

//   res.status(201).json(dept);
// });

// // @desc Delete resource from department
// // @route DELETE /api/departments/:id/resources/:resourceId
// // @access Private
// const deleteDepartmentResource = asyncHandler(async (req, res) => {
//   const dept = await Department.findById(req.params.id);
//   if (!dept) {
//     res.status(404);
//     throw new Error('Department not found');
//   }

//   const resourceId = req.params.resourceId;
//   const initialLength = dept.resources.length;
  
//   dept.resources = dept.resources.filter(r => r._id.toString() !== resourceId);
  
//   if (dept.resources.length === initialLength) {
//     res.status(404);
//     throw new Error('Resource not found');
//   }

//   await dept.save();
  
//   if (req.user) {
//     await AuditLog.create({ 
//       actorName: req.user.fullName, 
//       action: 'DELETE_DEPT_RESOURCE', 
//       details: `Deleted resource from ${dept.name}` 
//     });
//   }
  
//   res.json(dept);
// });

// module.exports = { 
//   getDepartments, 
//   getDepartmentById, 
//   createDepartment, 
//   addDepartmentResource, 
//   deleteDepartmentResource 
// };
const asyncHandler = require('express-async-handler');
const Department = require('../models/Department');
const AuditLog = require('../models/AuditLog');

// @desc Get all departments
// @route GET /api/departments
// @access Public
const getDepartments = asyncHandler(async (req, res) => {
  const depts = await Department.find({});
  res.json(depts);
});

// @desc Get single department
// @route GET /api/departments/:id
// @access Public
const getDepartmentById = asyncHandler(async (req, res) => {
  const dept = await Department.findById(req.params.id);
  if (dept) {
    res.json(dept);
  } else {
    res.status(404);
    throw new Error('Department not found');
  }
});

// @desc Create a new department
// @route POST /api/departments
// @access Private (Admin Only preferably, or Staff)
const createDepartment = asyncHandler(async (req, res) => {
  const { name, description, icon } = req.body;
  
  const deptExists = await Department.findOne({ name });
  if (deptExists) {
    res.status(400);
    throw new Error('Department already exists');
  }

  const dept = await Department.create({ name, description, icon });
  
  if (req.user) {
    await AuditLog.create({ 
      actorName: req.user.fullName, 
      action: 'CREATE_DEPT', 
      details: `Created department: ${name}` 
    });
  }
  
  res.status(201).json(dept);
});

// @desc Add resource to department
// @route POST /api/departments/:id/resources
// @access Private (Admin or Department Member)
const addDepartmentResource = asyncHandler(async (req, res) => {
  const dept = await Department.findById(req.params.id);
  if (!dept) {
    res.status(404);
    throw new Error('Department not found');
  }

  // AUTHORIZATION CHECK
  // User must be ADMIN OR belong to this department (case-insensitive check)
  const isAuthorized = 
    req.user.role === 'ADMIN' || 
    (req.user.department && req.user.department.trim().toLowerCase() === dept.name.trim().toLowerCase());

  if (!isAuthorized) {
    res.status(403);
    throw new Error(`Access Denied: You can only edit the ${req.user.department} department.`);
  }

  const { title, type, url, fileType } = req.body;
  
  dept.resources.push({
    title,
    type,
    url,
    fileType,
    uploadedBy: req.user.fullName,
    date: Date.now()
  });

  await dept.save();
  
  await AuditLog.create({ 
    actorName: req.user.fullName, 
    action: 'ADD_DEPT_RESOURCE', 
    details: `Added ${type} to ${dept.name}: ${title}` 
  });

  res.status(201).json(dept);
});

// @desc Delete resource from department
// @route DELETE /api/departments/:id/resources/:resourceId
// @access Private (Admin or Department Member)
const deleteDepartmentResource = asyncHandler(async (req, res) => {
  const dept = await Department.findById(req.params.id);
  if (!dept) {
    res.status(404);
    throw new Error('Department not found');
  }

  // AUTHORIZATION CHECK
  const isAuthorized = 
    req.user.role === 'ADMIN' || 
    (req.user.department && req.user.department.trim().toLowerCase() === dept.name.trim().toLowerCase());

  if (!isAuthorized) {
    res.status(403);
    throw new Error(`Access Denied: You can only edit the ${req.user.department} department.`);
  }

  const resourceId = req.params.resourceId;
  const initialLength = dept.resources.length;
  
  dept.resources = dept.resources.filter(r => r._id.toString() !== resourceId);
  
  if (dept.resources.length === initialLength) {
    res.status(404);
    throw new Error('Resource not found');
  }

  await dept.save();
  
  await AuditLog.create({ 
    actorName: req.user.fullName, 
    action: 'DELETE_DEPT_RESOURCE', 
    details: `Deleted resource from ${dept.name}` 
  });
  
  res.json(dept);
});

module.exports = { 
  getDepartments, 
  getDepartmentById, 
  createDepartment, 
  addDepartmentResource, 
  deleteDepartmentResource 
};

