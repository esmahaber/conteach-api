var date = new Date();
var zaman = date.toLocaleString().slice(0, 19).replace('T', ' ');

module.exports = zaman;