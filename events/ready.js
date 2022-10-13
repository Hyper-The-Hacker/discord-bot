const client = require('../index');
const colors = require("console-colors.js").default;

client.on("ready", (client) => {
    console.log(`${colors.green("[CLIENT ONLINE] ------------=====------------")}\n${colors.green("[CLIENT ONLINE]")} CLIENT TAG: ${client.user.tag}\n${colors.green("[CLIENT ONLINE] ------------=====------------")}`);
})