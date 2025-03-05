import User from './user';
import Address from './address';
import Post from './post';

User.hasMany(Post, { foreignKey: "userId", as: "posts" });
Post.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasOne(Address, { foreignKey: "userId", as: "address" });
Address.belongsTo(User, { foreignKey: "userId", as: "user" });

export default { User, Address, Post };