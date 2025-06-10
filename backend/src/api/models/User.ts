import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../db/index";

export class User extends Model {
  public id!: number;
  public name?: string;
  public email?: string;
  public phone?: string;
  public avatarUrl?: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: false, 
    underscored: false,
  }
);

export default User;