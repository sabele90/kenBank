import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../db/index";
import { Currencie } from "../models/Currencie"

export class Account extends Model {
  public id!: number;
  public bank_id!: number;
  public user_id!: number;
  public number?: string;
  public currency_id!: number;
  public status?: string;
  public createdAt?: Date;
  public balance?: number;
  public currency?: Currencie;
}

Account.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bank_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    currency_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt:{
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_at',
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0.0,
    },
  },
  {
    sequelize,
    modelName: "Account", 
    tableName: "accounts", 
    timestamps: false, 
    underscored: true, 
  }
);


export default Account;