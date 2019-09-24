/**
 * ArticlesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  list: function (req, res) {
    //res.view('list')

    Articles.find({})
      .exec((err, articles) => {
        if (err) {
          res.send({
            status: 0,
            error: err
          });
        }
        res.view('list', {
          articles: articles
        });
      })
  },
  add: function (req, res) {
    res.view('add');
  },
  create: function (req, res) {
    var title = req.body.title;
    var body = req.body.body;

    Articles.create({
      title: title,
      body: body
    }).exec((err, article) => {
      if (err) {
        res.send({
          status: 0,
          error: err
        });
      }

      res.redirect('/articles/list')
    })
  },

  edit: function (req, res) {
    var id = req.param('id');
    console.log(req.param('id'));

    Articles.findOne({
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

    Articles.findOne({
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
        let updateArticle = await Articles.updateOne({
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

    Articles.findOne({
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
        let removeArticle = await Articles.destroyOne({
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
