import { QueryOutput } from "aws-sdk/clients/dynamodb";
import { v4 as uuidv4 } from 'uuid';
import database from "../../database";

export type UserType = {
    id?: string,
    email: string,
    password: string,
    discord_id: string,
    send_email: boolean,
    session?: string
}

export class UserRepository {
    
    public client: AWS.DynamoDB.DocumentClient;
    public table: string;

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
    async createUser ( { email, password, discord_id, send_email, session } : UserType ){
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

    // Insert
    async updateUser ( user : UserType ){
        const params = { TableName: this.table, Item: user }
        return await this.client.put(params).promise()
    }

    // Delete
    async deleteUser ( discordId: string ) {

    }

}


