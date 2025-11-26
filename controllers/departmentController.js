// const asyncHandler = require('express-async-handler');
// const Department = require('../models/Department');
 
// const AuditLog = require('../models/AuditLog');

// // --- DEPARTMENTS ---

// // @desc Get all departments
// const getDepartments = asyncHandler(async (req, res) => {
//   const depts = await Department.find({});
//   res.json(depts);
// });

// // @desc Get single department
// const getDepartmentById = asyncHandler(async (req, res) => {
//   const dept = await Department.findById(req.params.id);
//   if (dept) res.json(dept);
//   else {
//     res.status(404);
//     throw new Error('Department not found');
//   }
// });

// // @desc Create a new department (Admin only usually, or seed)
// const createDepartment = asyncHandler(async (req, res) => {
//   const { name, description, icon } = req.body;
//   const dept = await Department.create({ name, description, icon });
//   await AuditLog.create({ actorName: req.user.fullName, action: 'CREATE_DEPT', details: `Created department: ${name}` });
//   res.status(201).json(dept);
// });

// // @desc Add resource to department
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
//   await AuditLog.create({ 
//     actorName: req.user.fullName, 
//     action: 'ADD_DEPT_RESOURCE', 
//     details: `Added ${type} to ${dept.name}: ${title}` 
//   });

//   res.status(201).json(dept);
// });

// // @desc Delete resource
// const deleteDepartmentResource = asyncHandler(async (req, res) => {
//   const dept = await Department.findById(req.params.id);
//   if (!dept) {
//     res.status(404);
//     throw new Error('Department not found');
//   }

//   const resourceId = req.params.resourceId;
//   dept.resources = dept.resources.filter(r => r._id.toString() !== resourceId);
//   await dept.save();
  
//   res.json(dept);
// });


// // --- DOCTORS ON CALL ---

// const getOnCalls = asyncHandler(async (req, res) => {
//   const items = await OnCall.find({}).sort({ createdAt: -1 });
//   res.json(items);
// });

// const createOnCall = asyncHandler(async (req, res) => {
//   const { title, month, fileUrl, fileType } = req.body;
//   const item = await OnCall.create({
//     title, month, fileUrl, fileType, uploadedBy: req.user.fullName
//   });
//   await AuditLog.create({ actorName: req.user.fullName, action: 'UPLOAD_ROSTER', details: `Uploaded roster: ${title}` });
//   res.status(201).json(item);
// });

// const deleteOnCall = asyncHandler(async (req, res) => {
//   const item = await OnCall.findById(req.params.id);
//   if(item) {
//     await OnCall.deleteOne({_id: item._id});
//     res.json({ message: 'Roster deleted' });
//   } else {
//     res.status(404); throw new Error('Not found');
//   }
// });

// module.exports = { 
//   getDepartments, 
//   getDepartmentById, 
//   createDepartment, 
//   addDepartmentResource, 
//   deleteDepartmentResource,
//   getOnCalls,
//   createOnCall,
//   deleteOnCall
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
// @access Private (Staff/Admin)
const createDepartment = asyncHandler(async (req, res) => {
  const { name, description, icon } = req.body;
  
  const deptExists = await Department.findOne({ name });
  if (deptExists) {
    res.status(400);
    throw new Error('Department already exists');
  }

  const dept = await Department.create({ name, description, icon });
  
  // Check if req.user exists before logging
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
// @access Private
const addDepartmentResource = asyncHandler(async (req, res) => {
  const dept = await Department.findById(req.params.id);
  if (!dept) {
    res.status(404);
    throw new Error('Department not found');
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
  
  if (req.user) {
    await AuditLog.create({ 
      actorName: req.user.fullName, 
      action: 'ADD_DEPT_RESOURCE', 
      details: `Added ${type} to ${dept.name}: ${title}` 
    });
  }

  res.status(201).json(dept);
});

// @desc Delete resource from department
// @route DELETE /api/departments/:id/resources/:resourceId
// @access Private
const deleteDepartmentResource = asyncHandler(async (req, res) => {
  const dept = await Department.findById(req.params.id);
  if (!dept) {
    res.status(404);
    throw new Error('Department not found');
  }

  const resourceId = req.params.resourceId;
  const initialLength = dept.resources.length;
  
  dept.resources = dept.resources.filter(r => r._id.toString() !== resourceId);
  
  if (dept.resources.length === initialLength) {
    res.status(404);
    throw new Error('Resource not found');
  }

  await dept.save();
  
  if (req.user) {
    await AuditLog.create({ 
      actorName: req.user.fullName, 
      action: 'DELETE_DEPT_RESOURCE', 
      details: `Deleted resource from ${dept.name}` 
    });
  }
  
  res.json(dept);
});

module.exports = { 
  getDepartments, 
  getDepartmentById, 
  createDepartment, 
  addDepartmentResource, 
  deleteDepartmentResource 
};