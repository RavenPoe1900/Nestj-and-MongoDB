import {Document} from "mongoose";
import * as mongoose from "mongoose";

export interface SoftDeleteModel<T extends Document> extends mongoose.Model<T> {
}