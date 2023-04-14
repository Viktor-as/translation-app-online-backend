const asyncHandler = require("express-async-handler");

const translateToLt = require("../models/translateToLtModel");
const translateToIt = require("../models/translateToItModel");

//@desc Get translation data by id
//@route GET /api/lt
//@access Public
const getTranslationData = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400);
    throw new Error("No ID provided");
  }

  const translationData = await translateToLt
    .findById(req.params.id)
    .populate("translateToIt");

  if (!translationData) {
    res.status(400);
    throw new Error("Translation data not found");
  }

  res.status(200).json(translationData);
});

//@desc Find translation
//@route POST /api/lt
//@access Public
const translate = asyncHandler(async (req, res) => {
  if (!req.body.word) {
    res.status(400);
    throw new Error("Please add a word field");
  }

  let regex = new RegExp(`${req.body.word.toLowerCase()}`, "gi");

  const ltTranslation = await translateToLt
    .find(
      {
        word: regex,
      },
      "_id word"
    )
    .limit(10);

  if (!ltTranslation) {
    res.status(400);
    throw new Error("Translation not found");
  }

  res.status(200).json(ltTranslation);
});

//@desc Post translation
//@route POST /api/lt/post
//@access Public
const post = asyncHandler(async (req, res) => {
  if (!req.body.lt.word) {
    res.status(400);
    throw new Error("Please add a word field");
  }

  const newLtEntry = await translateToLt.create({
    word: req.body.lt.word,
    description: req.body.lt.description,
    examples: req.body.lt.examples,
  });

  const newItEntry = await translateToIt.create({
    word: req.body.it.word,
    description: req.body.it.description,
    examples: req.body.it.examples,
    translateToLt: newLtEntry._id,
  });

  const updated = await translateToLt.updateOne(
    { _id: newLtEntry._id },
    { translateToIt: newItEntry._id }
  );

  res.status(200).json([newLtEntry, newItEntry]);
});

//@desc Post All translations
//@route POST /api/lt/postall
//@access Public
const postAll = asyncHandler(async (req, res) => {
  if (!req.body.lenght === 0) {
    res.status(400);
    throw new Error("No data found");
  }
  const data = [...req.body];
  data.forEach(async (ele) => {
    const newLtEntry = await translateToLt.create({
      word: ele.word,
      description: ele.rest,
    });
  });

  res.status(200).json({ message: `Files successfully uploaded` });
});

module.exports = {
  translate,
  post,
  getTranslationData,
  postAll,
};
