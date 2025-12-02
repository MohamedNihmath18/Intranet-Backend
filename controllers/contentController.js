 

// const asyncHandler = require('express-async-handler');
// const Announcement = require('../models/Announcement');
// const Document = require('../models/Document');
// const Link = require('../models/Link');
// const Banner = require('../models/Banner');
// const OnCall = require('../models/OnCall');
// const AuditLog = require('../models/AuditLog');

// /**
//  * ANNOUNCEMENTS
//  */
// const getAnnouncements = asyncHandler(async (req, res) => {
//   const items = await Announcement.find({}).sort({ date: -1 });
//   res.json(items);
// });

// const createAnnouncement = asyncHandler(async (req, res) => {
//   const { title, content, priority } = req.body;
//   const item = await Announcement.create({
//     title,
//     content,
//     priority,
//     authorName: req.user.fullName
//   });
  
//   await AuditLog.create({
//     actorName: req.user.fullName,
//     action: 'CREATE_ANNOUNCEMENT',
//     details: `Created announcement: ${title}`,
//   });
//   res.status(201).json(item);
// });

// const updateAnnouncement = asyncHandler(async (req, res) => {
//   const item = await Announcement.findById(req.params.id);
//   if (item) {
//     item.title = req.body.title || item.title;
//     item.content = req.body.content || item.content;
//     item.priority = req.body.priority || item.priority;
//     const updatedItem = await item.save();
    
//     await AuditLog.create({
//       actorName: req.user.fullName,
//       action: 'UPDATE_ANNOUNCEMENT',
//       details: `Updated announcement: ${updatedItem.title}`,
//     });
//     res.json(updatedItem);
//   } else {
//     res.status(404);
//     throw new Error('Announcement not found');
//   }
// });

// const deleteAnnouncement = asyncHandler(async (req, res) => {
//   const item = await Announcement.findById(req.params.id);
//   if (item) {
//     await Announcement.deleteOne({ _id: item._id });
//     await AuditLog.create({
//       actorName: req.user.fullName,
//       action: 'DELETE_ANNOUNCEMENT',
//       details: `Deleted announcement: ${item.title}`,
//     });
//     res.json({ message: 'Announcement removed' });
//   } else {
//     res.status(404);
//     throw new Error('Announcement not found');
//   }
// });

// /**
//  * DOCUMENTS
//  */
// const getDocuments = asyncHandler(async (req, res) => {
//   const items = await Document.find({}).sort({ date: -1 });
//   res.json(items);
// });

// const createDocument = asyncHandler(async (req, res) => {
//   const { title, category, type, size, fileName } = req.body;
//   const item = await Document.create({
//     title,
//     category,
//     type,
//     size,
//     fileName,
//     uploadedBy: req.user.fullName,
//     url: '#'
//   });
  
//   await AuditLog.create({
//     actorName: req.user.fullName,
//     action: 'UPLOAD_DOCUMENT',
//     details: `Uploaded document: ${fileName}`,
//   });
//   res.status(201).json(item);
// });

// const deleteDocument = asyncHandler(async (req, res) => {
//   const item = await Document.findById(req.params.id);
//   if (item) {
//     await Document.deleteOne({ _id: item._id });
//     await AuditLog.create({
//       actorName: req.user.fullName,
//       action: 'DELETE_DOCUMENT',
//       details: `Deleted document: ${item.title}`,
//     });
//     res.json({ message: 'Document removed' });
//   } else {
//     res.status(404);
//     throw new Error('Document not found');
//   }
// });

// /**
//  * LINKS
//  */
// const getLinks = asyncHandler(async (req, res) => {
//   const items = await Link.find({});
//   res.json(items);
// });

// const createLink = asyncHandler(async (req, res) => {
//   const { title, url, category, description, icon } = req.body;
//   const item = await Link.create({ title, url, category, description, icon });
  
//   await AuditLog.create({
//     actorName: req.user.fullName,
//     action: 'ADD_LINK',
//     details: `Added link: ${title} (${url})`,
//   });
//   res.status(201).json(item);
// });

// const deleteLink = asyncHandler(async (req, res) => {
//   const item = await Link.findById(req.params.id);
//   if (item) {
//     await Link.deleteOne({ _id: item._id });
//     await AuditLog.create({
//       actorName: req.user.fullName,
//       action: 'DELETE_LINK',
//       details: `Deleted link: ${item.title}`,
//     });
//     res.json({ message: 'Link removed' });
//   } else {
//     res.status(404);
//     throw new Error('Link not found');
//   }
// });

// /**
//  * BANNERS
//  */
// const getBanners = asyncHandler(async (req, res) => {
//   const items = await Banner.find({});
//   res.json(items);
// });

// const createBanner = asyncHandler(async (req, res) => {
//   const item = await Banner.create(req.body);
  
//   await AuditLog.create({
//     actorName: req.user.fullName,
//     action: 'CREATE_BANNER',
//     details: `Created banner: ${item.title}`,
//   });
//   res.status(201).json(item);
// });

// const updateBanner = asyncHandler(async (req, res) => {
//   const item = await Banner.findById(req.params.id);
//   if (item) {
//     Object.assign(item, req.body);
//     const updated = await item.save();
    
//     await AuditLog.create({
//       actorName: req.user.fullName,
//       action: 'UPDATE_BANNER',
//       details: `Updated banner: ${updated.title}`,
//     });
//     res.json(updated);
//   } else {
//     res.status(404);
//     throw new Error('Banner not found');
//   }
// });

// const deleteBanner = asyncHandler(async (req, res) => {
//   const item = await Banner.findById(req.params.id);
//   if (item) {
//     await Banner.deleteOne({ _id: item._id });
//     await AuditLog.create({
//       actorName: req.user.fullName,
//       action: 'DELETE_BANNER',
//       details: `Deleted banner: ${item.title}`,
//     });
//     res.json({ message: 'Banner removed' });
//   } else {
//     res.status(404);
//     throw new Error('Banner not found');
//   }
// });

// /**
//  * DOCTORS ON CALL
//  */
// const getOnCalls = asyncHandler(async (req, res) => {
//   const items = await OnCall.find({}).sort({ createdAt: -1 });
//   res.json(items);
// });

// const createOnCall = asyncHandler(async (req, res) => {
//   const { title, month, fileUrl, fileType } = req.body;
//   const item = await OnCall.create({
//     title,
//     month,
//     fileUrl,
//     fileType,
//     uploadedBy: req.user.fullName
//   });

//   await AuditLog.create({
//     actorName: req.user.fullName,
//     action: 'UPLOAD_ROSTER',
//     details: `Uploaded On-Call Roster: ${title}`,
//   });
//   res.status(201).json(item);
// });

// const deleteOnCall = asyncHandler(async (req, res) => {
//   const item = await OnCall.findById(req.params.id);
//   if (item) {
//     await OnCall.deleteOne({ _id: item._id });
//     await AuditLog.create({
//       actorName: req.user.fullName,
//       action: 'DELETE_ROSTER',
//       details: `Deleted On-Call Roster: ${item.title}`,
//     });
//     res.json({ message: 'Roster removed' });
//   } else {
//     res.status(404);
//     throw new Error('Roster not found');
//   }
// });

// module.exports = {
//   getAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement,
//   getDocuments, createDocument, deleteDocument,
//   getLinks, createLink, deleteLink,
//   getBanners, createBanner, updateBanner, deleteBanner,
//   getOnCalls, createOnCall, deleteOnCall
// };

 

// const asyncHandler = require('express-async-handler');
// const Announcement = require('../models/Announcement');
// const Document = require('../models/Document');
// const Link = require('../models/Link');
// const Banner = require('../models/Banner');
// const OnCall = require('../models/OnCall');
// const AuditLog = require('../models/AuditLog');

// /**
//  * ANNOUNCEMENTS
//  */
// const getAnnouncements = asyncHandler(async (req, res) => {
//   const items = await Announcement.find({}).sort({ date: -1 });
//   res.json(items);
// });

// const createAnnouncement = asyncHandler(async (req, res) => {
//   const { title, content, priority } = req.body;
//   const item = await Announcement.create({
//     title,
//     content,
//     priority,
//     authorName: req.user.fullName
//   });
  
//   await AuditLog.create({
//     actorName: req.user.fullName,
//     action: 'CREATE_ANNOUNCEMENT',
//     details: `Created announcement: ${title}`,
//   });
//   res.status(201).json(item);
// });

// const updateAnnouncement = asyncHandler(async (req, res) => {
//   const item = await Announcement.findById(req.params.id);
//   if (item) {
//     item.title = req.body.title || item.title;
//     item.content = req.body.content || item.content;
//     item.priority = req.body.priority || item.priority;
//     const updatedItem = await item.save();
    
//     await AuditLog.create({
//       actorName: req.user.fullName,
//       action: 'UPDATE_ANNOUNCEMENT',
//       details: `Updated announcement: ${updatedItem.title}`,
//     });
//     res.json(updatedItem);
//   } else {
//     res.status(404);
//     throw new Error('Announcement not found');
//   }
// });

// const deleteAnnouncement = asyncHandler(async (req, res) => {
//   const item = await Announcement.findById(req.params.id);
//   if (item) {
//     await Announcement.deleteOne({ _id: item._id });
//     await AuditLog.create({
//       actorName: req.user.fullName,
//       action: 'DELETE_ANNOUNCEMENT',
//       details: `Deleted announcement: ${item.title}`,
//     });
//     res.json({ message: 'Announcement removed' });
//   } else {
//     res.status(404);
//     throw new Error('Announcement not found');
//   }
// });

// /**
//  * DOCUMENTS
//  */
// const getDocuments = asyncHandler(async (req, res) => {
//   const items = await Document.find({}).sort({ date: -1 });
//   res.json(items);
// });

// const createDocument = asyncHandler(async (req, res) => {
//   const { title, category, type, size, fileName } = req.body;
//   const item = await Document.create({
//     title,
//     category,
//     type,
//     size,
//     fileName,
//     uploadedBy: req.user.fullName,
//     url: '#'
//   });
  
//   await AuditLog.create({
//     actorName: req.user.fullName,
//     action: 'UPLOAD_DOCUMENT',
//     details: `Uploaded document: ${fileName}`,
//   });
//   res.status(201).json(item);
// });

// const deleteDocument = asyncHandler(async (req, res) => {
//   const item = await Document.findById(req.params.id);
//   if (item) {
//     await Document.deleteOne({ _id: item._id });
//     await AuditLog.create({
//       actorName: req.user.fullName,
//       action: 'DELETE_DOCUMENT',
//       details: `Deleted document: ${item.title}`,
//     });
//     res.json({ message: 'Document removed' });
//   } else {
//     res.status(404);
//     throw new Error('Document not found');
//   }
// });

// /**
//  * LINKS
//  */
// const getLinks = asyncHandler(async (req, res) => {
//   const items = await Link.find({});
//   res.json(items);
// });

// const createLink = asyncHandler(async (req, res) => {
//   const { title, url, category, description, icon } = req.body;
//   const item = await Link.create({ title, url, category, description, icon });
  
//   await AuditLog.create({
//     actorName: req.user.fullName,
//     action: 'ADD_LINK',
//     details: `Added link: ${title} (${url})`,
//   });
//   res.status(201).json(item);
// });

// const deleteLink = asyncHandler(async (req, res) => {
//   const item = await Link.findById(req.params.id);
//   if (item) {
//     await Link.deleteOne({ _id: item._id });
//     await AuditLog.create({
//       actorName: req.user.fullName,
//       action: 'DELETE_LINK',
//       details: `Deleted link: ${item.title}`,
//     });
//     res.json({ message: 'Link removed' });
//   } else {
//     res.status(404);
//     throw new Error('Link not found');
//   }
// });

// /**
//  * BANNERS
//  */
// const getBanners = asyncHandler(async (req, res) => {
//   const items = await Banner.find({});
//   res.json(items);
// });

// const createBanner = asyncHandler(async (req, res) => {
//   const item = await Banner.create(req.body);
  
//   await AuditLog.create({
//     actorName: req.user.fullName,
//     action: 'CREATE_BANNER',
//     details: `Created banner: ${item.title}`,
//   });
//   res.status(201).json(item);
// });

// const updateBanner = asyncHandler(async (req, res) => {
//   const item = await Banner.findById(req.params.id);
//   if (item) {
//     Object.assign(item, req.body);
//     const updated = await item.save();
    
//     await AuditLog.create({
//       actorName: req.user.fullName,
//       action: 'UPDATE_BANNER',
//       details: `Updated banner: ${updated.title}`,
//     });
//     res.json(updated);
//   } else {
//     res.status(404);
//     throw new Error('Banner not found');
//   }
// });

// const deleteBanner = asyncHandler(async (req, res) => {
//   const item = await Banner.findById(req.params.id);
//   if (item) {
//     await Banner.deleteOne({ _id: item._id });
//     await AuditLog.create({
//       actorName: req.user.fullName,
//       action: 'DELETE_BANNER',
//       details: `Deleted banner: ${item.title}`,
//     });
//     res.json({ message: 'Banner removed' });
//   } else {
//     res.status(404);
//     throw new Error('Banner not found');
//   }
// });

// /**
//  * DOCTORS ON CALL
//  */
// const getOnCalls = asyncHandler(async (req, res) => {
//   const items = await OnCall.find({}).sort({ createdAt: -1 });
//   res.json(items);
// });

// const createOnCall = asyncHandler(async (req, res) => {
//   const { title, month, fileUrl, fileType } = req.body;
//   const item = await OnCall.create({
//     title,
//     month,
//     fileUrl,
//     fileType,
//     uploadedBy: req.user.fullName
//   });

//   await AuditLog.create({
//     actorName: req.user.fullName,
//     action: 'UPLOAD_ROSTER',
//     details: `Uploaded On-Call Roster: ${title}`,
//   });
//   res.status(201).json(item);
// });

// const deleteOnCall = asyncHandler(async (req, res) => {
//   const item = await OnCall.findById(req.params.id);
//   if (item) {
//     await OnCall.deleteOne({ _id: item._id });
//     await AuditLog.create({
//       actorName: req.user.fullName,
//       action: 'DELETE_ROSTER',
//       details: `Deleted On-Call Roster: ${item.title}`,
//     });
//     res.json({ message: 'Roster removed' });
//   } else {
//     res.status(404);
//     throw new Error('Roster not found');
//   }
// });

// module.exports = {
//   getAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement,
//   getDocuments, createDocument, deleteDocument,
//   getLinks, createLink, deleteLink,
//   getBanners, createBanner, updateBanner, deleteBanner,
//   getOnCalls, createOnCall, deleteOnCall
// };

// const asyncHandler = require('express-async-handler');
// const Announcement = require('../models/Announcement');
// const Document = require('../models/Document');
// const Link = require('../models/Link');
// const Banner = require('../models/Banner');
// const AuditLog = require('../models/AuditLog');

// /**
//  * ANNOUNCEMENTS
//  */
// const getAnnouncements = asyncHandler(async (req, res) => {
//   const items = await Announcement.find({}).sort({ date: -1 });
//   res.json(items);
// });

// const createAnnouncement = asyncHandler(async (req, res) => {
//   const { title, content, priority } = req.body;
//   const item = await Announcement.create({
//     title,
//     content,
//     priority,
//     authorName: req.user.fullName
//   });
  
//   await AuditLog.create({
//     actorName: req.user.fullName,
//     action: 'CREATE_ANNOUNCEMENT',
//     details: `Created announcement: ${title}`,
//   });
//   res.status(201).json(item);
// });

// const updateAnnouncement = asyncHandler(async (req, res) => {
//   const item = await Announcement.findById(req.params.id);
//   if (item) {
//     item.title = req.body.title || item.title;
//     item.content = req.body.content || item.content;
//     item.priority = req.body.priority || item.priority;
//     const updatedItem = await item.save();
    
//     await AuditLog.create({
//       actorName: req.user.fullName,
//       action: 'UPDATE_ANNOUNCEMENT',
//       details: `Updated announcement: ${updatedItem.title}`,
//     });
//     res.json(updatedItem);
//   } else {
//     res.status(404);
//     throw new Error('Announcement not found');
//   }
// });

// const deleteAnnouncement = asyncHandler(async (req, res) => {
//   const item = await Announcement.findById(req.params.id);
//   if (item) {
//     await Announcement.deleteOne({ _id: item._id });
//     await AuditLog.create({
//       actorName: req.user.fullName,
//       action: 'DELETE_ANNOUNCEMENT',
//       details: `Deleted announcement: ${item.title}`,
//     });
//     res.json({ message: 'Announcement removed' });
//   } else {
//     res.status(404);
//     throw new Error('Announcement not found');
//   }
// });

// /**
//  * DOCUMENTS
//  */
// const getDocuments = asyncHandler(async (req, res) => {
//   const items = await Document.find({}).sort({ date: -1 });
//   res.json(items);
// });

// const createDocument = asyncHandler(async (req, res) => {
//   const { title, category, type, size, fileName } = req.body;
//   const item = await Document.create({
//     title,
//     category,
//     type,
//     size,
//     fileName,
//     uploadedBy: req.user.fullName,
//     url: '#' // In a real app, you'd return the S3/Local path here
//   });
  
//   await AuditLog.create({
//     actorName: req.user.fullName,
//     action: 'UPLOAD_DOCUMENT',
//     details: `Uploaded document: ${fileName}`,
//   });
//   res.status(201).json(item);
// });

// const deleteDocument = asyncHandler(async (req, res) => {
//   const item = await Document.findById(req.params.id);
//   if (item) {
//     await Document.deleteOne({ _id: item._id });
//     await AuditLog.create({
//       actorName: req.user.fullName,
//       action: 'DELETE_DOCUMENT',
//       details: `Deleted document: ${item.title}`,
//     });
//     res.json({ message: 'Document removed' });
//   } else {
//     res.status(404);
//     throw new Error('Document not found');
//   }
// });

// /**
//  * LINKS
//  */
// const getLinks = asyncHandler(async (req, res) => {
//   const items = await Link.find({});
//   res.json(items);
// });

// const createLink = asyncHandler(async (req, res) => {
//   const { title, url, category, description, icon} = req.body;
//   const item = await Link.create({ title, url, category, description, icon });
  
//   await AuditLog.create({
//     actorName: req.user.fullName,
//     action: 'ADD_LINK',
//     details: `Added link: ${title} (${url})`,
//   });
//   res.status(201).json(item);
// });

// const deleteLink = asyncHandler(async (req, res) => {
//   const item = await Link.findById(req.params.id);
//   if (item) {
//     await Link.deleteOne({ _id: item._id });
//     await AuditLog.create({
//       actorName: req.user.fullName,
//       action: 'DELETE_LINK',
//       details: `Deleted link: ${item.title}`,
//     });
//     res.json({ message: 'Link removed' });
//   } else {
//     res.status(404);
//     throw new Error('Link not found');
//   }
// });

// /**
//  * BANNERS
//  */
// const getBanners = asyncHandler(async (req, res) => {
//   const items = await Banner.find({});
//   res.json(items);
// });

// const createBanner = asyncHandler(async (req, res) => {
//   const item = await Banner.create(req.body);
  
//   await AuditLog.create({
//     actorName: req.user.fullName,
//     action: 'CREATE_BANNER',
//     details: `Created banner: ${item.title}`,
//   });
//   res.status(201).json(item);
// });

// const updateBanner = asyncHandler(async (req, res) => {
//   const item = await Banner.findById(req.params.id);
//   if (item) {
//     Object.assign(item, req.body);
//     const updated = await item.save();
    
//     await AuditLog.create({
//       actorName: req.user.fullName,
//       action: 'UPDATE_BANNER',
//       details: `Updated banner: ${updated.title}`,
//     });
//     res.json(updated);
//   } else {
//     res.status(404);
//     throw new Error('Banner not found');
//   }
// });

// const deleteBanner = asyncHandler(async (req, res) => {
//   const item = await Banner.findById(req.params.id);
//   if (item) {
//     await Banner.deleteOne({ _id: item._id });
//     await AuditLog.create({
//       actorName: req.user.fullName,
//       action: 'DELETE_BANNER',
//       details: `Deleted banner: ${item.title}`,
//     });
//     res.json({ message: 'Banner removed' });
//   } else {
//     res.status(404);
//     throw new Error('Banner not found');
//   }
// });

// module.exports = {
//   getAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement,
//   getDocuments, createDocument, deleteDocument,
//   getLinks, createLink, deleteLink,
//   getBanners, createBanner, updateBanner, deleteBanner
// };


const asyncHandler = require('express-async-handler');
const Announcement = require('../models/Announcement');
const Document = require('../models/Document');
const Link = require('../models/Link');
const Banner = require('../models/Banner');
const OnCall = require('../models/OnCall');
const AuditLog = require('../models/AuditLog');

/**
 * ANNOUNCEMENTS
 */
const getAnnouncements = asyncHandler(async (req, res) => {
  const items = await Announcement.find({}).sort({ date: -1 });
  res.json(items);
});

const createAnnouncement = asyncHandler(async (req, res) => {
  const { title, content, priority } = req.body;
  const item = await Announcement.create({
    title,
    content,
    priority,
    authorName: req.user.fullName
  });
  
  await AuditLog.create({
    actorName: req.user.fullName,
    action: 'CREATE_ANNOUNCEMENT',
    details: `Created announcement: ${title}`,
  });
  res.status(201).json(item);
});

const updateAnnouncement = asyncHandler(async (req, res) => {
  const item = await Announcement.findById(req.params.id);
  if (item) {
    item.title = req.body.title || item.title;
    item.content = req.body.content || item.content;
    item.priority = req.body.priority || item.priority;
    const updatedItem = await item.save();
    
    await AuditLog.create({
      actorName: req.user.fullName,
      action: 'UPDATE_ANNOUNCEMENT',
      details: `Updated announcement: ${updatedItem.title}`,
    });
    res.json(updatedItem);
  } else {
    res.status(404);
    throw new Error('Announcement not found');
  }
});

const deleteAnnouncement = asyncHandler(async (req, res) => {
  const item = await Announcement.findById(req.params.id);
  if (item) {
    await Announcement.deleteOne({ _id: item._id });
    await AuditLog.create({
      actorName: req.user.fullName,
      action: 'DELETE_ANNOUNCEMENT',
      details: `Deleted announcement: ${item.title}`,
    });
    res.json({ message: 'Announcement removed' });
  } else {
    res.status(404);
    throw new Error('Announcement not found');
  }
});

/**
 * DOCUMENTS
 */
const getDocuments = asyncHandler(async (req, res) => {
  const items = await Document.find({}).sort({ date: -1 });
  res.json(items);
});

const createDocument = asyncHandler(async (req, res) => {
  const { title, category, type, size, fileName } = req.body;
  const item = await Document.create({
    title,
    category,
    type,
    size,
    fileName,
    uploadedBy: req.user.fullName,
    url: '#'
  });
  
  await AuditLog.create({
    actorName: req.user.fullName,
    action: 'UPLOAD_DOCUMENT',
    details: `Uploaded document: ${fileName}`,
  });
  res.status(201).json(item);
});

const deleteDocument = asyncHandler(async (req, res) => {
  const item = await Document.findById(req.params.id);
  if (item) {
    await Document.deleteOne({ _id: item._id });
    await AuditLog.create({
      actorName: req.user.fullName,
      action: 'DELETE_DOCUMENT',
      details: `Deleted document: ${item.title}`,
    });
    res.json({ message: 'Document removed' });
  } else {
    res.status(404);
    throw new Error('Document not found');
  }
});

/**
 * LINKS
 */
const getLinks = asyncHandler(async (req, res) => {
  const items = await Link.find({});
  res.json(items);
});

const createLink = asyncHandler(async (req, res) => {
  const { title, url, category, description, icon } = req.body;
  const item = await Link.create({ title, url, category, description, icon });
  
  await AuditLog.create({
    actorName: req.user.fullName,
    action: 'ADD_LINK',
    details: `Added link: ${title} (${url})`,
  });
  res.status(201).json(item);
});

const deleteLink = asyncHandler(async (req, res) => {
  const item = await Link.findById(req.params.id);
  if (item) {
    await Link.deleteOne({ _id: item._id });
    await AuditLog.create({
      actorName: req.user.fullName,
      action: 'DELETE_LINK',
      details: `Deleted link: ${item.title}`,
    });
    res.json({ message: 'Link removed' });
  } else {
    res.status(404);
    throw new Error('Link not found');
  }
});

/**
 * BANNERS
 */
const getBanners = asyncHandler(async (req, res) => {
  const items = await Banner.find({});
  res.json(items);
});

const createBanner = asyncHandler(async (req, res) => {
  const item = await Banner.create(req.body);
  
  await AuditLog.create({
    actorName: req.user.fullName,
    action: 'CREATE_BANNER',
    details: `Created banner: ${item.title}`,
  });
  res.status(201).json(item);
});

const updateBanner = asyncHandler(async (req, res) => {
  const item = await Banner.findById(req.params.id);
  if (item) {
    Object.assign(item, req.body);
    const updated = await item.save();
    
    await AuditLog.create({
      actorName: req.user.fullName,
      action: 'UPDATE_BANNER',
      details: `Updated banner: ${updated.title}`,
    });
    res.json(updated);
  } else {
    res.status(404);
    throw new Error('Banner not found');
  }
});

const deleteBanner = asyncHandler(async (req, res) => {
  const item = await Banner.findById(req.params.id);
  if (item) {
    await Banner.deleteOne({ _id: item._id });
    await AuditLog.create({
      actorName: req.user.fullName,
      action: 'DELETE_BANNER',
      details: `Deleted banner: ${item.title}`,
    });
    res.json({ message: 'Banner removed' });
  } else {
    res.status(404);
    throw new Error('Banner not found');
  }
});

/**
 * DOCTORS ON CALL
 */
// const getOnCalls = asyncHandler(async (req, res) => {
//   const items = await OnCall.find({}).sort({ createdAt: -1 });
//   res.json(items);
// });

// const createOnCall = asyncHandler(async (req, res) => {
//   const { title, month, fileUrl, fileType } = req.body;
//   const item = await OnCall.create({
//     title,
//     month,
//     fileUrl,
//     fileType,
//     uploadedBy: req.user.fullName
//   });

//   await AuditLog.create({
//     actorName: req.user.fullName,
//     action: 'UPLOAD_ROSTER',
//     details: `Uploaded On-Call Roster: ${title}`,
//   });
//   res.status(201).json(item);
// });

// const deleteOnCall = asyncHandler(async (req, res) => {
//   const item = await OnCall.findById(req.params.id);
//   if (item) {
//     await OnCall.deleteOne({ _id: item._id });
//     await AuditLog.create({
//       actorName: req.user.fullName,
//       action: 'DELETE_ROSTER',
//       details: `Deleted On-Call Roster: ${item.title}`,
//     });
//     res.json({ message: 'Roster removed' });
//   } else {
//     res.status(404);
//     throw new Error('Roster not found');
//   }
// });

/**
 * DOCTORS ON CALL (UPDATED)
 */
const getOnCalls = asyncHandler(async (req, res) => {
  // Sort by date (ascending - upcoming first)
  const items = await OnCall.find({}).sort({ date: 1 });
  res.json(items);
});

const createOnCall = asyncHandler(async (req, res) => {
  const { doctorName, specialty, date } = req.body;
  
  if (!doctorName || !specialty || !date) {
    res.status(400);
    throw new Error('Please provide Doctor Name, Specialty, and Date');
  }

  const item = await OnCall.create({
    doctorName,
    specialty,
    date,
    uploadedBy: req.user.fullName
  });

  await AuditLog.create({
    actorName: req.user.fullName,
    action: 'ADD_ROSTER_ENTRY',
    details: `Added on-call: Dr. ${doctorName} (${specialty}) for ${date}`,
  });
  res.status(201).json(item);
});

const deleteOnCall = asyncHandler(async (req, res) => {
  const item = await OnCall.findById(req.params.id);
  if (item) {
    await OnCall.deleteOne({ _id: item._id });
    await AuditLog.create({
      actorName: req.user.fullName,
      action: 'DELETE_ROSTER_ENTRY',
      details: `Deleted on-call entry for Dr. ${item.doctorName}`,
    });
    res.json({ message: 'Entry removed' });
  } else {
    res.status(404);
    throw new Error('Entry not found');
  }
});


module.exports = {
  getAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement,
  getDocuments, createDocument, deleteDocument,
  getLinks, createLink, deleteLink,
  getBanners, createBanner, updateBanner, deleteBanner,
  getOnCalls, createOnCall, deleteOnCall
};
