const mongoose = require("mongoose");
const request = require("supertest");
const { User } = require('../models')

const server = require("../server");

// Connect to DB before each test
beforeEach(async () => {
    const localTestDB = 'mongodb://127.0.0.1:27017/masonic-lodges-test';
    await mongoose.connect(localTestDB);
});

// Close DB connection after each test
afterEach(async ()=> {
    await mongoose.connection.close();
});

// Global values
const VALID_PASSWORD = "ThisisaBadPassword";
const INVALID_EMAIL = "foo.bar.bz"

describe("User.isValidPassword", () => {

    it("Should return true when correct password is provided", async () => {
        const testUser = await createTestUser();
        const expected = true;
        const actual = await testUser.isValidPassword(VALID_PASSWORD);
        expect(actual).toBe(expected);
        // Delete user after tests
        await testUser.deleteOne();
    });

    it("Should return false when incorrect password is provided.", async () => {
        const testUser = await createTestUser();
        const expected = false;
        const invalidPassword = "ThisisWrong"
        const actual = await testUser.isValidPassword(invalidPassword);
        expect(actual).toBe(expected);
        
        // Delete user after tests
        await testUser.deleteOne();
    })
});

describe("User.create", () => {
    it("Should throw an error when an invalid email is provided", async () => {
        let testUser;
        await expect(async () => {
            await User.create({
            firstName:"Foo",
            lastName: "Bar",
            email: INVALID_EMAIL,
            password: VALID_PASSWORD
        });
        }).rejects.toThrowError(mongoose.Error.ValidationError);

        if(testUser) {
            testUser.deleteOne();
        }
    });
})


const createTestUser = async () => {
    const testUser = await User.create( {
        firstName: "Test1",
        lastName: "Test2",
        email: "Test1.Test2@example.org",
        password: VALID_PASSWORD
    });

    if(!testUser) throw new Error("Unable to create test user.");

    return testUser;
}

