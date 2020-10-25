import {Router} from 'express'
import {createTest, deleteTest, getHealthCheck, getTest, getTests, updateTest} from '../controllers'

const router: Router = Router()

// Health Check
router.get('/health_check', getHealthCheck)

// Crud
router.get('/api/test', getTests)
router.get('/api/test/:id', getTest)
router.post('/api/test', createTest)
router.put('/api/test/:id', updateTest)
router.delete('/api/test/:id', deleteTest)


export default router
