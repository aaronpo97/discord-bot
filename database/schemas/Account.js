const mongoose = require('mongoose');
const { Schema } = mongoose;

const AccountSchema = new Schema({
	userID: String,
	balance: Number,
	guild: { type: Schema.Types.ObjectId, ref: 'Server' },
});

const AccountInfo = mongoose.model('Account', AccountSchema);

module.exports = AccountInfo;
