"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const env_1 = require("../config/env");
aws_sdk_1.default.config.update({
    region: env_1.env.AWS.DEFAULT_REGION,
    accessKeyId: env_1.env.AWS.ACESS_KEY_ID,
    secretAccessKey: env_1.env.AWS.SECRET_ACESS_KEY
});
const dynamoClient = new aws_sdk_1.default.DynamoDB.DocumentClient();
exports.default = dynamoClient;
