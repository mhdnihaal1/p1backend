import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    images: [
      {
        type: String
      },
    ],
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
