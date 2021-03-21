exports.server = function (req, res) {
  message = "";
  if (req.method == "POST") {
    var post = req.body;
    var length = post.lengthh;
    var director = post.director;
    var type = post.type;
    var name = post.name;
    var year = post.year;
    var age = post.age;
    var subtype = post.subtype;

    if (!req.files) return res.status(400).send("No files were uploaded.");

    var file = req.files.uploaded_image;
    var img_name = file.name;

    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/gif"
    ) {
      file.mv("public/images/upload_images/" + file.name, function (err) {
        if (err) return res.status(500).send(err);
        var sql =
          "INSERT INTO `content`(`Type`,`Name`,`Year`,`Length`, `Director` ,`Image`,`Age`,`SubType`) VALUES ('" +
          type +
          "','" +
          name +
          "','" +
          year +
          "','" +
          length +
          "','" +
          director +
          "','" +
          img_name +
          "','" +
          age +
          "','" +
          subtype +
          "')";

        var query = db.query(sql, function (err, result) {
          res.send("Done");
        });
      });
    } else {
      message =
        "This format is not allowed , please upload file with '.png','.gif','.jpg'";
      res.render("admin.ejs", { message: message });
    }
  } else {
    res.render("admin");
  }
};
