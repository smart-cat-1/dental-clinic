const express = require("express");
const router = express.Router();
const {
  listAppointments,
  createAppointment,
  confirmAppointment,
} = require("../controllers/appointmentsCtrl");

router.get("/", listAppointments);
router.post("/", createAppointment);
router.patch("/:id/confirm", confirmAppointment);

module.exports = router;
