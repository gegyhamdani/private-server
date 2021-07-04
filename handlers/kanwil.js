const pool = require("../db");

exports.createKanwil = async (req, res) => {
  try {
    const { name, date_born, location, username, password, level } = req.body;
    const newKanwil = await pool.query(
      "INSERT INTO kanwil(name, date_born, location, username, password, level) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, date_born, location, username, password, level]
    );

    res.json(newKanwil.rows[0]);
  } catch (err) {
    res.status(500).send({
      error: 500,
      message: err,
    });
  }
};

exports.getAllKanwil = async (req, res) => {
  try {
    const allKanwil = await pool.query("SELECT * FROM kanwil");
    res.json(allKanwil.rows);
  } catch (err) {
    res.status(500).send({
      error: 500,
      message: err,
    });
  }
};

exports.getKanwil = async (req, res) => {
  try {
    const { id } = req.params;
    const kanwil = await pool.query("SELECT * FROM kanwil WHERE id = $1", [id]);

    res.json(kanwil.rows[0]);
  } catch (err) {
    res.status(500).send({
      error: 500,
      message: err,
    });
  }
};

exports.updateKanwil = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, date_born, location, username } = req.body;
    const updateKanwil = await pool.query(
      "UPDATE kanwil SET name = $1, date_born = $2, location = $3, username = $4, WHERE id = $5",
      [name, date_born, location, username, id]
    );

    res.json("Kanwil Was Updated");
  } catch (err) {
    res.status(500).send({
      error: 500,
      message: err,
    });
  }
};

exports.deleteKanwil = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteKanwil = await pool.query("DELETE FROM kanwil WHERE id = $1", [
      id,
    ]);

    res.json("Kanwil Was Deleted");
  } catch (err) {
    res.status(500).send({
      error: 500,
      message: err,
    });
  }
};
