const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController'); 
const { authenticateToken } = require('../middlewares/authMiddleware');

router.use(authenticateToken);
router.post('/', taskController.createTask);
router.get('/', taskController.getTasks);
router.patch('/:taskId', taskController.updateTask);
router.delete('/:taskId', taskController.deleteTask);


module.exports = router;
