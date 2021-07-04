const pool = require("../db");

exports.createFieldstaff = async (req, res) => {
  try {
    const { name, date_born, location, username, password, level, id_kantah } =
      req.body;
    const selectedFieldstaff = await pool.query(
      "SELECT * FROM fieldstaff WHERE username = $1",
      [username]
    );
    if (selectedFieldstaff.rows[0]) {
      return res.status(401).send({
        error: 401,
        message: "Username has been used",
      });
    }
    const newFieldstaff = await pool.query(
      "INSERT INTO fieldstaff(name, date_born, location, username, password, level, id_kantah) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [name, date_born, location, username, password, level, id_kantah]
    );

    res.json(newFieldstaff.rows[0]);
  } catch (err) {
    res.status(500).send({
      error: 500,
      message: err,
    });
  }
};

exports.getAllFieldstaff = async (req, res) => {
  try {
    const allFieldstaff = await pool.query("SELECT * FROM fieldstaff");
    res.json(allFieldstaff.rows);
  } catch (err) {
    res.status(500).send({
      error: 500,
      message: err,
    });
  }
};

exports.getFieldstaff = async (req, res) => {
  try {
    const { id } = req.params;
    const fieldstaff = await pool.query(
      "SELECT * FROM fieldstaff WHERE id = $1",
      [id]
    );

    res.json(fieldstaff.rows[0]);
  } catch (err) {
    res.status(500).send({
      error: 500,
      message: err,
    });
  }
};

exports.getFieldstaffKantah = async (req, res) => {
  try {
    const { id } = req.params;
    const fieldstaff = await pool.query(
      "SELECT * FROM fieldstaff WHERE id_kantah = $1",
      [id]
    );

    res.json(fieldstaff.rows);
  } catch (err) {
    res.status(500).send({
      error: 500,
      message: err,
    });
  }
};

exports.updateFieldstaff = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, date_born, location, username } = req.body;
    const updateFieldstaff = await pool.query(
      "UPDATE fieldstaff SET name = $1, date_born = $2, location = $3, username = $4, WHERE id = $5",
      [name, date_born, location, username, id]
    );

    res.json("Fieldstaff Was Updated");
  } catch (err) {
    res.status(500).send({
      error: 500,
      message: err,
    });
  }
};

exports.deleteFieldstaff = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteFieldstaff = await pool.query(
      "DELETE FROM fieldstaff WHERE id = $1",
      [id]
    );

    res.json("Fieldstaff Was Deleted");
  } catch (err) {
    res.status(500).send({
      error: 500,
      message: err,
    });
  }
};
