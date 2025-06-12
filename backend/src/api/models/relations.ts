import Account from "./Account";
import Currencie from "./Currencie";


Account.belongsTo(Currencie, {
  foreignKey: "currency_id",
  as: "currency",
});

Currencie.hasMany(Account, {
  foreignKey: "currency_id",
  as: "accounts",
});
