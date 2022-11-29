const express = require("express");
const { body, validationResult } = require("express-validator");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const e = require("express");
const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/register", body("email").isEmail(), async (req, res) => {
  var { email, pass, confirmPass } = req.body;
  console.log(req.body);
  const errors = validationResult(req);
  console.log(errors);  
  if (!errors.isEmpty() && errors.errors[0].param === "email") {
    return res.status(400).send("Invalid email address. Please try again.");
  }
  if (email == "" || pass == "" || confirmPass == "") {
    res.writeHead(400, { "Content-Type": "text/html" }); // 400 bad request
    return res.end("missing username or password");
  } else if (pass !== confirmPass) {
    res.writeHead(400, { "Content-Type": "text/html" }); // 400 bad request
    return res.end("Pasword and Confirm password should be same");
  }
  const DB = require("./dbConfig");
  var hashPass = bcrypt.hashSync(pass);
  let userCheck = await userExist(email);
  if (userCheck > 0) {
    console.log("====================================");
    console.log("ge");
    console.log("====================================");
    res.writeHead(400, { "Content-Type": "text/html" }); // 400 bad request
    return res.end("User already exits");
  } else {
    // console.log(hashPass);
    DB.query(
      "INSERT INTO users(email,hashpass) values ($1,$2)",
      [email, hashPass],
      (error, result) => {
        if (error) {
          console.log("ERROR in database query: " + error.stack);
          res.writeHead(400, { "Content-Type": "text/html" }); // 400 bad request
          return res.end("Something went wrong");
        } else {
          // console.log(result);
          return res.send("User Succesfully Created");
        }
      }
    );
  }
});

app.post("/signin", body("email").isEmail(), async (req, res) => { 
  var { email, pass } = req.body;
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty() && errors.errors[0].param === "email") {
    return res.status(400).send("Invalid email address. Please try again.");
  }
  if (email == "" || pass == "") {
    res.writeHead(400, { "Content-Type": "text/html" }); // 400 bad request
    return res.end("missing username or password");
  }
  const DB = require("./dbConfig");
  // console.log(hashPass);
  DB.query(
    "select * from users where email = $1",
    [email],
    (error, result) => {
      if (error) {
        console.log("ERROR in database query: " + error.stack);
        res.writeHead(400, { "Content-Type": "text/html" }); // 400 bad request
        return res.end("Something went wrong");
      } else {
        // console.log(result);
        if(result.rowCount > 0){            
            if(bcrypt.compareSync(pass, result.rows[0].hashpass)){
              // console.log(result.rows[0].userid);
              const user = {
                email : result.rows[0].email,
                userid : result.rows[0].userid,
              }
              return res.json(user);
            }
            else
              return res.status(400).send("Invalid password");
        } else { 
            res.writeHead(400, { "Content-Type": "text/html" }); // 400 bad request
            return res.end("User does not exist");
        }    
      }
    }
  );
});

app.post("/addToFav", async function (req, res){
  var { id, name, artistname,imgurl,uri, userid } = req.body;  
  // if (!errors.isEmpty() && errors.errors[0].param === "email") {
  //   return res.status(400).send("Invalid email address. Please try again.");
  // }
  // if (email == "" || pass == "" || confirmPass == "") {
  //   res.writeHead(400, { "Content-Type": "text/html" }); // 400 bad request
  //   return res.end("missing username or password");
  // } else if (pass !== confirmPass) {
  //   res.writeHead(400, { "Content-Type": "text/html" }); // 400 bad request
  //   return res.end("Pasword and Confirm password should be same");
  // }
  const DB = require("./dbConfig");

  let favCheck = await favExist(id,userid);
  if (favCheck > 0) {    
    res.writeHead(400, { "Content-Type": "text/html" }); // 400 bad request
    return res.end("Song already in favourites");
  } else {
    // console.log(hashPass);
    DB.query(
      "INSERT INTO favourites(id,name,artistname,imgurl,uri,userid) values ($1,$2,$3,$4,$5,$6)",
      [id,name, artistname,imgurl,uri, userid],
      (error, result) => {
        if (error) {
          console.log("ERROR in database query: " + error.stack);
          res.writeHead(400, { "Content-Type": "text/html" }); // 400 bad request
          return res.end("Something went wrong");
        } else {
          // console.log(result);
          return res.send("successfully added to favourites");
        }
      }
    );
  }
});

app.get("/getAllFav", async function (req, res){  
  var { userid } = req.query;
  console.log(req.query);
  const DB = require("./dbConfig");    
    DB.query(
      "SELECT * FROM favourites where userid = $1",
      [userid],
      (error, result) => {
        if (error) {
          console.log("ERROR in database query: " + error.stack);
          res.writeHead(400, { "Content-Type": "text/html" }); // 400 bad request
          return res.end("Something went wrong");
        } else {
          // const song = {
          //   id: track.data.id,
          //   name: track.data.name,
          //   artistname: track.data.artists.items[0].profile.name,
          //   imgurl: track.data.albumOfTrack.coverArt.sources[1].url,
          //   uri: track.data.uri,
          //   userid: userid,
          // };
          console.log(result.rows);
          return res.send(result.rows);
        }
      }
    );  
});

app.use("/removeFromFav", async function (req, res){
  console.log(req.body);
  var { id, userid } = req.body;    
  const DB = require("./dbConfig");  
  let favCheck = await favExist(id,userid);
  console.log(id,userid,favCheck);
  if (favCheck == 0) {    
    res.writeHead(400, { "Content-Type": "text/html" }); // 400 bad request
    return res.end("Song does not exist in favorites"); 
  } else {
    // console.log(hashPass);
    DB.query(
      "DELETE FROM favourites where id = $1 and userid = $2",
      [id, userid],
      (error, result) => {
        if (error) {
          console.log("ERROR in database query: " + error.stack);
          res.writeHead(400, { "Content-Type": "text/html" }); // 400 bad request
          return res.end("Something went wrong");
        } else {
          // console.log(result);
          return res.send("Removed Succesfully");
        }
      }
    );
  }
});

app.post('/checkFav',async (req,res) => {
  var { id, userid } = req.body;
  let favCheck = await favExist(id,userid);  
  if (favCheck > 0) {    
    
    return res.send("true");
  } else { 
    return res.send("false");
  }
  
})
async function userExist(email) {
  const DB = require("./dbConfig");
  var result = await DB.query("select * from users where email = $1", [email]);
  return result.rowCount;
}
async function favExist(id,userid) {
  const DB = require("./dbConfig");
  var result = await DB.query("select * from favourites where id = $1 and userid = $2", [id,userid]);
  return result.rowCount;
}
app.listen(port, () => {
  console.log(`your app is running on port ${port}`);
});
