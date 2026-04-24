const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const auth = require('../middleware/auth');
const role = require('../middleware/roleMiddleware');

router.get('/', auth, role("admin", "user"), userController.getUsersAll);

router.post('/register', userController.registerUser);
router.post("/login", userController.loginUser);

router.put('/:id', auth, userController.updateUser);
router.delete('/:id', auth, role("admin"), userController.deleteUser);
module.exports = router;