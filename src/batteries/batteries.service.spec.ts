import { Test, TestingModule } from '@nestjs/testing';
import { BatteriesService } from './batteries.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import { Battery } from './schemas/battery.schema';
import { Drone } from 'src/drones/schemas/drone.schema';
import { DronesService } from 'src/drones/drones.service';
import { MedicationsService } from 'src/medications/medications.service';
import { Medication } from 'src/medications/schemas/medication.schema';
import { serviceTestCreate, serviceUseValue } from 'src/common/generic/testService.generic';


const serviceName = "battery";

describe('BatteriesService', () => {
  let service: BatteriesService;
  let model: Model<Battery>;

  const mock = (
    serialNumber = "G15--ak0001na",
    batteryCapacity = 78,
  ): Battery => ({
    serialNumber,
    batteryCapacity
  });

  const mockDoc = (mock?: Partial<Battery>): Partial<Battery> => ({
    serialNumber: mock?.serialNumber || 'G15--ak0001na',
    batteryCapacity: mock?.batteryCapacity || 4,
    // _id: mock?.id || 'a uuid'
  });

  const docArray: Partial<Battery>[] = [
    mockDoc(),
    mockDoc({ serialNumber: "G15--ak0001na", batteryCapacity: 78 }),
    mockDoc({ serialNumber: "G15--ak00011a", batteryCapacity: 45 }),
  ];

    // const docArray = {
  //   rows:[
  //     mockDoc(),
  //     mockDoc({ serialNumber: "G15--ak0001na", batteryCapacity: 78 }),
  //     mockDoc({ serialNumber: "G15--ak00011a", batteryCapacity: 45 }),
  //   ],
  //   XNextPage:1,
  //   XPage:0,
  //   XPerPage:50,
  //   XPrevPage:0,
  //   XTotal:undefined,
  //   XTotalPages:NaN,    
  // };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [        
        BatteriesService,
        DronesService,
        MedicationsService,
        { 
          provide: getModelToken(Battery.name), 
          useValue: serviceUseValue 
        },
        { 
          provide: getModelToken(Drone.name), 
          useValue: {} 
        },
        { 
          provide: getModelToken(Medication.name), 
          useValue: {} 
        },
      ]
    }).compile();

    service = module.get<BatteriesService>(BatteriesService);
    model = module.get<Model<Battery>>(getModelToken(Battery.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it(`should insert a new ${serviceName}`, async () => {     
      await serviceTestCreate(model, service, mock);
    });
  }); 

  it(`should return all ${serviceName}`, async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(docArray),
    } as unknown as Query<Battery[], Battery>);
    const find = await service.find();
    expect(find.rows).toEqual(docArray);
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

  // describe('findAll', () => {
  // //   it('should return a battery', async () => {      
  // //     expect(await service.create(dto
  // //     )).toEqual({
  // //       ...dto,
  // //     });
  // //     expect(mockBatteriesService.create).toHaveBeenCalledWith({
  // //       ...dto,
  // //     });
  // //   });
  // }); 
});