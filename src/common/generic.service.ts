import { Injectable } from '@nestjs/common';
import { FilterQuery, Model, ObjectId, ProjectionType, QueryOptions, UpdateQuery, Document, UpdateWriteOpResult } from 'mongoose';
import { DateRegisterModel } from 'src/database/mongoose/dateRegister/dateRegister.model';
import { SoftDeleteModel } from 'src/database/mongoose/softDelete/softDelete.model';
@Injectable()
export class GenericService<T, R, S, O extends Model<T & Document>, 
              P extends DateRegisterModel<T & Document>, Q extends SoftDeleteModel<T & Document> > {
  constructor(
      protected readonly repository: O,
      protected readonly dateRegisterModel: P,
      protected readonly softDeleteModel: Q,
  ){}

  async create(Dto: R | R []): Promise< T | T [] | String> {
    try {
      return await this.dateRegisterModel.createdAndDateRegister(Dto);
    } catch(err) {
      return err.message;
    }      
  }
    
  async find(filter?: FilterQuery<T>,  projection?: ProjectionType<T>, query?: QueryOptions<T>): Promise<T[] | String> {   
    try{
        return await this.softDeleteModel.findNotDeleted(filter, projection, query);       
    }catch(err){
      return err.message;
    }
  } 
  
  async findOne(filter: FilterQuery<T>, projections?: ProjectionType<T>, query?:QueryOptions<T>): Promise<T | String> {
    try{
      return await this.repository.findOne(filter, projections, query).exec();
    }catch(err){
      return err;
    }
  }

  async updateById(filter: FilterQuery<T>, updateUserDto: UpdateQuery<S>, options?: QueryOptions<T>){//: Promise< String> {
    try{
      return await this.dateRegisterModel.updatedByIdAndDateRegister(filter, updateUserDto, options);
    }catch(err){
      return err;
    }
  }

  async delete(removedId: ObjectId ,filter: FilterQuery<T>, query?: QueryOptions<T>){
    try{
      return await this.softDeleteModel.softDelete(removedId, filter, query);
    }catch(err){
      return err;
    }
  }
}
