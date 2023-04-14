const asyncHandler = require("express-async-handler");

const translateToIt = require("../models/translateToItModel");

//@desc Get translation data by id
//@route GET /api/it
//@access Public
const getTranslationData = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400);
    throw new Error("No ID provided");
  }

  const translationData = await translateToIt
    .findById(req.params.id)
    .populate("translateToLt");

  if (!translationData) {
    res.status(400);
    throw new Error("Translation data not found");
  }

  res.status(200).json(translationData);
});

//@desc Find translation
//@route POST /api/it
//@access Public
const translate = asyncHandler(async (req, res) => {
  if (!req.body.word) {
    res.status(400);
    throw new Error("Please add a word field");
  }

  let regex = new RegExp(`${req.body.word.toLowerCase()}`, "gi");

  const itTranslation = await translateToIt
    .find(
      {
        word: regex,
      },
      "_id word"
    )
    .limit(10);

  if (!itTranslation) {
    res.status(400);
    throw new Error("Translation not found");
  }

  res.status(200).json(itTranslation);
});

//@desc Post All translations
//@route POST /api/it/postall
//@access Public
const postAll = asyncHandler(async (req, res) => {
  if (!req.body.lenght === 0) {
    res.status(400);
    throw new Error("No data found");
  }
  const data = [...req.body];
  data.forEach(async (ele) => {
    const newItEntry = await translateToIt.create({
      word: ele.word,
      description: ele.rest,
    });
  });

  res.status(200).json({ message: `Files successfully uploaded` });
});
module.exports = {
  translate,
  getTranslationData,
  postAll,
};
