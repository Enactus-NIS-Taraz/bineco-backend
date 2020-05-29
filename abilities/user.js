const { AbilityBuilder, Ability } = require("@casl/ability");

function defineAbilitiesFor(user) {
  const { can, cannot, rules } = new AbilityBuilder();

  // can read devices
  can("read", "devices");
  // can manage (i.e., do anything) own posts
  can("manage", "devices", { author: user._id });
  // cannot delete a post if it was created more than a day ago
  cannot("delete", "devices");

  return new Ability(rules);
}

module.exports = defineAbilitiesFor;