import {Router} from 'express'
import {createTest, deleteTest, getHealthCheck, getTest, getTests, updateTest} from '../controllers'

const router: Router = Router()

// Health Check
router.get('/health_check', getHealthCheck)

// Crud
router.get('/test', getTests)
router.get('/test/:id', getTest)
router.post('/test', createTest)
router.put('/test/:id', updateTest)
router.delete('/test/:id', deleteTest)


export default router
