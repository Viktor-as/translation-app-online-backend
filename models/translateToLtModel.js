const { model, models, Schema } = require("mongoose");

const translateToLtShema = Schema({
  translateToIt: {
    type: Schema.Types.ObjectId,
    ref: "translateToIt",
  },
  word: {
    type: String,
    required: [true, "Please specify the word for translation"],
    lowercase: true,
  },
  description: {
    type: String,
  },
  examples: {
    type: [[String]],
  },
});

const translateToLt =
  models?.translateToLt || model("translateToLt", translateToLtShema);

module.exports = translateToLt;
