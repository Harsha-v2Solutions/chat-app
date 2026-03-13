import { DataTypes, Model, type Optional, type Sequelize } from 'sequelize';
import * as Argon2 from 'argon2';

interface UserAttributes {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  uniqueId: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

type UserCreationAttributes = Optional<
  UserAttributes,
  'id' | 'createdAt' | 'updatedAt'
>;

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  declare id: number;
  declare email: string;
  declare firstName: string;
  declare lastName: string;
  declare uniqueId: string;
  declare password: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  static initModel(sequelize: Sequelize): typeof User {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        uniqueId: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'users',
        timestamps: true,
        hooks: {
          beforeCreate: async (user) => {
            if (user.password) {
              user.password = await Argon2.hash(user.password);
            }
          },
          beforeUpdate: async (user) => {
            if (user.changed('password')) {
              user.password = await Argon2.hash(user.password);
            }
          },
        },
      }
    );
    return User;
  }
}

export default User;
