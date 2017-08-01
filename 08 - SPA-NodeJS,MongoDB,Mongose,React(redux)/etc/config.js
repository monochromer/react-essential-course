const IP = process.env.IP || "localhost";
const PORT = process.env.PORT || 8080;

export default {
    "IP": IP,
    "serverPort": PORT,
    "clientApiUrl": "/api",
    "apiPrefix": `http://${IP}:${PORT}/api`,
    "db": {
        "name": "notesappdb",
        "host": "ds143588.mlab.com",
        "dbuser": "user",
        "dbpassword": "123456",
        "port": 43588
    }
}