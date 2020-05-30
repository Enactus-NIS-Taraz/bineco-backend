const { AbilityBuilder, Ability } = require("@casl/ability");

function defineAbilitiesFor(user) {
  const { can, rules } = new AbilityBuilder();
  if (user.role === "admin") {
    can("read", "workplaceUsers");
    can("update", "workplace");
    can("delete", "workplace");
  }
  return new Ability(rules);
}

module.exports = defineAbilitiesFor;
