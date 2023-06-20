import { Injectable } from '@nestjs/common';
import { FilterQuery, Model, ObjectId, ProjectionType, QueryOptions, UpdateQuery, Document} from 'mongoose';
import { DateRegisterModel } from 'src/database/mongoose/dateRegister/dateRegister.model';
import { SoftDeleteModel } from 'src/database/mongoose/softDelete/softDelete.model';
@Injectable()
export class GenericService<
              T,
              R,
              S, 
              O extends Model<T & Document>, 
              P extends DateRegisterModel<T & Document>,
              Q extends SoftDeleteModel<T & Document> > {
  constructor(
      protected readonly repository: O,
      protected readonly dateRegisterModel: P,
      protected readonly softDeleteModel: Q,
  ){}

  async create(dto: R | R []): Promise< T | T [] | String> {
    try {
      dto['createdAt'] = new Date();
      dto['updatedAt'] = new Date();
      return await this.create(dto);
    } catch(err) {
      return err.message;
    }      
  }
    
  async find(filter?: FilterQuery<T>,  projection?: ProjectionType<T>, query?: QueryOptions<T>): Promise<any> {   
    try{
      const filterDeleted = { ...filter, deletedAt: null};
      const rows = await this.find(filterDeleted, projection, query);
      const count = await this.repository.count(filterDeleted); 
      const totalPage = Math.ceil(count/query.limit)
      return {
        rows: rows,
        XTotal:	count,
        XTotalPages: totalPage,
        XPerPage:	query.limit,
        XPage: query.skip,
        XNextPage: query.skip === totalPage - 1? query.skip : query.skip + 1,
        XPrevPage: query.skip === 0? 1 : query.skip - 1,
      }
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

  async updateById(filter: FilterQuery<T>, updateDto: UpdateQuery<S>, 
                    options?: QueryOptions<T>) {
    try{
      updateDto['updatedAt'] = new Date(); 
      return await this.repository.updateOne(filter,updateDto as any,options);
    }catch(err){
      return err;
    }
  }

  async delete(removedId: ObjectId ,filter: FilterQuery<T>, query?: QueryOptions<T>){
    try{
      const updatedDto =  {
        deletedAt : new Date(),
        removedId : removedId,
      };
      return await this.repository.updateOne(filter,updatedDto,query);
    }catch(err){
      return err;
    }
  }
}
