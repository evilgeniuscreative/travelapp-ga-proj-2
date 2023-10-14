const {Thing1} = require('../models/thing1')

const whatever = async (req, res) => {
  let data = {
    thing1: await Thing1.find()
  };
}


module.exports = {whatever}