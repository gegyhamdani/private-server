const pool = require("../db");

exports.createLocation = async (req, res) => {
  try {
    const { desa, kecamatan, kota, provinsi } = req.body;
    const newLocation = await pool.query(
      "INSERT INTO location(desa, kecamatan, kota, provinsi) VALUES($1, $2, $3, $4) RETURNING *",
      [desa, kecamatan, kota, provinsi]
    );

    res.json(newLocation.rows[0]);
  } catch (err) {
    res.status(500).send({
      error: 500,
      message: err,
    });
  }
};

exports.getAllLocation = async (req, res) => {
  try {
    const allLocation = await pool.query("SELECT * FROM location");
    res.json(allLocation.rows);
  } catch (err) {
    res.status(500).send({
      error: 500,
      message: err,
    });
  }
};

exports.getLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const location = await pool.query("SELECT * FROM location WHERE id = $1", [
      id,
    ]);

    res.json(location.rows[0]);
  } catch (err) {
    res.status(500).send({
      error: 500,
      message: err,
    });
  }
};

exports.updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { desa, kecamatan, kota, provinsi } = req.body;
    const updateLocation = await pool.query(
      "UPDATE location SET desa = $1, kecamatan = $2, kota = $3, provinsi = $4, WHERE id = $5",
      [desa, kecamatan, kota, provinsi, id]
    );

    res.json("location Was Updated");
  } catch (err) {
    res.status(500).send({
      error: 500,
      message: err,
    });
  }
};

exports.deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const deletelocation = await pool.query(
      "DELETE FROM location WHERE id = $1",
      [id]
    );

    res.json("location Was Deleted");
  } catch (err) {
    res.status(500).send({
      error: 500,
      message: err,
    });
  }
};
