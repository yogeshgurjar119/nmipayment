const { counter } = require("../models/counter.model");

const getNextSequenceValue = async (type) => {
  try {
    const data = await counter.find({ _id: type });
    if (data.length == 0) {
      const res = counter({ _id: type });
      const seq = await res.save();
      return seq.seq;
    }
    const res = await counter
      .findByIdAndUpdate(
        type,
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      )
      .exec();
    return res.seq;
  } catch (error) {
    throw error;
  }
};

module.exports = getNextSequenceValue;
