var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("../speeds.db");

var spawn = require('child_process').exec;
var speeds = spawn('python c:\\Python34\\Lib\\site-packages\\speedtest_cli.py --simple', function(error, stdout, stderr) {
  ret = stdout.split("\n");
  data = {
    ping: ret[0].split(" ")[1],
    down: ret[1].split(" ")[1],
    up: ret[2].split(" ")[1],
    date: Date.now()
  }

  saveData(data);
});


function saveData(data) {
  db.run("INSERT INTO speeds VALUES(?, ?, ?, ?)", data.ping, data.down, data.up, data.date);
}
