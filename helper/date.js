var date = new Date();
var zaman = date.toLocaleString().slice(0, 18).replace('T', ' ');

module.exports = zaman;