import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../db/index";

export class Transaction extends Model {
  public id!: number;
  public description?: string;
  public amount?: number;
  public account_id!: number;
  public category_id?: number;
  public transfer_id?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, 
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 0),
      allowNull: true,
    },
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    transfer_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Transaction",
    tableName: "transactions",
    timestamps: true, 
    underscored: false,
  }
);
