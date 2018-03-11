
function version(req, res) {
  res.status(200).json({ version: 'cur version' });
}

function ping(req,res) {
  res.status(200).json({ ping: '✔'});
}

function vitality(req,res) {
	res.status(200).json({ vitality: 'vitality'});
}

function getenv(req,res) {
  res.status(200).json({ env: 'getenv'});
}

module.exports = {
  version,
  ping,
  vitality,
  getenv
};

