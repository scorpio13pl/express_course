var express = require("express");
var router = express.Router();
const News = require("../models/news");
const defaultSort = -1;
/* GET home page. */
router.get("/", function(req, res, next) {
  const search = req.query.search || "";
  let sort = Number(req.query.sort) || defaultSort;

  if (sort !== -1 && sort !== 1) {
    sort = defaultSort;
  }
  console.log(sort);
  const findNews = News.find({ title: new RegExp(search.trim(), "i") })
    .sort({
      created: sort
    })
    .select("_id title description");
  findNews.exec((err, data) => {
    res.json(data);
  });
});

router.get("/:id", function(req, res, next) {
  const id = req.params.id;
  const findNews = News.findById(id).select("_id title description");

  findNews.exec((err, data) => {
    res.json(data);
  });
});

module.exports = router;
