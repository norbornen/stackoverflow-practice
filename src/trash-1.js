const findOne = async function () {
  return new Array(5).fill(1).map((_, id) => ({ id, _classname: this.name }));
};
const Tag = { name: 'Tag' };
const Card = { name: 'Card' };
const Post = { name: 'Post' };
Tag.findOne = findOne.bind(Tag);
Card.findOne = findOne.bind(Card);
Post.findOne = findOne.bind(Post);

function findInModels(value, ...models) {
  if (models.length === 0) {
    throw new Error('Модели должны быть указаны');
  }

  return models.map((model) => {
    const modelName = model.name.toLowerCase();
    return model.findOne({
      value, modelName
    });
  });
}

async function getData(req) {
  const { slug } = req.params;
  try {
    const promises = findInModels(slug, Card, Tag, Post);
    const response = await Promise.allSettled(promises);
    const articles = response.reduce((acc, item) => {
      if (item.status === 'fulfilled') {
        acc = acc.concat(item.value || []);
      }
      return acc;
    }, []);
    const article = articles.shift();
    console.log(article);
    console.log(articles.length);
  } catch (err) {
    console.error(err);
  }
}

getData({ params: { slug: 'ab' } }).then(console.log).catch(console.error);
