import mongoose from 'mongoose';

export const softDeletePlugin = (schema: mongoose.Schema) => {
  schema.add({
    deletedAt: {
      type: Date,
      default: null,
    },
    removedId:{
        type: mongoose.Schema.Types.ObjectId,
        default: null,
    },
  });
};