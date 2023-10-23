import {Document, Model} from "mongoose";

export interface DateRegisterModel<T extends Document> extends Model<T> {
}