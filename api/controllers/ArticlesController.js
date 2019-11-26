/**
 * ArticlesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const Articles = require('../models/Articles');

const sails = require('sails');
const SailSModel = sails.models;
module.exports = {

  list: function (req, res) {
    //res.view('list')

    //console.log('sails models', sails.models);

    return new Promise((resolve, reject) => {
      sails.models.articles.find({}, (err, articles) => {
        if (err) {
          reject(err);
          res.send({
            status: 0,
            error: err
          });
        }
        resolve(articles)
        return res.send({
          status: 1,
          articles: articles
        })


        // res.view('list', {
        //   articles: articles
        // });
      })
    })

  },
  add: function (req, res) {
    res.view('add');
  },
  create: function (req, res) {
    var title = req.body.title;
    var body = req.body.body;

    return new Promise((resolve, reject) => {
      sails.models.articles.create({
        title: title,
        body: body
      }).exec((err, article) => {
        if (err) {
          reject(err);
          res.send({
            status: 0,
            error: err
          });
        }
        resolve({
          status: 1,
          message: "New Article created"
        })
        res.redirect('/articles/list')
      })
    })
  },

  edit: function (req, res) {
    var id = req.param('id');
    console.log(req.param('id'));

    sails.models.articles.findOne({
        id: id
      })
      .exec((err, article) => {
        if (err) {
          res.send({
            status: 0,
            errorr: err
          });
        }
        if (!article) {
          res.send({
            status: 0,
            error: "Article not found"
          })
        }
        res.view('edit', {
          article: article
        })
      })

  },
  update: async function (req, res) {
    var id = req.param('id');

    var data = req.body;

    sails.models.articles.findOne({
        id: id
      })
      .exec(async (err, article) => {
        if (err) {
          res.send({
            status: 0,
            errorr: err
          });
        }
        if (!article) {
          res.send({
            status: 0,
            error: "Article not found"
          })
        }
        let updateArticle = await sails.models.articles.updateOne({
          id: id
        }).set({
          title: data.title,
          body: data.body
        })
        if (updateArticle) {
          res.redirect('/articles/list')
        } else {
          res.redirect('articles/edit/'.id)
        }
      })
  },
  delete: function (req, res) {
    var id = req.param('id');

    var data = req.body;

    sails.models.articles.findOne({
        id: id
      })
      .exec(async (err, article) => {
        if (err) {
          res.send({
            status: 0,
            errorr: err
          });
        }
        if (!article) {
          res.send({
            status: 0,
            error: "Article not found"
          })
        }
        let removeArticle = await sails.models.articles.destroyOne({
          id: id
        });

        if (removeArticle) {
          res.redirect('/articles/list')
        } else {
          res.redirect('/articles/edit/'.id)
        }
      })
  }


};
