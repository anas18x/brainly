process.loadEnvFile()
export const ENV = {
    MONGO_URI : process.env.MONGO_URI as string,
    JWT_SECRET : process.env.JWT_SECRET as string,
    PORT : process.env.PORT
}

