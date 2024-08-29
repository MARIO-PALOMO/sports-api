const express = require("express");
const router = express.Router();

// Importar las rutas
const logRoutes = require("./routes/logRoutes");
const userRoutes = require("./routes/userRoutes");
const stateRoutes = require("./routes/stateRoutes");
const fieldRoutes = require("./routes/fieldRoutes");
const roundRoutes = require("./routes/roundRoutes");
const competitionRoutes = require("./routes/competitionRoutes");
const teamRoutes = require("./routes/teamRoutes");
const playerRoutes = require("./routes/playerRoutes");
const sanctionTypesRoutes = require("./routes/sanctionTypesRoutes");
const matchRoutes = require("./routes/matchRoutes");
const goalRoutes = require("./routes/goalRoutes");

// Usar las rutas
router.use('/log', logRoutes);
router.use('/user', userRoutes);
router.use('/states', stateRoutes);
router.use('/fields', fieldRoutes);
router.use('/rounds', roundRoutes);
router.use('/competitions', competitionRoutes);
router.use('/teams', teamRoutes);
router.use('/players', playerRoutes);
router.use('/sanctiontypes', sanctionTypesRoutes);
router.use('/matches', matchRoutes);
router.use('/goals', goalRoutes);

module.exports = router;
