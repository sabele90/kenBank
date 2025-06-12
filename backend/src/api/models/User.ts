import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../db/index";

export class User extends Model {
  public id!: number;
  public name?: string;
  public email?: string;
  public phone?: string;
  public avatar_url?: string;
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
    avatar_url: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "avatar_url",
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: false,
    underscored: true, 
  }
);

export default User;
