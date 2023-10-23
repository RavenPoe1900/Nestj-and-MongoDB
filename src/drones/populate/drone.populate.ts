import { PopulateOptions } from "mongoose";
import { projection } from "src/common/const/db.const";

export const populateDrone: string | string[] | PopulateOptions | PopulateOptions[] = { 
    path: 'medications',    
    model: 'Medication',
    options: {projection:projection},
 }