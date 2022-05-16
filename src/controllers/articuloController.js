const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM articulo', (err, articulos) => {
     if (err) {
      res.json(err);
     }
     res.render('articulos', {
        data: articulos
     });
    });
  });
};

controller.save = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO articulo set ?', data, (err, articulo) => {
      console.log(articulo)
      res.redirect('/');
    })
  })
};

controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM articulo WHERE id = ?", [id], (err, rows) => {
      res.render('articulos_edit', {
        data: rows[0]
      })
    });
  });
};

controller.update = (req, res) => {
  const { id } = req.params;
  const newarticulo = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE articulo set ? where id = ?', [newarticulo, id], (err, rows) => {
    res.redirect('/');
  });
  });
};

controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM articulo WHERE id = ?', [id], (err, rows) => {
      res.redirect('/');
    });
  });
}

module.exports = controller;
