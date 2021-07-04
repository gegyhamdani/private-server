const pool = require("../db");

exports.createLaporan = async (req, res) => {
  try {
    const {
      fieldstaff_name,
      tanggal_laporan,
      kegiatan,
      keterangan,
      foto,
      lokasi,
      keluhan,
      saran,
      id_fieldstaff,
    } = req.body;
    const newLaporan = await pool.query(
      "INSERT INTO laporan(fieldstaff_name, tanggal_laporan, kegiatan, keterangan,  foto, lokasi, keluhan, saran, id_fieldstaff) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [
        fieldstaff_name,
        tanggal_laporan,
        kegiatan,
        keterangan,
        foto,
        lokasi,
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

exports.updateLaporan = async (req, res) => {
  try {
    const { id } = req.params;
    const { kegiatan, keterangan, foto, lokasi, keluhan, saran } = req.body;
    const updateLaporan = await pool.query(
      "UPDATE fieldstaff SET kegiatan = $1, keterangan = $2, foto = $3, lokasi = $4, keluhan = $5, saran = $6, WHERE id = $7",
      [kegiatan, keterangan, foto, lokasi, keluhan, saran, id]
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