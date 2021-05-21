// @ts-check
const mongoose = require('mongoose');
const { UserModel } = require('./user.model');
const { DialogModel } = require('./dialog.model');

(async () => {
  try {
    await mongoose.connect(
      'mongodb://localhost:27017/test?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false',
      { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
    );

    await UserModel.collection.drop().catch(console.error);
    await DialogModel.collection.drop().catch(console.error);

    const [u1, u2] = await Promise.all([
      UserModel.create({ nickname: 'User1' }),
      UserModel.create({ nickname: 'User1' })
    ]);

    const d = await DialogModel.create({
      messages: [
        { fromUserId: u1.id, message: Math.random() },
        { fromUserId: u2.id, message: Math.random() },
      ]
    });

    const u = await UserModel.find()
      .populate('dialogs.messages[0].fromUserId')
      .exec();
    console.log(u);

    // let count = 1000;
    // while (--count >= 0) {
    //   await AdModel.create({
    //     productPrice: randomNumber(1000000),
    //     backendDate: randomDate(),
    //     status: Reference.Status[randomNumber(Reference.Status.length)],
    //     city: Reference.Cities[randomNumber(Reference.Cities.length)],
    //     category: Reference.Categories[randomNumber(Reference.Categories.length)],
    //     section: Reference.Sections[randomNumber(Reference.Sections.length)],
    //     subsection: Reference.Subsections[randomNumber(Reference.Subsections.length)],
    //   });
    // }


    // let count = 1000;
    // while (--count >= 0) {
    //   await AdModel.create({
    //     productPrice: randomNumber(1000000),
    //     backendDate: randomDate(),
    //     status: Reference.Status[randomNumber(Reference.Status.length)],
    //     city: Reference.Cities[randomNumber(Reference.Cities.length)],
    //     category: Reference.Categories[randomNumber(Reference.Categories.length)],
    //     section: Reference.Sections[randomNumber(Reference.Sections.length)],
    //     subsection: Reference.Subsections[randomNumber(Reference.Subsections.length)],
    //   });
    // }

    // const reqQuery = {
    //   city: Reference.Cities[0], // [randomNumber(Reference.Cities.length)],
    //   subsection: Reference.Subsections[0], // [randomNumber(Reference.Subsections.length)],
    //   price: 'high',
    //   date: 'high',
    // };

    // const page = randomNumber(10);

    // const pagesize = 25;


    // const query = [
    //   {
    //     $match: {}
    //   },
    //   {
    //     $addFields: { __order: { $indexOfArray: [Reference.Status, '$status'] } }
    //   },
    //   {
    //     $sort: {
    //       __order: 1,
    //       ...(reqQuery.price ? { productPrice: reqQuery.price === 'high' ? -1 : 1 } : {}),
    //       ...(reqQuery.date ? { backendDate: reqQuery.date === 'high' ? -1 : 1 } : {}),
    //       updatedAt: -1
    //     }
    //   },
    //   { $skip: ((page || 1) - 1) * pagesize },
    //   { $limit: pagesize }
    // ];
    // if (reqQuery.city) {
    //   query[0].$match.city = { $eq: reqQuery.city };
    // }
    // if (reqQuery.category) {
    //   query[0].$match.category = { $eq: reqQuery.category };
    // }
    // if (reqQuery.section) {
    //   query[0].$match.section = { $eq: reqQuery.section };
    // }
    // if (reqQuery.subsection) {
    //   query[0].$match.subsection = { $eq: reqQuery.subsection };
    // }

    // const items = await AdModel.aggregate(query);
    // console.log(items);
    // console.log(items.length);


    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
})();

/**
 * @param {number} min
 * @param {number} [max]
 * @returns {number}
 */
function randomNumber(min = 0, max) {
  if (max === null || max === undefined) {
    max = min; min = 0;
  }
  return Math.trunc(Math.random() * (max - min) + min);
}

function randomDate(start = new Date(2000, 0, 1), end = new Date()) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
