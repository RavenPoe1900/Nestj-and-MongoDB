import { Test, TestingModule } from '@nestjs/testing';
import { BatteriesController } from './batteries.controller';
import { BatteriesService } from './batteries.service';
import { DronesService } from 'src/drones/drones.service';
import { ObjectIdDto } from 'src/common/dto/findOne.dto';


describe('BatteriesController', () => {
  let controller: BatteriesController;
  let service: BatteriesService;
  const dto = {
    "serialNumber": "G15--ak0001na",
    "batteryCapacity": 71,
  };
  const mockBatteriesService = {
    create:jest.fn(dto=>{
      return{
        "serialNumber": dto.serialNumber,
        "batteryCapacity": dto.batteryCapacity,
      }
    }),
    updateById:jest.fn((id, dto)=>({
      id,
      dto
    }))
  };
  const mockConfig = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BatteriesController],
      providers: [BatteriesService],
      imports: [
        {
          module: class FakeModule {},
          providers: [{ provide: DronesService, useValue: mockConfig }],
          exports: [DronesService],
        },]
    })
    .overrideProvider(BatteriesService)
    .useValue(mockBatteriesService)
    .compile();

    controller = module.get<BatteriesController>(BatteriesController);
    service = module.get<BatteriesService>(BatteriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return a battery', async () => {      
      expect(await controller.create(dto
      )).toEqual({
        ...dto,
      });
      expect(mockBatteriesService.create).toHaveBeenCalledWith({
        ...dto,
      });
    });
  }); 
  
  // describe('update', () => {
  //   it('update battery', async () => {
  //     const id: ObjectIdDto = new ObjectIdDto();
  //     const updateDto = {
  //       "batteryCapacity": 84,
  //     };
     
  //     expect(await controller.update(id ,updateDto)
  //     ).toEqual({
  //       id:{_id: id, deletedAt: null},
  //       dto: updateDto,
  //     });
  //     expect(mockBatteriesService.updateById).toHaveBeenCalledWith({
  //       id:{_id: id, deletedAt: null},
  //       dto: updateDto,
  //     });
  //   });
  // })
});
