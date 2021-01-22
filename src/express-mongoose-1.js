// @ts-check
const express = require('express');
const mongoose = require("mongoose");

(async () => {

  const app = express();

  await mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
  
  const orderSchema = new mongoose.Schema({
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        require: true,
        default: [],
      },
    ],
    readyStatus: {
      type: Boolean, default: false,
    },
    timeOrdered: {
      type: Date, default: Date.now,
    },
  });
  
  const orderModel = mongoose.model("Order", orderSchema);

  const itemSchema = new mongoose.Schema({
    name: {
      type: mongoose.Schema.Types.String, default: 'hello',
    }
  });
  
  const itemModel = mongoose.model("Item", itemSchema);

  await orderModel.init();
  await itemModel.init();

  await orderModel.create({
    // _id: new mongoose.ObjectID(),
    readyStatus: true,
  });
  
  
  app.get("/", (req, res, next) => {
    /* TODO : some error during populating orders
      cast error
    */
   orderModel.find()
      .populate('items')
      .exec()
      .then((orders) => {
        console.log(orders);
        // const response = {
        //   orders: orders.map((order) => {
        //     return {
        //       _id: order._id,
        //       items: order.items,
        //       readyStatus: order.readyStatus,
        //       timeOrdered: order.timeOrdered,
        //     };
        //   }),
        // };
        res.status(200).json({ok: 1});
      })
      .catch(console.error);
  });
  
  app.listen(3002, 'localhost');

})();

