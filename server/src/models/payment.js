import mongoose from "mongoose"
const Schema = mongoose.Schema

const PaymentSchema = new Schema({
  Sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  FeeType: {
    type: Number,
    required: true
  },
  TraddingCode: {
    type: String,
    required: true
  },
  TotalFee: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  PaymentTime: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

const Payment = mongoose.model("Payments", PaymentSchema)

export default Payment
