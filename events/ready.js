module.exports.run = async (client) => {
  console.log(`${client.user.tag} has logged in.`);
  client.user.setActivity(`${client.projectsSize} Project(s) | Made BY ✧【Black ZordixX】✧#3034`, {
    type: "WATCHING",
  });
};
