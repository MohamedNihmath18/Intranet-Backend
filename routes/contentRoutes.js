// const express = require('express');
// const router = express.Router();
// const {
//   getAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement,
//   getDocuments, createDocument, deleteDocument,
//   getLinks, createLink, deleteLink,
//   getBanners, createBanner, updateBanner, deleteBanner
// } = require('../controllers/contentController');
// const { protect, adminOnly } = require('../middleware/authMiddleware');

// // Announcements
// router.route('/announcements').get(getAnnouncements).post(protect, createAnnouncement);
// router.route('/announcements/:id').put(protect, updateAnnouncement).delete(protect, deleteAnnouncement);

// // Documents
// router.route('/documents').get(getDocuments).post(protect, createDocument);
// router.route('/documents/:id').delete(protect, deleteDocument);

// // Links
// router.route('/links').get(getLinks).post(protect, createLink);
// router.route('/links/:id').delete(protect, deleteLink);

// // Banners (Admin Only)
// router.route('/banners').get(getBanners).post(protect, adminOnly, createBanner);
// router.route('/banners/:id').put(protect, adminOnly, updateBanner).delete(protect, adminOnly, deleteBanner);

// module.exports = router;

const express = require('express');
const router = express.Router();
const {
  getAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement,
  getDocuments, createDocument, deleteDocument,
  getLinks, createLink, deleteLink,
  getBanners, createBanner, updateBanner, deleteBanner,
  getOnCalls, createOnCall, deleteOnCall
} = require('../controllers/contentController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Announcements
router.route('/announcements').get(getAnnouncements).post(protect, createAnnouncement);
router.route('/announcements/:id').put(protect, updateAnnouncement).delete(protect, deleteAnnouncement);

// Documents
router.route('/documents').get(getDocuments).post(protect, createDocument);
router.route('/documents/:id').delete(protect, deleteDocument);

// Links
router.route('/links').get(getLinks).post(protect, createLink);
router.route('/links/:id').delete(protect, deleteLink);

// Banners (Admin Only)
router.route('/banners').get(getBanners).post(protect, adminOnly, createBanner);
router.route('/banners/:id').put(protect, adminOnly, updateBanner).delete(protect, adminOnly, deleteBanner);

// Doctors On-Call - ENSURE THIS SECTION EXISTS
router.route('/oncall').get(getOnCalls).post(protect, createOnCall);
router.route('/oncall/:id').delete(protect, deleteOnCall);

module.exports = router;