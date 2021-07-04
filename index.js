const express = require("express");
const cors = require("cors");
const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//Routes
const {
  createKanwil,
  getAllKanwil,
  getKanwil,
  updateKanwil,
  deleteKanwil,
} = require("./handlers/kanwil");

const {
  createKantah,
  getAllKantah,
  getKantah,
  updateKantah,
  deleteKantah,
} = require("./handlers/kantah");

const {
  createFieldstaff,
  getAllFieldstaff,
  getFieldstaff,
  getFieldstaffKantah,
  updateFieldstaff,
  deleteFieldstaff,
} = require("./handlers/fieldstaff");

const {
  createLocation,
  getAllLocation,
  getLocation,
  updateLocation,
  deleteLocation,
} = require("./handlers/location");

const {
  createLaporan,
  getAllLaporan,
  getLaporan,
  getUserLaporan,
  updateLaporan,
  deleteLaporan,
} = require("./handlers/laporan");

app.post("/kanwil", createKanwil);
app.get("/kanwil", getAllKanwil);
app.get("/kanwil/:id", getKanwil);
app.put("/kanwil/:id", updateKanwil);
app.delete("/kanwil/:id", deleteKanwil);

app.post("/kantah", createKantah);
app.get("/kantah", getAllKantah);
app.get("/kantah/:id", getKantah);
app.put("/kantah/:id", updateKantah);
app.delete("/kantah/:id", deleteKantah);

app.post("/fieldstaff", createFieldstaff);
app.get("/fieldstaff", getAllFieldstaff);
app.get("/fieldstaff/:id", getFieldstaff);
app.get("/fieldstaff/kantah/:id", getFieldstaffKantah);
app.put("/fieldstaff/:id", updateFieldstaff);
app.delete("/fieldstaff/:id", deleteFieldstaff);

app.post("/location", createLocation);
app.get("/location", getAllLocation);
app.get("/location/:id", getLocation);
app.put("/location/:id", updateLocation);
app.delete("/location/:id", deleteLocation);

app.post("/laporan", createLaporan);
app.get("/laporan", getAllLaporan);
app.get("/laporan/:id", getLaporan);
app.get("/laporan/user/:id", getUserLaporan)
app.put("/laporan/:id", updateLaporan);
app.delete("/laporan/:id", deleteLaporan);

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
