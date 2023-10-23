export const serviceTestCreate = async (model, service, dto)=>{
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
        Promise.resolve({
          _id: 'some id',
          ...dto
        }),
    ); 
    const data = await service.create(
    dto
    );     
    expect(data).toEqual({
    _id: 'some id',
    ...dto
    });
};

export const serviceUseValue = {    
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
    remove: jest.fn(),
    exec: jest.fn(),
    count: jest.fn(),    
};

// mockCat()