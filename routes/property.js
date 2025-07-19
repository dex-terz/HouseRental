// In routes/auth.js or routes/property.js
const multer = require('multer');
const Property = require('../models/property');
const express=require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');

const upload = multer({ dest: 'public/uploads/' });

router.post('/add-property', upload.array('images', 10), (req, res) => {
  const imageUrls = req.files.map(file => `/uploads/${file.filename}`);
  const newProp = new Property({
    location: req.body.location,
    city: req.body.city,
    hall: req.body.hall,
    bedroom: req.body.bedroom,
    kitchen: req.body.kitchen,
    furnishing: req.body.furnishing,
    rent: req.body.rent,
    advance: req.body.advance,
    ownername:req.body.ownername,
    phone: req.body.phone,
    imageUrl: imageUrls
  });

  newProp.save() //saves in mongoDb database
    .then(() => {
      res.redirect('/home.html'); 
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Failed to add property.");
    });
});

// GET all properties as JSON
router.get('/all-properties', async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch properties" });
  }
});

const Admin = require('../models/Admin');

router.post('/delete-property/:id', async (req, res) => {
  const { username, password } = req.body;
  const { id } = req.params;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).send("❌ Invalid username or password.");
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).send("❌ Invalid username or password.");
    }

    await Property.findByIdAndDelete(id);
    return res.status(200).send("✅ Property deleted successfully."); 
  } catch (err) {
    console.error(err);
    return res.status(500).send("❌ Something went wrong.");
  }
   
});



module.exports = router;

