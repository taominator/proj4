const router = require('express').Router();
const {
  getEmployers,
  getEmployer,
  registerEmployer,
  loginEmployer,
  getMe,
  updateEmployer,
  deleteEmployer,
} = require('../controllers/employerController');

const { protectEmployer } = require('../middleware/authEmployerMiddleware');

router.get('/employers', getEmployers);
router.get('/:id', protectEmployer, getEmployer);
router.post('/register', registerEmployer);
router.post('/login', loginEmployer);
router.post('/:id', protectEmployer, updateEmployer);
router.delete('/:id', protectEmployer, deleteEmployer);

module.exports = router;
