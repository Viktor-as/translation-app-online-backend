const { model, models, Schema } = require("mongoose");

const translateToItShema = Schema({
  translateToLt: {
    type: Schema.Types.ObjectId,
    ref: "translateToLt",
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

const translateToIt =
  models?.translateToIt || model("translateToIt", translateToItShema);

module.exports = translateToIt;
