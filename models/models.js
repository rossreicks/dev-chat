var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
    user : { type: Number, ref: 'User' },
    data: String,
    timeStamp: { type: Date, default: Date.now }
})

var userSchema = new Schema({
    name: String,
    email: String,
    icon: String
})

var teamSchema = new Schema({
    name: String,
    description: String,
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    users: [{type: Schema.Types.ObjectId, ref: 'User'}],
    threads: [{type: Schema.Types.ObjectId, ref: 'Thread'}]
})

var threadSchema = new Schema({
    name : String,
    description : String,
    users : [{type: Schema.Types.ObjectId, ref: 'User'}],
    messages : [{type: Schema.Types.ObjectId, ref: 'Message'}]
})

var Message = mongoose.model('Message', messageSchema);
var User = mongoose.model('User', userSchema);
var Team = mongoose.model('Team', teamSchema);
var Thread = mongoose.model('Thread', threadSchema);

module.exports.Message = Message;
module.exports.User = User;
module.exports.Team = Team;
module.exports.Thread = Thread;