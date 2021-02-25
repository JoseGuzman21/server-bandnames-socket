const { io } = require("../../index");
const Bands = require("../models/bands");
const Band = require("../models/band.models");
const bands = new Bands();

bands.addBand(new Band("Queen"));
bands.addBand(new Band("Bon Jovi"));
bands.addBand(new Band("Heroes del silencio"));
bands.addBand(new Band("Metalica"));

// mensajes de sockets
io.on("connection", (client) => {
  console.log("Cliente conectado");
  // mandando todas las bandas
  client.emit("active-bands", bands.getBands());
  client.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
  // escuchar
  client.on("mensaje", (payload) => {
    // console.log("Mensaje!!", payload);
    // emitir
    io.emit("mensaje", { admin: "nuevo mensaje" });
  });

  client.on("emitir-mensaje", (payload) => {
    // io.emit('nuevo-mensaje', payload); emite a todos
    // console.log(payload);
    client.broadcast.emit("nuevo-mensaje", payload);
  });

  client.on('vote-band', (payload) => {
    bands.voteBand(payload.id);
    // todos necesitan escuchar este cambio = io = servidor
    io.emit("active-bands", bands.getBands());
  });

  client.on('add-band', (payload) => {
    const newBand = new Band(payload.name);
    bands.addBand(newBand);
    // todos necesitan escuchar este cambio = io = servidor
    io.emit("active-bands", bands.getBands());
  });

  client.on('delete-band', (payload) => {
    bands.deleteBand(payload.id);
    // todos necesitan escuchar este cambio = io = servidor
    io.emit("active-bands", bands.getBands());
  });
});
