const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const careRequestSchema = new Schema(
  {
    startDate: {
      type: Date,
      required: [true, "Start date is required."],
      unique: true,
    },
    endDate: {
      type: Date,
      required: [true, "End date is required."],
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "completed", "accepted"],
    },
    comment: {
        type: String
    },
    pet: {
        type: Schema.Types.ObjectId,
        ref: "Pet",
        required: true
    },
    sitter: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
  },
  
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const CareRequest = model("CareRequest", careRequestSchema);

module.exports = CareRequest;
