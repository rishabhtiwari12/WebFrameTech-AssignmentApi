const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  assignedUser: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  dueDate: {
    type: Date,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now 
  },

  completionStatus: {
    type: Boolean,
    default: false
  }
});
taskSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
  });
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;