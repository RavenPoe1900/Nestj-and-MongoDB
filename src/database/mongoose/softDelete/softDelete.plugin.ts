import  { Schema } from 'mongoose';

export const softDeletePlugin = (schema: Schema) => {
  schema.add({
    deletedAt: {
      type: Date,
      default: null,
    },
    removedId:{
        type: Schema.Types.ObjectId,
        default: null,
    },
  });
};