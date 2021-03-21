const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const saltRounds = 5;
const multer = require("multer");
const path = require("path");
const session = require("express-session");

app.set("view engine", "ejs");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    // It holds the secret key for session
    secret: "ilu>c8cs",

    // Forces the session to be saved
    // back to the session store
    resave: true,

    // Forces a session that is "uninitialized"
    // to be saved to the store
    saveUninitialized: true,
  })
);

// const con = mysql.createConnection({
//   // port: "80",
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "netflix",
// });
//secret :8sEs8EgiYTu69PLcpMot
// const con = mysql.createConnection({
//   host: "sql12.freemysqlhosting.net",
//   user: "sql12384536",
//   password: "NWTGYsgfCT",
//   database: "sql12384536",
// });
const con = mysql.createConnection({
  host: "db4free.net",
  user: "mmuazam98",
  password: "ilu>c8cs",
  database: "netflix",
});

app.get("/", (req, res) => {
  res.render("index", { page: "index" });
});

app.get("/referfriend", (req, res) => {
  if (req.session.name) res.render("referfriend", { page: "referfriend" });
  else res.redirect("error");
});

app.get("/profile", (req, res) => {
  if (req.session.name) res.render("profile", { page: "profile" });
  else res.redirect("error");
});
app.get("/search", (req, res) => {
  if (req.session.name) res.render("search", { page: "search" });
  else res.redirect("error");
});

app.get("/error", (req, res) => {
  res.render("error");
});
app.get("/home", (req, res) => {
  if (req.session.name) {
    con.query("SELECT * FROM `content` ORDER BY `Name` ASC", function (err, results) {
      // console.log(results);
      if (err) throw err;
      res.render("home", { page: "home", result: results });
    });
  } else {
    res.redirect("error");
  }
});

app.get("/movies", (req, res) => {
  if (req.session.name) {
    con.query("SELECT * FROM `content` WHERE `Type`='movie'", function (error, results) {
      // console.log(results);
      if (err) throw err;

      res.render("movies", { page: "movies", result: results });
    });
  } else res.redirect("error");
});

app.get("/shows", (req, res) => {
  if (req.session.name) {
    con.query("SELECT * FROM `content` WHERE `Type`='show'", function (error, results) {
      // console.log(results);
      if (err) throw err;

      if (error) console.log(error);
      res.render("shows", { page: "shows", result: results });
    });
  } else res.redirect("error");
});

app.get("/edit", (req, res) => {
  if (req.session.name) {
    con.query("SELECT * FROM `content`", function (error, results) {
      // console.log(results);
      res.render("edit", { page: "edit", result: results });
    });
  } else res.redirect("error");
});

app.post("/deleteItem", (req, res) => {
  let id = req.body.id;

  con.query(`DELETE FROM content WHERE Name='${id}'`, function (error, results) {
    if (error) throw error;
    else {
      con.query("SELECT * FROM `content`", function (error, results) {
        // console.log(results);
        res.render("edit", {
          page: "edit",
          msg: "Deleted successfully.",
          result: results,
        });
      });
    }
  });
});

// app.get("/update", (req, res) => {
//   res.render("update");
// });

app.post("/updateItem", (req, res) => {
  let { type, name, year, duration, director, age, subtype } = req.body;
  res.render("update", {
    msg: "Done",
    name: name,
    type: type,
    year: year,
    duration: duration,
    director: director,
    age: age,
    subtype: subtype,
  });
});

app.post("/update", (req, res) => {
  let {
    type1,
    type,
    name1,
    name,
    year1,
    year,
    duration1,
    duration,
    director1,
    director,
    age1,
    age,
    subtype1,
    subtype,
  } = req.body;
  let query = `UPDATE content SET Name = "${name}" , Type = "${type}" , Year = "${year}",
   Length = "${duration}", Age = "${age}", Director = "${director}", SubType = "${subtype}"
    WHERE Name = "${name1}" AND Type = "${type1}" AND Year = "${year1}" AND Length = "${duration1}"
    AND Age = "${age1}" AND Director = "${director1}" AND SubType = "${subtype1}" `;
  con.query(query, (err, results) => {
    if (err) {
      res.send(err.message);
      // console.log(err);
      console.log(err.message);
    } else {
      con.query("SELECT * FROM `content`", function (error, results) {
        // console.log(results);
        res.render("edit", {
          page: "edit",
          msg: "Updated successfully.",
          result: results,
        });
      });
    }
  });
});

app.post("/search", (req, res) => {
  let search = req.body.search;
  if (search) {
    if (
      search == "comedy" ||
      search == "horror" ||
      search == "romance" ||
      search == "action" ||
      search == "Comedy" ||
      search == "Horror" ||
      search == "Romance" ||
      search == "Action"
    ) {
      con.query(
        `SELECT * FROM content WHERE SubType = '${search}'`,
        function (error, results) {
          if (error) throw error;
          else res.render("search", { page: "search", result: results, search: search });
        }
      );
    } else if (search == "movie" || search == "show") {
      con.query(
        `SELECT * FROM content WHERE Type = '${search}'`,
        function (error, results) {
          if (error) throw error;
          else res.render("search", { page: "search", result: results, search: search });
        }
      );
    } else {
      con.query(
        `SELECT * FROM content WHERE Name LIKE '%${search}%'`,
        function (error, results) {
          if (error) throw error;
          // console.log(results);
          if (results.length != 0)
            res.render("search", { page: "search", result: results, search: search });
          else res.render("search", { page: "search", result: results, search: search });

          // console.log(results);
        }
      );
    }
  }
});

//multer file upload

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("myImage");

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}
app.get("/admin", (req, res) => res.render("admin"));

//upload image
app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    let post = req.body;
    let name = post.name;
    let type = post.type;
    let age = post.age;
    let subtype = post.subtype;
    let director = post.director;
    let year = post.year;
    let len = post.duration;

    if (err) {
      res.render("admin", {
        msg: err,
      });
    } else {
      if (req.file == undefined) {
        res.render("admin", {
          msg: "Error: No File Selected!",
        });
      } else {
        var sql =
          "INSERT INTO `content`(`Type`,`Name`,`Year`,`Length`, `Director` ,`Image`,`Age`,`SubType`) VALUES ('" +
          type +
          "','" +
          name +
          "','" +
          year +
          "','" +
          len +
          "','" +
          director +
          "','" +
          req.file.filename +
          "','" +
          age +
          "','" +
          subtype +
          "')";
        con.query(sql, (err, results) => {
          if (err) {
            res.send(err.message);
            // console.log(err);
            console.log(err.message);
          }
        });
        res.render("admin", {
          msg: "File Uploaded!",
          file: `uploads/${req.file.filename}`,
        });
      }
    }
  });
});

// sign up
app.post("/signup", (req, res) => {
  req.session.name = "ilu>c8cs";
  let { name, email, password } = req.body;
  // console.log(req.body);
  con.query(
    `SELECT Email FROM userdetails WHERE Email ='${email}'`,
    function (err, result) {
      if (err) throw err;
      // console.log(result);
      //You will get an array. if no users found it will return.

      if (result.length == 0) {
        let hashedPswd;
        bcrypt.genSalt(saltRounds, function (err, salt) {
          if (err) {
            throw err;
          } else {
            bcrypt.hash(password, salt, function (err, hash) {
              if (err) {
                throw err;
              } else {
                hashedPswd = hash;
                // console.log(hashedPswd);

                let query = `INSERT INTO userdetails (Name, Email, Password) VALUES ('${name}','${email}','${hashedPswd}')`;
                con.query(query, (err, results) => {
                  if (err) {
                    res.send(err.message);
                    // console.log(err);
                    console.log(err.message);
                  } else {
                    // console.log(results);
                    res.status(200).json({ message: "User has been registered." });

                    res.end();
                  }
                });
              }
            }); //end bcrypt.
          }
        });
      } else {
        res.status(400).json({ message: "Already exists." });

        res.end();
      }
    }
  );
});

// login
app.post("/login", function (req, res) {
  req.session.name = "ilu>c8cs";
  // console.log(req.session.name);
  var username = req.body.email;
  var password = req.body.password;
  if (username && password) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) {
        throw err;
      } else {
        let hash = "";
        //store the value of hashedPswd in hash
        let getPass = `SELECT Password FROM userdetails WHERE Email = '${username}'`;
        con.query(getPass, function (err, results) {
          if (err) throw err;
          if (results.length != 0) {
            hash = results[0].Password; // stored
            //compare it with the entered password
            bcrypt.compare(password, hash, function (err, isMatch) {
              if (err) {
                throw err;
              } else if (!isMatch) {
                res.status(401).json({ message: "Invalid username or password" });
              } else {
                let sql = `SELECT * FROM userdetails WHERE Email = '${username}' AND Password = '${hash}';`;
                con.query(sql, function (error, results) {
                  if (error) throw error;

                  if (results.length > 0) {
                    res.status(200).json({ message: "Login successful" });
                  } else {
                    res.status(401).json({ message: "Invalid username or password" });
                  }

                  // res.end();
                }); // end con.query(sql)
              }
            }); //end bcrypt.compare()
          } else {
            res.status(400).json({ message: "Doesn't exist" });
          }
        }); // end con.query(getPass)
      }
    });
  }
});
app.get("/logout", function (req, res) {
  req.session.destroy(function (error) {
    console.log("Session Destroyed");
    res.redirect("/");
  });
});
//delete
app.post("/delete", function (req, res) {
  var username = req.body.email;
  var password = req.body.password;
  if (username && password) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) {
        throw err;
      } else {
        let hash = "";
        //store the value of hashedPswd in hash
        let getPass = `SELECT Password FROM userdetails WHERE Email = '${username}'`;
        con.query(getPass, function (err, results) {
          if (err) throw err;
          if (results.length != 0) {
            hash = results[0].Password; // stored
            //compare it with the entered password
            bcrypt.compare(password, hash, function (err, isMatch) {
              if (err) {
                throw err;
              } else if (!isMatch) {
                res.status(401).json({ message: "Incorrect Password." });
              } else {
                let sql = `DELETE FROM userdetails WHERE Email = '${username}' AND Password = '${hash}';`;
                con.query(sql, function (error, results) {
                  if (error) {
                    throw error;
                  }
                  // res.redirect("/");
                  res.status(200).json({ message: "User has been deleted." });
                  // res.end();
                }); // end con.query(sql)
              }
            }); //end bcrypt.comapre()
          } else {
            res.status(400).json({ message: "Invalid username or password." });
          }
        }); // end con.query(getPass)
      }
    });
  }
});

//update

app.post("/update", (req, res) => {
  // let { name, newName, email, newEmail, password, newPassword } = req.body;
  let name = req.body.name;
  let newName = req.body.newName;
  let email = req.body.email;
  let newEmail = req.body.newEmail;
  let password = req.body.password;
  let newPassword = req.body.newPassword;
  // console.log(req.body);
  // let query = `UPDATE userdetails SET Name = "${newName}", Email = "${newEmail}", Password = "${newPassword}" WHERE Name = "${name}" AND Email = "${email}" AND Password = "${password}" `;
  let hashedPswd;
  con.query(
    `SELECT Email FROM userdetails WHERE Email ='${newEmail}'`,
    function (err, result) {
      if (err) throw err;
      // console.log(result);
      if (result.length == 0) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
          if (err) {
            throw err;
          } else {
            bcrypt.hash(newPassword, salt, function (err, hash) {
              if (err) {
                throw err;
              } else {
                hashedPswd = hash;
                let oldpass = "";
                //store the value of hashedPswd in hash
                let getPass = `SELECT Password FROM userdetails WHERE Email = '${email}'`;
                con.query(getPass, function (err, results) {
                  if (err) throw err;
                  if (results.length != 0) {
                    oldpass = results[0].Password; // stored

                    //compare it with the entered password
                    bcrypt.compare(password, oldpass, function (err, isMatch) {
                      // if (isMatch) console.log("Success");
                      if (err) {
                        throw err;
                      } else if (!isMatch) {
                        // console.log("Wrong password.");
                        res.status(401).json({ message: "Hi" });
                      } else {
                        let sql = `UPDATE userdetails SET Name = "${newName}", Email = "${newEmail}", Password = "${hashedPswd}" WHERE Name = "${name}" AND Email = "${email}" AND Password = "${oldpass}"`;
                        con.query(sql, function (error, results) {
                          if (error) {
                            throw error;
                          } else if (results.affectedRows != 0)
                            res.status(200).json({ message: "Hi" });
                          //console.log("updated");
                          else res.status(402).json({ message: "Hi" }); //console.log("Wrong Credentials");
                          // res.end();
                        }); // end con.query(sql)
                      }
                    }); //end bcrypt.compare()
                  } else {
                    // console.log("No user found");
                    res.status(403).json({ message: "Hi" });
                  }
                }); // end con.query(getPass)
              }
            }); //end bcrypt.
          }
        });
      } else {
        // console.log("Already exists");
        res.status(400).json({ message: "Hi" });

        // res.end();
      }
    }
  );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
