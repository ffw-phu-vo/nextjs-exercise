
var Chance = require('chance');
var chance = new Chance();

const getProduct = () => {
  const posts = [];
  for (let i = 0; i < 15; i++) {
    const post =
    {
      "productId": chance.hash({length: 15}),
      "title": chance.animal(),
      "price": chance.integer({ min: 12, max: 200 }),
      "description": chance.paragraph({ sentences: 10 })

    }

    posts.push(post);
  }

  return posts;
}


module.exports.product = getProduct;