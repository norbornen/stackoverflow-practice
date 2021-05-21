// @ts-check
const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    nickname: String,
    dialogs: [{ type: Schema.Types.ObjectId, ref: 'DialogModel' }],
  },
  { versionKey: false }
);

module.exports = {
  UserSchema: schema,
  UserModel: model('UserModel', schema)
};
