'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 30],
          isNotEmail (value) {
            if (Validator.isEmail(value)) {
              throw new Error('Cannot be an email.');
            }
          }
        }
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [3, 50]
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
          isEmail: true
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      },
      avatar: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      birthday: {
        type: DataTypes.DATEONLY,
        allowNull: true
      }
    },
    {
      defaultScope: {
        attributes: {
          exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
        }
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ['hashedPassword'] }
        },
        loginUser: {
          attributes: {}
        }
      }
    }
  );

  User.associate = function (models) {
    User.hasMany(models.Relationship, {
      foreignKey: 'userOneId'
    });
    User.hasMany(models.Relationship, {
      foreignKey: 'userTwoId'
    });
    User.hasMany(models.Relationship, {
      foreignKey: 'actionUserId'
    });
    User.hasMany(models.Wish, {
      foreignKey: 'userId'
    });
  };

  // --------------   Methods ---------------
  // 1. Return user object that's safe to save to a JWT
  User.prototype.toSafeObject = function () {
    // No arrow function
    const { id, username, displayName, email, avatar, birthday } = this;
    return { id, username, displayName, email, avatar, birthday };
  };

  // 2. Verify password
  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  // --------------  Static Methods (not work for instances) ---------------
  // 1. get user by id
  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  };

  // 2. login
  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential
        }
      }
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  // 3. signup - with birthday
  User.signup = async function ({ username, email, password, birthday, avatar }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      hashedPassword,
      birthday,
      avatar
    });
    return await User.scope('currentUser').findByPk(user.id);
  };

  // 4. signup - without birthday
  User.signupNoBirthday = async function ({ username, email, password, avatar }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      hashedPassword,
      avatar
    });
    return await User.scope('currentUser').findByPk(user.id);
  };

  return User;
};
