import {Request, Response} from 'express'
import {Status, Test} from '../models'
import {v4 as uuid} from 'uuid'

export const getHealthCheck = (req: Request, res: Response) => {
    const status: Status = {status: true, message: "Server is running!!!"}
    res.send(status)
}

const tests: Array<Test> = []

export const getTests = (req: Request, res: Response) => {
    if (tests.length) {
        res.send(tests)
    } else {
        res.status(204).send()
    }
}

export const getTest = (req: Request, res: Response) => {
    const {params: {id}} = req

    const test: any = tests.find((test: Test) => test.id === id)

    if (test) {
        res.send(test)
    } else {
        res.status(204).send()
    }
}

export const createTest = (req: Request, res: Response) => {
    const test = req.body as Test
    test.id = uuid()
    test.createdAt = new Date()
    tests.push(test)
    res.send(test)
}

export const updateTest = (req: Request, res: Response) => {
    const {params: {id}} = req
    const updatedTest = req.body as Test

    const oldTestIndex = tests.findIndex((test: Test) => test.id === id)

    if (oldTestIndex === -1) {
        res.status(204).send()
    } else {
        updatedTest.updatedAt = new Date()
        tests[oldTestIndex] = updatedTest
        res.send(updatedTest)
    }
}

export const deleteTest = (req: Request, res: Response) => {
    const {params: {id}} = req

    const oldTestIndex = tests.findIndex((test: Test) => test.id === id)

    if (oldTestIndex === -1) {
        res.status(204).send()
    } else {
        delete tests[oldTestIndex]
        res.send(tests)
    }
}

