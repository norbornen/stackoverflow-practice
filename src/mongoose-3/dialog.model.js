// @ts-check
const { v4: uuidv4 } = require('uuid');
const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    dialogId: { type: String, default: () => uuidv4() },
    messages: [{
      fromUserId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      messageId: { type: String, default: () => uuidv4() },
      message: String,
      time: { type: Date, default: () => Date.now() },
      read: Boolean
    }]
  },
  { versionKey: false }
);

module.exports = {
  DialogSchema: schema,
  DialogModel: model('DialogModel', schema)
};
