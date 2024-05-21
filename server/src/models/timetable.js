import mongoose from "mongoose"
const Schema = mongoose.Schema

const TimeTableSchema = new Schema({
  TeacherID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  StudentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    default: null
  },
  StartTime: {
    type: Date,
    required: true
  },
  EndTime: {
    type: Date,
    required: true
  },
  IsOnline: {
    type: Boolean,
    default: true
  },
  Address: {
    type: String,
    required: true
  },
  Votes: {
    type: [
      { type: Number }
    ],
    default: []
  },
  IsDeleted: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true
})

const TimeTable = mongoose.model("TimeTables", TimeTableSchema)

export default TimeTable