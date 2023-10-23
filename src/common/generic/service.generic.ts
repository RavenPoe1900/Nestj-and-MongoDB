import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { 
  FilterQuery, 
  Model, 
  ObjectId, 
  ProjectionType, 
  QueryOptions, 
  UpdateQuery, 
  Document, 
  PopulateOptions} from 'mongoose';
import { IPageInfo } from '../interface/pageInfo.interface';
import { projection } from '../const/db.const';

@Injectable()
export class GenericService<
              T,
              R,
              S, 
              O extends Model<T & Document>,
              >{
  constructor(
      protected readonly repository: O,
  ){}
  internalServerErrorException =`Server Error: An internal server error occurred 
                              processing the request`;
  badRequestException = "The id does not exist";
  projectionsType = projection;

  async create(dto: R | R [], 
               populate: string | string[] | PopulateOptions | PopulateOptions[] = null
             ): Promise<T> {
    try {
      const newDto={
        ...dto,
        createdA: new Date(),
        updatedAt: new Date(),
      }
      const create: T = populate ? 
        await (await this.repository.create(newDto)).populate(populate) as T:
        await (await this.repository.create(newDto)) as T;
      return !create[0]?this.createFilter(create): this.createArrayFilter(create); 
      // return create;
    } catch(err) {
      throw new InternalServerErrorException(this.internalServerErrorException);
    }      
  }
  async find(
    filter: FilterQuery<T> = {}, projection: ProjectionType<T> = "", query?: QueryOptions<T>
  ):Promise<IPageInfo<T>> { 
    query = query? query: {limit:50, skip:0};  
    let data;
    let count;
    if(projection === "") projection = this.projectionsType;
    try{
      if(!filter.deleteAt)
       filter = { ...filter, deletedAt: null};
      data = await this.repository.find(filter, projection, query).exec();
      count = await this.repository.count(filter); 
            
    }catch(err){
      throw new InternalServerErrorException(this.internalServerErrorException);
    }
    return this.createPageInfo(data, query, count);
  } 
  
  async findOne(
    filter: FilterQuery<T>, projection?: ProjectionType<T>, query?:QueryOptions<T>
  ): Promise<T>{
    let findOne;  
    if(projection === "") projection = this.projectionsType;
    try{
      findOne = await this.repository.findOne(filter, projection, query).exec();
    }catch(err){
      throw new InternalServerErrorException(this.internalServerErrorException);
    }
    if (!findOne) throw new BadRequestException(this.badRequestException);
    return findOne;
  }

  async updateById(
    filter: FilterQuery<T>, updateDto: UpdateQuery<S>, options: QueryOptions<T> = {}) 
  {

    let update;
    if(!options.projection) options.projection = this.projectionsType;
    if(!options.new)options.new= true;
    try{
      updateDto['updatedAt'] = new Date(); 
      update = await this.repository.findOneAndUpdate(filter,updateDto as any,options);
    }catch(err){
      throw new InternalServerErrorException(this.internalServerErrorException);
    }
    if (!update) throw new BadRequestException(this.badRequestException);
    return update
  }

  async delete(removedId: ObjectId ,filter: FilterQuery<T>, query?: QueryOptions<T>){   
    const updatedDto =  {
      deletedAt : new Date(),
      removedId : removedId,
    };
    return await this.updateById(filter,updatedDto,query);
  }

  protected createPageInfo(data: T[], query: QueryOptions<T>, count: number):IPageInfo<T> {
    const totalPage = Math.ceil(count/query.limit);
    return {
      rows: data,
      XTotal:	count,
      XTotalPages: totalPage,
      XPerPage:	query.limit,
      XPage: query.skip,
      XNextPage: query.skip === totalPage - 1? query.skip : query.skip + 1,
      XPrevPage: query.skip === 0? 0 : query.skip - 1,
    }
  }

  protected createFilter(create){    
    const {
      deletedAt,
      removedId,
      createdAt,
      updatedAt,
      __v,
      ...result
      } = create._doc?create._doc:create;
      return result;
  }

  protected createArrayFilter(creates){
    const result = creates.map(create => {
      return this.createFilter(create)
    });
    return result;
  }
}
