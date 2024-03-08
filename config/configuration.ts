export default () => ({
    port: process.env.PORT,
    mongodbUrl: process.env.MONGODB_URL,
    apiKey: process.env.API_KEY,
    secretKey: process.env.SECRET_KEY,
    adminPhoneNumber: process.env.ADMIN_PHONE_NUMBER
});