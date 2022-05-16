const controller = {};
const XLSX  = require('xlsx');
const path = require('path');
const fs = require('fs');

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM cliente', (err, clientes) => {
     if (err) {
      res.json(err);
     }
     res.render('clientes', {
        data: clientes
     });
    });
  });
};

controller.save = (req, res) => {
  const data = req.body;

  console.log(req.body);

  const {  profileExcelLocation } = req.body;

  var sql = 'INSERT INTO cliente set  ?';
  var datosM = [];
  if(profileExcelLocation){
    console.log("profileExcelLocation : "+profileExcelLocation);
    // const filePath = path.join('uploads', record.id().toString(), profileExcelLocation.name);
          
    // fs.promises.mkdir(path.dirname(filePath), { recursive: true });
    
    // fs.copyFile(profileExcelLocation.path, filePath, function (err) {
    //   if (err) throw err;
    // });

    // const pathExcel = profileExcelLocation.path ;
        
    // console.log(pathExcel)

    const workbook = XLSX.readFile(profileExcelLocation);
    var nombreHoja = workbook.SheetNames;
    let datos = XLSX.utils.sheet_to_json(workbook.Sheets[nombreHoja[0]]);
    sql = "INSERT INTO cliente set ?";
    
    for (let i = 0; i < datos.length; i++) {
          
      const dato = datos[i];
      //console.log(dato);
      datosM.push(dato);

    }

    //console.log(datosM);

    req.getConnection((err, connection) => {
      const query = connection.query(sql, datosM, (err, cliente) => {
        console.log(cliente);
        res.redirect('/');
      })
    })
  }else{

    req.getConnection((err, connection) => {
      const query = connection.query('INSERT INTO cliente set ?', data, (err, cliente) => {
        console.log(cliente)
        res.redirect('/');
      })
    })
  }
};






controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM cliente WHERE id = ?", [id], (err, rows) => {
      res.render('clientes_edit', {
        data: rows[0]
      })
    });
  });
};

controller.update = (req, res) => {
  const { id } = req.params;
  const newcliente = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE cliente set ? where id = ?', [newcliente, id], (err, rows) => {
    res.redirect('/');
  });
  });
};

controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM cliente WHERE id = ?', [id], (err, rows) => {
      res.redirect('/');
    });
  });
}

module.exports = controller;
