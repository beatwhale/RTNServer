const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('webUsers', {
    id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: "webUsers_email_key2"
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    role: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: "USER"
    },
}, {
    sequelize,
    tableName: 'webUsers',
    schema: 'public',
    timestamps: true,
    indexes: [{
            name: "webUsers_email_key",
            unique: true,
            fields: [
                { name: "email" },
            ]
        },
        {
            name: "webUsers_email_key1",
            unique: true,
            fields: [
                { name: "email" },
            ]
        },
        {
            name: "webUsers_email_key2",
            unique: true,
            fields: [
                { name: "email" },
            ]
        },
        {
            name: "webUsers_pkey",
            unique: true,
            fields: [
                { name: "id" },
            ]
        },
    ]
}, console.log('○ Модель "webUsers" определена'));

const Employee = sequelize.define('employees', {
    employee_id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    login: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    crypto_key: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    sequelize,
    tableName: 'employees',
    schema: 'public',
    timestamps: false,
    indexes: [{
        name: "employees_pkey",
        unique: true,
        fields: [
            { name: "employee_id" },
        ]
    }, ]
}, console.log('○ Модель "employees" определена'));

const Company = sequelize.define('companies', {
    company_id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    type: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    okopf_code: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    subject_rf: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    index: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    tax_id: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    government_registration_number: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    date_entry: {
        type: DataTypes.DATEONLY,
        allowNull: true
    }
}, {
    sequelize,
    tableName: 'companies',
    schema: 'public',
    timestamps: false,
    indexes: [{
        name: "companies_pkey",
        unique: true,
        fields: [
            { name: "company_id" },
        ]
    }, ]
}, console.log('○ Модель "companies" определена'));

const CategObjTS = sequelize.define('categorized_objects_transport', {
    categorized_object_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    registry_number: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: "categorized_objects_transport_registry_number_key"
    },
    date_entry: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    kind_object: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    type_object: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    subject_rf: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    settlement: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    index: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    basis_inclusion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    date_categorization: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    category: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    basis_changes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    date_changes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    date_changes_category: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    category_changes: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    basis_removal: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    date_removal: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    company_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
            model: 'companies',
            key: 'company_id'
        }
    }
}, {
    sequelize,
    tableName: 'categorized_objects_transport',
    schema: 'public',
    timestamps: false,
    indexes: [{
            name: "categorized_objects_transport_pkey",
            unique: true,
            fields: [
                { name: "categorized_object_id" },
            ]
        },
        {
            name: "categorized_objects_transport_registry_number_key",
            unique: true,
            fields: [
                { name: "registry_number" },
            ]
        },
    ]
}, console.log('○ Модель "categorized_objects_transport" определена'));

CategObjTS.belongsTo(Company, {
    as: 'company',
    foreignKey: 'company_id',
});
Company.hasMany(CategObjTS, {
    as: 'categorized_objects_transports',
    foreignKey: 'company_id',
});

module.exports = {
    User,
    Employee,
    Company,
    CategObjTS
}