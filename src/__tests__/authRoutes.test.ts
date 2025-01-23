import app from "../../index";
import request from "supertest";

describe("Auth Routes", () => {
  it("should register a new user", async () => {
    const response = await request(app).post("/api/register").send({
      username: "testuser",
      email: "testuser@example.com",
      password: "password123",
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", "User created");
  });

  it("should return an error for existing email", async () => {
    await request(app).post("/api/register").send({
      username: "newusssers",
      email: "testuqqserss@example.com",
      password: "password123",
    });

    const response = await request(app).post("/api/register").send({
      username: "anotheruser",
      email: "testuser@example.com",
      password: "password123",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("User already exists");
  });
});

//LOGIN
describe("Login auth", () => {
  it("should login with valid credentials", async () => {
    await request(app).post("/api/register").send({
      username: "testuser",
      email: "testuser@example.com",
      password: "password123",
    });

    const response = await request(app).post("/api/login").send({
      email: "testuser@example.com",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user).toHaveProperty("username");
  });

  it("should return an error if the email is not registered", async () => {
    const response = await request(app).post("/api/login").send({
      email: "nonexistentuser@example.com",
      password: "password123",
    });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("User not found");
  });
});

//TODO
describe("ToDo test", () => {
  it("should create a new todo", async () => {
    const registerResponse = await request(app).post("/api/register").send({
      username: "testuser",
      email: "testuser@example.com",
      password: "password123",
    });

    const loginResponse = await request(app).post("/api/login").send({
      email: "testuser@example.com",
      password: "password123",
    });

    const token = loginResponse.body.token;

    const response = await request(app)
      .post("/api/todos")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Todo",
        description: "This is a test todo",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.title).toBe("Test Todo");
  });

  it("should update a todo", async () => {
    const registerResponse = await request(app).post("/api/register").send({
      username: "testuser",
      email: "testuser@example.com",
      password: "password123",
    });

    const loginResponse = await request(app).post("/api/login").send({
      email: "testuser@example.com",
      password: "password123",
    });

    const token = loginResponse.body.token;

    const createResponse = await request(app)
      .post("/api/todos")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Todo",
        description: "Test description",
      });

    const todoId = createResponse.body.id;

    const response = await request(app)
      .put(`/api/todos/${todoId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Updated Todo",
        description: "Updated description",
      });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Updated Todo");
  });
});

it("should delete a todo", async () => {
  const registerResponse = await request(app).post("/api/register").send({
    username: "testuser",
    email: "testuser@example.com",
    password: "password123",
  });

  const loginResponse = await request(app).post("/api/login").send({
    email: "testuser@example.com",
    password: "password123",
  });

  const token = loginResponse.body.token;

  const createResponse = await request(app)
    .post("/api/todos")
    .set("Authorization", `Bearer ${token}`)
    .send({
      title: "Test Todo",
      description: "Test description",
    });

  const todoId = createResponse.body.id;

  const response = await request(app)
    .delete(`/api/todos/${todoId}`)
    .set("Authorization", `Bearer ${token}`);

  expect(response.status).toBe(200);
  expect(response.body.message).toBe("Todo deleted");
});
