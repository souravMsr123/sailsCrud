/**
 * Requiring the bootstrap file for unit testing configurations
 */
var chai = require('chai');
var should = chai.should();
var expect = chai.expect();
//var be = chai.be();
require('../../bootstrap.spec');
const ArticlesControllers = require('../../../api/controllers/ArticlesController');

describe('This test is for Articles Controllers', () => {


  // it('creates new articles', (done) => {
  //   ArticlesControllers.create({
  //     title: "This is title",
  //     body: "This is test body"
  //   }).then((article) => {
  //     console.log('article', article);
  //     //article.expect('Location', '/articles/list');
  //     done();
  //   }).catch(done);
  // })

  it('Returns array of articles', (done) => {
    ArticlesControllers.list({}).then((articles) => {
      //console.log('articles', articles);
      articles.should.be.an('array');
      done();
    }).catch(done);
  })

})
