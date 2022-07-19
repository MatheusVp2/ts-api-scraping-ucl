import database from "../../database";
import { v4 as uuidv4 } from 'uuid';
import { PutItemOutput, QueryOutput } from "aws-sdk/clients/dynamodb";

export type UserType = {
    id?: string,
    email: string,
    password: string,
    discord_id: string,
    send_email: boolean,
    session?: string
}

export class UserRepository {
    
    private client: AWS.DynamoDB.DocumentClient;
    private table: string;

    constructor () {
        this.client = database
        this.table = 'users'
    }

    // Select
    async findAllUsers () : Promise<QueryOutput> {
        const params = { TableName: this.table }
        return await this.client.scan(params).promise()
    }

    async findUserByDiscordId ( discord_id: string ) : Promise<QueryOutput>{
        const params = { TableName : this.table, FilterExpression : 'discord_id = :discord', ExpressionAttributeValues : { ':discord' : discord_id } };
        return await this.client.scan(params).promise()
    }

    async findUserByEmail ( email: string ) : Promise<QueryOutput> {
        const params = { TableName : this.table, FilterExpression : 'email = :email', ExpressionAttributeValues : { ':email' : email } };
        return await this.client.scan(params).promise()
    }

    // Insert
    async createNewUser ( { email, password, discord_id, send_email, session } : UserType ){
        const user : UserType = {
            id: uuidv4(),
            email,
            password,
            discord_id,
            send_email,
            session: session
        }
        const params = { TableName: this.table, Item: user }
        return await this.client.put(params).promise()
    }

    // Delete
    async deleteUser ( discordId: string ) {

    }

}


