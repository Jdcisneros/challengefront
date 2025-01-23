"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../index"));
const supertest_1 = __importDefault(require("supertest"));
describe("Auth Routes", () => {
    it("should register a new user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default).post("/api/register").send({
            username: "testuser",
            email: "testuser@example.com",
            password: "password123",
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("message", "User created");
    }));
    it("should return an error for existing email", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default).post("/api/register").send({
            username: "newusssers",
            email: "testuqqserss@example.com",
            password: "password123",
        });
        const response = yield (0, supertest_1.default)(index_1.default).post("/api/register").send({
            username: "anotheruser",
            email: "testuser@example.com",
            password: "password123",
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("User already exists");
    }));
});
//LOGIN
describe("Login auth", () => {
    it("should login with valid credentials", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default).post("/api/register").send({
            username: "testuser",
            email: "testuser@example.com",
            password: "password123",
        });
        const response = yield (0, supertest_1.default)(index_1.default).post("/api/login").send({
            email: "testuser@example.com",
            password: "password123",
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");
        expect(response.body.user).toHaveProperty("id");
        expect(response.body.user).toHaveProperty("username");
    }));
    it("should return an error if the email is not registered", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default).post("/api/login").send({
            email: "nonexistentuser@example.com",
            password: "password123",
        });
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("User not found");
    }));
});
//TODO
describe("ToDo test", () => {
    it("should create a new todo", () => __awaiter(void 0, void 0, void 0, function* () {
        const registerResponse = yield (0, supertest_1.default)(index_1.default).post("/api/register").send({
            username: "testuser",
            email: "testuser@example.com",
            password: "password123",
        });
        const loginResponse = yield (0, supertest_1.default)(index_1.default).post("/api/login").send({
            email: "testuser@example.com",
            password: "password123",
        });
        const token = loginResponse.body.token;
        const response = yield (0, supertest_1.default)(index_1.default)
            .post("/api/todos")
            .set("Authorization", `Bearer ${token}`)
            .send({
            title: "Test Todo",
            description: "This is a test todo",
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.title).toBe("Test Todo");
    }));
    it("should update a todo", () => __awaiter(void 0, void 0, void 0, function* () {
        const registerResponse = yield (0, supertest_1.default)(index_1.default).post("/api/register").send({
            username: "testuser",
            email: "testuser@example.com",
            password: "password123",
        });
        const loginResponse = yield (0, supertest_1.default)(index_1.default).post("/api/login").send({
            email: "testuser@example.com",
            password: "password123",
        });
        const token = loginResponse.body.token;
        const createResponse = yield (0, supertest_1.default)(index_1.default)
            .post("/api/todos")
            .set("Authorization", `Bearer ${token}`)
            .send({
            title: "Test Todo",
            description: "Test description",
        });
        const todoId = createResponse.body.id;
        const response = yield (0, supertest_1.default)(index_1.default)
            .put(`/api/todos/${todoId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
            title: "Updated Todo",
            description: "Updated description",
        });
        expect(response.status).toBe(200);
        expect(response.body.title).toBe("Updated Todo");
    }));
});
it("should delete a todo", () => __awaiter(void 0, void 0, void 0, function* () {
    const registerResponse = yield (0, supertest_1.default)(index_1.default).post("/api/register").send({
        username: "testuser",
        email: "testuser@example.com",
        password: "password123",
    });
    const loginResponse = yield (0, supertest_1.default)(index_1.default).post("/api/login").send({
        email: "testuser@example.com",
        password: "password123",
    });
    const token = loginResponse.body.token;
    const createResponse = yield (0, supertest_1.default)(index_1.default)
        .post("/api/todos")
        .set("Authorization", `Bearer ${token}`)
        .send({
        title: "Test Todo",
        description: "Test description",
    });
    const todoId = createResponse.body.id;
    const response = yield (0, supertest_1.default)(index_1.default)
        .delete(`/api/todos/${todoId}`)
        .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Todo deleted");
}));
