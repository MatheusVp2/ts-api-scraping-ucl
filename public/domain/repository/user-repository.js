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
exports.UserRepository = void 0;
const uuid_1 = require("uuid");
const database_1 = __importDefault(require("../../database"));
class UserRepository {
    constructor() {
        this.client = database_1.default;
        this.table = 'users';
    }
    // Select
    findAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const params = { TableName: this.table };
            return yield this.client.scan(params).promise();
        });
    }
    findUserByDiscordId(discord_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = { TableName: this.table, FilterExpression: 'discord_id = :discord', ExpressionAttributeValues: { ':discord': discord_id } };
            return yield this.client.scan(params).promise();
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = { TableName: this.table, FilterExpression: 'email = :email', ExpressionAttributeValues: { ':email': email } };
            return yield this.client.scan(params).promise();
        });
    }
    // Insert
    createUser({ email, password, discord_id, send_email, session }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = {
                id: (0, uuid_1.v4)(),
                email,
                password,
                discord_id,
                send_email,
                session: session
            };
            const params = { TableName: this.table, Item: user };
            return yield this.client.put(params).promise();
        });
    }
    // Insert
    updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = { TableName: this.table, Item: user };
            return yield this.client.put(params).promise();
        });
    }
    // Delete
    deleteUser(discordId) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.UserRepository = UserRepository;
