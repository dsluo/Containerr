import { getRepositoryToken } from '@mikro-orm/nestjs';
import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { CreateNodeDto } from './dto/create-node.dto';
import { Node } from './entities/node.entity';
import { NodeService } from './node.service';

jest.mock('uuid', () => ({ v4: () => '00000000-0000-0000-0000-000000000000' }));

describe('NodeService', () => {
  let service: NodeService;

  const mockNodeRepository = {
    create: jest.fn().mockImplementation(async () => {
      return {
        id: '00000000-0000-0000-0000-000000000000',
        name: 'test',
        parent: undefined,
      };
    }),
    findAll: jest.fn().mockImplementation(async () => []),
    findOne: jest.fn().mockImplementation(async (where) => {
      return {
        id: where.id || '00000000-0000-0000-0000-000000000000',
        name: 'test',
        parent: undefined,
      };
    }),
    persistAndFlush: jest
      .fn()
      .mockImplementation(async (dto: CreateNodeDto) => {
        return;
      }),
    count: jest.fn().mockImplementation((id) => {
      if (id === '22222222-2222-2222-2222-222222222222') return 1;
      else return 0;
    }),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    remove: jest.fn().mockImplementation((id: string) => 1),
    findOneOrFail: jest.fn().mockImplementation(() => {
      return {
        id: '00000000-0000-0000-0000-000000000000',
        name: 'test',
        parent: null,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NodeService,
        {
          provide: getRepositoryToken(Node),
          useValue: mockNodeRepository,
        },
      ],
    }).compile();

    service = module.get<NodeService>(NodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('node creation', () => {
    it('should create a node with an new uuid', async () => {
      expect(
        await service.create({
          name: 'test test',
        }),
      ).toEqual({
        id: '00000000-0000-0000-0000-000000000000',
        name: 'test test',
        parent: undefined,
      });
    });

    it('should create a node with an existing uuid', async () => {
      expect(
        await service.create({
          id: '11111111-1111-1111-1111-111111111111',
          name: 'test test',
        }),
      ).toEqual({
        id: '11111111-1111-1111-1111-111111111111',
        name: 'test test',
        parent: undefined,
      });
    });

    it('should not create a node for an existing uuid', async () => {
      expect(async () => {
        await service.create({
          id: '22222222-2222-2222-2222-222222222222',
          name: 'test test',
        });
      }).rejects.toThrow(ConflictException);
    });
  });

  describe('node reading', () => {
    it('should get all nodes', async () => {
      expect(await service.findAll()).toStrictEqual([]);
    });

    it('should get one node', async () => {
      expect(
        await service.findOne('11111111-1111-1111-1111-111111111111'),
      ).toEqual({
        id: '11111111-1111-1111-1111-111111111111',
        name: expect.any(String),
        parent: undefined,
      });
    });
  });

  // describe('node updating', () => {
  //   throw 'not implemnted';
  // });
});
