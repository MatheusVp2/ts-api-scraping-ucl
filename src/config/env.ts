import "dotenv/config"

export const env = {
    AWS : {
        ACESS_KEY_ID : process.env.AWS_ACESS_KEY_ID,
        SECRET_ACESS_KEY : process.env.AWS_SECRET_ACESS_KEY,
        DEFAULT_REGION : process.env.AWS_DEFAULT_REGION
    },
    SECRET_ENCRYPT: process.env.SECRET_ENCRYPT_DATA
}