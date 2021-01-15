const app = require("./lib/app");

app.listen(process.env.PORT | 3000,()=>{
    console.log("Server Started");
})