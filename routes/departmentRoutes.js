const express = require('express');
const router = express.Router();
const { 
  getDepartments, createDepartment, getDepartmentById,
  addDepartmentResource, deleteDepartmentResource
   
} = require('../controllers/departmentController');
const { protect } = require('../middleware/authMiddleware');

// General Doctors On Call
// router.route('/oncall').get(getOnCalls).post(protect, createOnCall);
// router.route('/oncall/:id').delete(protect, deleteOnCall);

// Departments
router.route('/').get(getDepartments).post(protect, createDepartment);
router.route('/:id').get(getDepartmentById);

// Department Resources
router.route('/:id/resources').post(protect, addDepartmentResource);
router.route('/:id/resources/:resourceId').delete(protect, deleteDepartmentResource);

module.exports = router;