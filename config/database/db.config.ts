import 'dotenv/config';

function mongoDbConfig():string {
    const orm = {
        pass:process.env.MONGO_PASS,
        user:process.env.MONGO_USER,
        host:process.env.MONGO_HOST,
        port:process.env.MONGO_PORT,
        name:process.env.MONGO_NAME,
    }
    const mongoConfig = orm.user === "" ? `mongodb://${orm.host}:${orm.port}/${orm.name}`:
                `mongodb://${orm.user}:${orm.pass}@${orm.host}:${orm.port}/${orm.name}`
    return mongoConfig;
};

export {
     mongoDbConfig,
}