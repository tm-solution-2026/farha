module.exports = (sequelize, DataTypes) => {
  const SupplierElementAttachment = sequelize.define('SupplierElementAttachment', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    supplier_element_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'supplier_elements',
        key: 'id'
      }
    },
    attachment: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    attachment_type: {
      type: DataTypes.ENUM('image', 'video', 'youtube_link', 'link'),
      allowNull: false,
      defaultValue: 'image'
    }
  }, {
    tableName: 'supplier_element_attachments',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: false
  });

  return SupplierElementAttachment;
};
