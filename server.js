// impport app
const app = require("./backend/app");
//Make server listening on PORT 3000
app.listen(3000, () => {
    console.log("App is listening on PORT 3000 ...");
});
