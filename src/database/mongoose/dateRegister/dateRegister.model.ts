import {Document, FilterQuery, Model, QueryOptions} from "mongoose";

export interface DateRegisterModel<T extends Document> extends Model<T> {
}