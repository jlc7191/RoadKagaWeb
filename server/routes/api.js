var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var mysql = require("mysql");
var cors = require("cors");

// cors------------------------------------------------------------------
var whitelist = [
  "http://localhost:3002",
  "http://192.168.50.68:3002",
  undefined
];
//設定白名單(除此名單以外皆不允許)
//沒有來源網域(即自身網域內的頁面)會被認為是undefined，故要加上此設定才可內連
var corsOptions = {
  credentials: true,
  origin: function(origin, callback) {
    //origin:來源網域
    console.log("origin:" + origin);
    if (whitelist.indexOf(origin) !== -1) {
      //判斷來源是否在白名單陣列內
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};
router.use(cors());

//將body-parser設定成頂層middleware，因放在所有route之前，故會對所有route作用
//查看HTTP HEADER的Content-Type:如果是application/x-www-form-urlencoded，就以此方法解析
router.use(bodyParser.urlencoded({ extended: false }));
//查看HTTP HEADER的Content-Type:如果是application/json，就以此方法解析
router.use(bodyParser.json());

// 連接mysql------------------------------------------------------------------
var con = mysql.createConnection({
  host: "localhost",
  port: "8889",
  user: "jlc7191",
  password: "22112211",
  database: "kagaWeb"
});
con.connect();

//留言讀取------------------------------------------------------------------
//留言讀取 完成
router.get("/Learn2Info", (req, res, next) => {
  con.query("SELECT * FROM `Learn2Message`", (error, results, fields) => {
    console.log("The solution is: " + results);
    res.json(results);
  });
  console.log("Learn2Info這隻api串接成功");
});
// 子留言讀取 完成
router.get("/Learn2CInfo", (req, res, next) => {
  con.query("SELECT * FROM `Learn2MessageChild`", (error, results, fields) => {
    console.log("The solution is: " + results);
    res.json(results);
  });
  console.log("Learn2CInfo這隻api串接成功");
});

// 留言新增------------------------------------------------------------------
// 留言新增 完成
router.post("/Learn2_msg", (req, res, next) => {
  let feData = req.body;
  let sql =
    "INSERT INTO `Learn2Message`(`id`,`name`, `company`, `avatar`, `content`, `awesome` ,`boo` , `time`) VALUES (?)";
  let values = [
    feData.id,
    feData.name,
    feData.company,
    feData.avatar,
    feData.content,
    feData.awesome,
    feData.boo,
    feData.time
  ];
  con.query(sql, [values], (err, results) => {
    if (err) throw err;
    console.log("Number of records inserted: " + results.affectedRows);
  });
  res.json("data update success！");
});
//子留言新增 完成
router.post("/Learn2_cmsg", (req, res, next) => {
  let feData = req.body;
  let sql =
    "INSERT INTO `Learn2MessageChild`(`id`,`cId`,`cName`, `cCompany`, `cAvatar`, `cContent`, `cAwesome` ,`cBoo` , `cTime`) VALUES (?)";
  let values = [
    feData.id,
    feData.cId,
    feData.cName,
    feData.cCompany,
    feData.cAvatar,
    feData.cContent,
    feData.cAwesome,
    feData.cBoo,
    feData.cTime
  ];
  con.query(sql, [values], (err, results) => {
    if (err) throw err;
    console.log("Number of records inserted: " + results.affectedRows);
  });
  res.json("data update success！");
});

//留言刪除 完成
router.delete("/Learn2_msg/:id", (req, res, next) => {
  //刪id一樣的留言
  let sql = "DELETE FROM `Learn2Message` WHERE `id` = '" + req.params.id + "'";
  console.log(req.params.id);
  con.query(sql, (err, results) => {
    if (err) throw err;
    console.log("Number of records inserted: " + results.affectedRows);
  });

  //刪母id一樣的子留言
  let csql =
    "DELETE FROM `Learn2MessageChild` WHERE `id` = '" + req.params.id + "'";
  console.log(req.params.id);
  con.query(csql, (err, results) => {
    if (err) throw err;
    console.log("Number of records inserted: " + results.affectedRows);
  });
  res.json("更新資料庫成功！");
});
//子留言刪除 完成
router.delete("/Learn2_cmsg/:id", (req, res, next) => {
  let sql1 =
    "DELETE FROM `Learn2MessageChild` WHERE `cId` = '" + req.params.id + "'";
  console.log(req.params.id);
  con.query(sql1, (err, results) => {
    if (err) throw err;
    console.log("Number of records inserted: " + results.affectedRows);
  });
  res.json("更新資料庫成功！");
});

//留言讚噓內容修改------------------------------------------------------------------
//留言讚修改 完成
router.put("/Learn2_msg_awe/:id", (req, res, next) => {
  let feData = req.body;
  let sql =
    "UPDATE `Learn2Message` SET `awesome`= " +
    feData.awesome +
    " WHERE `id` = '" +
    req.params.id +
    "'";
  
  con.query(sql, (err, results) => {
    if (err) throw err;
    console.log("Number of records inserted: " + results.affectedRows);
  });
  res.json("更新資料庫成功！");
});
//留言噓修改 完成
router.put("/Learn2_msg_boo/:id", (req, res, next) => {
  let feData = req.body;
  let sql =
    "UPDATE `Learn2Message` SET `boo`= " +
    feData.boo +
    " WHERE `id` = '" +
    req.params.id +
    "'";
  
  con.query(sql, (err, results) => {
    if (err) throw err;
    console.log("Number of records inserted: " + results.affectedRows);
  });
  res.json("更新資料庫成功！");
});
//留言內容修改
router.put("/Learn2_msg_content/:id", (req, res, next) => {
  let feData = req.body;
  let sql =
    "UPDATE `Learn2Message` SET `content`= '" +
    feData.content +
    "' WHERE `id` = '" +
    req.params.id +
    "'";
  
  con.query(sql, (err, results) => {
    if (err) throw err;
    console.log("Number of records inserted: " + results.affectedRows);
  });
  res.json("更新資料庫成功！");
});

//子留言讚噓內容修改------------------------------------------------------------------
// 子留言讚修改 完成
router.put("/Learn2_cmsg_awe/:id", (req, res, next) => {
  let feData = req.body;
  let sql =
    "UPDATE `Learn2MessageChild` SET `cAwesome`= " +
    feData.cAwesome +
    " WHERE `cId` = '" +
    req.params.id +
    "'";
  
  con.query(sql, (err, results) => {
    if (err) throw err;
    console.log("Number of records inserted: " + results.affectedRows);
  });
  res.json("更新資料庫成功！");
});

//子留言噓修改 完成
router.put("/Learn2_cmsg_boo/:id", (req, res, next) => {
  let feData = req.body;
  console.log(feData.body)
  console.log(req.params.id)
  let sql =
    "UPDATE `Learn2MessageChild` SET `cBoo`= " +
    feData.cBoo +
    " WHERE `cId` = '" +
    req.params.id +
    "'";
  
  con.query(sql, (err, results) => {
    if (err) throw err;
    console.log("Number of records inserted: " + results.affectedRows);
  });
  res.json("更新資料庫成功！");
});
//子留言內容修改
router.put("/Learn2_cmsg_content/:id", (req, res, next) => {
  let feData = req.body;
  let sql =
    "UPDATE `Learn2MessageChild` SET `cContent`= '" +
    feData.cContent +
    "' WHERE `cId` = '" +
    req.params.id +
    "'";
  con.query(sql, (err, results) => {
    if (err) throw err;
    console.log("Number of records inserted: " + results.affectedRows);
  });
  res.json("更新資料庫成功！");
});

module.exports = router;
