import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../db/index";

export class Currencie extends Model {
  public id!: number;
  public code!: string;
  public name?: string;
  public symbol?: string;
  public rate_to_eur?: number;
  public last_updated?: Date;
}

Currencie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rate_to_eur: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    last_updated: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Currencie", 
    tableName: "currencies", 
    timestamps: false, 
    underscored: false, 
  }
);

export default Currencie;