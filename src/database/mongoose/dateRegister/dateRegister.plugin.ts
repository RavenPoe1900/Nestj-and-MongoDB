import mongoose from 'mongoose';

export const dateRegisterPlugin = (schema: mongoose.Schema) => {
  schema.add({
    createdAt:{
      type: Date,
      default: Date.now,
      required: [true, 'CREATEDAT_IS_BLANK'],
    },
    updatedAt:{
      type: Date,
      default: Date.now,
      required: [true, 'UPDATEDAT_IS_BLANK'],
    },
  }); 
};