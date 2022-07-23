import "dotenv/config"

export const env = {
    AWS : {
        ACESS_KEY_ID : process.env.MY_AWS_ACESS_KEY_ID,
        SECRET_ACESS_KEY : process.env.MY_AWS_SECRET_ACESS_KEY,
        DEFAULT_REGION : process.env.MY_AWS_DEFAULT_REGION
    },
    ENCRYPT : {
        SECRET : process.env.MY_ENCRYPT_SECRET,
        ALGORITHM : process.env.MY_ENCRYPT_ALGORITHM
    }
}