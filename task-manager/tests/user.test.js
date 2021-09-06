const request = require('supertest')
const app = require('../src/app.js')
const User = require('../src/models/user')
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test("Should sign up a new user", async () => {
    const response = await request(app)
        .post("/users").send({
            name: "Sarath Raja",
            email: "sarathrajahbk@gmail.com",
            password: "Sarath@200"
        }).expect(201)

    // Assert that database is changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertion about the response
    expect(response.body).toMatchObject({
        user: {
            name: "Sarath Raja",
            email: "sarathrajahbk@gmail.com",
        },
        token: user.tokens[0].token
    })

    // Assertion that password is hashed
    expect(user.password).not.toBe("Sarath@200")
})

test("Should login existing user", async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token) // 2nd index is uses as on creation one token will be added and after login another token will be add as well
})

test("Should not login existing user", async() => {
    await request(app)
        .post('/users/login').send({
            email: userOne.email,
            password: "Wrong password"
        }).expect(400)
})

test("Should get profile for user", async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test("Should not get profile for unauthenticated user", async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', "")
        .send()
        .expect(401)
})

test("Should delete account for user", async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test("Should not delete account for unautheticated user", async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', "")
        .send()
        .expect(401)
})

test("Should upload avatar image", async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

        const user = await User.findById(userOneId)
        expect(user.avatar).toEqual(expect.any(Buffer))
})

test("Should update valid user fields", async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: "Jack"
        })
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.name).toEqual('Jack')
})

test("Should not update invalid user fields", async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: "Bangalore"
        })
        .expect(400)
})