const request = require('supertest');
const app = require('../src/app.js')
const Task = require('../src/models/task')
const { 
    userOneId,
    userTwoId,
    userOne,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase 
} = require('./fixtures/db')

beforeEach(setupDatabase)

test("Should create task for user", async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: "From my test"
        })
        .expect(201)
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull();
    expect(task.completed).toBe(false)
})

test('Should fetch user tasks', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200)
    expect(response.body.length).toBe(2)
})

test('Should not delete other users task', async () => {
    const response = await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)
    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
})