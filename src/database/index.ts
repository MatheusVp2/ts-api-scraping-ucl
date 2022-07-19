import AWS from "aws-sdk";
import { env } from "../config/env";

AWS.config.update({
    region: env.AWS.DEFAULT_REGION,
    accessKeyId: env.AWS.ACESS_KEY_ID,
    secretAccessKey: env.AWS.SECRET_ACESS_KEY
})

const dynamoClient = new AWS.DynamoDB.DocumentClient();

export default dynamoClient