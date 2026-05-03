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
exports.loginService = exports.signupService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("..//db/index");
const signupService = (name_1, email_1, password_1, ...args_1) => __awaiter(void 0, [name_1, email_1, password_1, ...args_1], void 0, function* (name, email, password, role = "MEMBER") {
    const existingUser = yield index_1.db.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        throw new Error("User already exists");
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const user = yield index_1.db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role,
        },
    });
    return user;
});
exports.signupService = signupService;
const loginService = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield index_1.db.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw new Error("Invalid credentials");
    }
    const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid credentials");
    }
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        role: user.role,
        email: user.email,
    }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    return {
        token,
        user,
    };
});
exports.loginService = loginService;
