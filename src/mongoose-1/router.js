// @ts-check

const {Router} = require('express')
const router = Router();
const Receipt = require('./model');

    router.get('/',async(req,res) => {
      const z = await Receipt.find();
       await Receipt.find({}, function(err, docs) {
           if(err){
               console.log(err);
           }
            res.render('index',{fill:docs});
       })
    });

module.exports = router;
