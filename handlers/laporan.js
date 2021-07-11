const pool = require("../db");

exports.createLaporan = async (req, res) => {
  try {
    const {
      fieldstaff_name,
      tanggal_laporan,
      kegiatan,
      tahapan,
      keterangan,
      foto,
      keluhan,
      saran,
      id_fieldstaff,
    } = req.body;
    const newLaporan = await pool.query(
      "INSERT INTO laporan(fieldstaff_name, tanggal_laporan, kegiatan, tahapan, keterangan, foto, keluhan, saran, id_fieldstaff) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [
        fieldstaff_name,
        tanggal_laporan,
        kegiatan,
        keterangan,
        tahapan,
        foto,
        keluhan,
        saran,
        id_fieldstaff,
      ]
    );

    res.json(newLaporan.rows[0]);
  } catch (err) {
    res.status(500).send({
      error: 500,
      message: err,
    });
  }
};

exports.getAllLaporan = async (req, res) => {
  try {
    const allLaporan = await pool.query("SELECT * FROM laporan");
    res.json(allLaporan.rows);
  } catch (err) {
    res.status(500).send({
      error: 500,
      message: err,
    });
  }
};

exports.getLaporan = async (req, res) => {
  try {
    const { id } = req.params;
    const laporan = await pool.query("SELECT * FROM laporan WHERE id = $1", [
      id,
    ]);

    res.json(laporan.rows[0]);
  } catch (err) {
    res.status(500).send({
      error: 500,
      message: err,
    });
  }
};

exports.getUserLaporan = async (req, res) => {
  try {
    const { id } = req.params;
    const laporan = await pool.query(
      "SELECT * FROM laporan WHERE id_fieldstaff = $1",
      [id]
    );

    res.json(laporan.rows);
  } catch (err) {
    res.status(500).send({
      error: 500,
      message: err,
    });
  }
};

exports.updateLaporan = async (req, res) => {
  try {
    const { id } = req.params;
    const { kegiatan, keterangan, tahapan, keluhan, saran } = req.body;
    const updateLaporan = await pool.query(
      "UPDATE laporan SET kegiatan = $1, keterangan = $2, tahapan = $3, keluhan = $4, saran = $5 WHERE id = $6",
      [kegiatan, keterangan, tahapan, keluhan, saran, id]
    );

    res.json("Laporan Was Updated");
  } catch (err) {
    res.status(500).send({
      error: 500,
      message: err,
    });
  }
};

exports.deleteLaporan = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteLaporan = await pool.query(
      "DELETE FROM laporan WHERE id = $1",
      [id]
    );

    res.json("Laporan Was Deleted");
  } catch (err) {
    res.status(500).send({
      error: 500,
      message: err,
    });
  }
};
