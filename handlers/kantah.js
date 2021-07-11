const pool = require("../db");

exports.createKantah = async (req, res) => {
  try {
    const { name, username, password, level, id_kanwil } = req.body;
    const selectedKantah = await pool.query(
      "SELECT * FROM kantah WHERE username = $1",
      [username]
    );
    if (selectedKantah.rows[0]) {
      return res.status(401).send({
        error: 401,
        message: "Username has been used",
      });
    }
    const newKantah = await pool.query(
      "INSERT INTO kantah(name, username, password, level, id_kanwil) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [name, username, password, level, id_kanwil]
    );

    res.json(newKantah.rows[0]);
  } catch (err) {
    res.status(500).send({
      error: 500,
      message: err,
    });
  }
};

exports.getAllKantah = async (req, res) => {
  try {
    const allKantah = await pool.query("SELECT * FROM kantah");
    res.json(allKantah.rows);
  } catch (err) {
    res.status(500).send({
      error: 500,
      message: err,
    });
  }
};

exports.getKantah = async (req, res) => {
  try {
    const { id } = req.params;
    const kantah = await pool.query("SELECT * FROM kantah WHERE id = $1", [id]);

    res.json(kantah.rows[0]);
  } catch (err) {
    res.status(500).send({
      error: 500,
      message: err,
    });
  }
};

exports.updateKantah = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, username } = req.body;
    const updateKantah = await pool.query(
      "UPDATE kantah SET name = $1, username = $2, WHERE id = $3",
      [name, username, id]
    );

    res.json("Kantah Was Updated");
  } catch (err) {
    res.status(500).send({
      error: 500,
      message: err,
    });
  }
};

exports.deleteKantah = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteKantah = await pool.query("DELETE FROM kantah WHERE id = $1", [
      id,
    ]);

    res.json("Kantah Was Deleted");
  } catch (err) {
    res.status(500).send({
      error: 500,
      message: err,
    });
  }
};
