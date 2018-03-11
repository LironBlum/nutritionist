function bluePrintExample(req,res) {
	res.status(200).json({ bluePrintExample: 'bluePrintExample'});
  }
  
  module.exports = {
	bluePrintExample
  };
  