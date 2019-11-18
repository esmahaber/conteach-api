var mysql = require('mysql');
var dbConn = mysql.createConnection({
         host: 'localhost',
         user: 'root',
         password: '1234',
         database: 'rezervasyon'
     });
     dbConn.connect((err) => {
         if (!err)
             console.log('Veritabanı bağlantısı başarılı');
         else
             console.log('Veritabanı bağlantısı başarısız \n Hata: ' + JSON.stringify(err, undefined, 2));
     });
/*
       mysqlConnection.connect((err) => {
           if (!err)
               console.log('Veritabanı bağlantısı başarılı');
           else
               console.log('Veritabanı bağlantısı başarısız \n Hata: ' + JSON.stringify(err, undefined, 2));
       });

*/

module.exports = dbConn;