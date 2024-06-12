import { expect, use } from "chai";
import chaiHttp from "chai-http";
import { app } from "../index.mjs"; // Import your Express app
import { User } from "../src/models/UserModel.mjs"; // Import your User model
import { connectDB, disconnectDB } from "../database.mjs";

// Configure chai to use chai-http
const server = use(chaiHttp);

describe("User API", () => {
  // Before running tests, connect to the test database and clear user collection
  before(async () => {
    await connectDB();
    await User.deleteMany({});
  });
  // After running tests, disconnect from the database
  after(async () => {
    await disconnectDB();
  });

  describe("POST /users", () => {
    it("should create a new user", (done) => {
      server
        .request(app)
        .post("/users")
        .send({ username: "testuser", email: "testuser@example.com", password: "password123" })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property("username", "testuser");
          expect(res.body).to.have.property("email", "testuser@example.com");
          done();
        });
    });

    it("should not create a user with duplicate email", (done) => {
      server
        .request(app)
        .post("/users")
        .send({ username: "testuser2", email: "testuser@example.com", password: "password123" })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("message", "User with this email already exists");
          done();
        });
    });
  });

  describe("POST /login", () => {
    it("should login an existing user", (done) => {
      server
        .request(app)
        .post("/login")
        .send({ username: "testuser", password: "password123" })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("message", "Login successful");
          done();
        });
    });

    it("should not login with incorrect password", (done) => {
      server
        .request(app)
        .post("/login")
        .send({ username: "testuser", password: "wrongpassword" })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property("message", "Incorrect password");
          done();
        });
    });

    it("should not login non-existent user", (done) => {
      server
        .request(app)
        .post("/login")
        .send({ username: "nonexistent", password: "password123" })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property("message", "User does not exist");
          done();
        });
    });
  });
});
