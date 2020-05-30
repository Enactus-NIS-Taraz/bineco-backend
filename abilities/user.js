const { AbilityBuilder, Ability } = require("@casl/ability");

function defineAbilitiesFor(user) {
  const { can, cannot, rules } = new AbilityBuilder();

  can("manage", "devices", { author: user._id });
  can("read", "devices");

  return new Ability(rules);
}

module.exports = defineAbilitiesFor;
