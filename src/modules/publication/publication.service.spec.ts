import { Test } from '@nestjs/testing';
import { Publication } from './publication.entity';
import { PublicationRepository } from './publication.repository';
import { PublicationService } from './publication.service';
import { PublicationRequest } from './dto/publication-request';
import { Author } from '../author/author.entity';
import { AuthorRepository } from '../author/author.repository';
import { Paginated } from '../../common/paginated';
import { BadRequestException } from '@nestjs/common';

const publicationRequest = (): PublicationRequest => {
  const request = new PublicationRequest();
  request.title = 'Test';
  request.content = '...';
  request.authorId = 1;
  return request;
};

const authorTest = (): Author => {
  const result = new Author();
  result.id = 1;
  result.name = 'John';
  result.nickname = 'jj';
  result.dateBirth = new Date('2020-08-09T12:41:07Z');
  result.createAt = new Date('2021-08-09T09:00:00Z');
  result.updatedAt = new Date('2021-08-09T09:00:00Z');
  return result;
};

const publicationResult = (): Publication => {
  const result = new Publication();
  result.title = 'Test';
  result.content = '...';
  result.author = authorTest();
  result.createAt = new Date('2021-08-09T09:00:00Z');
  result.updatedAt = new Date('2021-08-09T09:00:00Z');
  return result;
};

const publicationPaginatedResult = (): Paginated<Publication> => {
  const result = new Paginated<Publication>();
  result.total = 1;
  result.data = [publicationResult()];
  return result;
};

describe('PublicationService', () => {
  let publicationService: PublicationService;
  let publicationRepo: PublicationRepository;
  let authorRepo: AuthorRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        PublicationService,
        {
          provide: PublicationRepository,
          useValue: {
            find: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
            findOneOrFail: jest.fn(),
            findAllWithFilters: jest.fn(),
          },
        },
        {
          provide: AuthorRepository,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    publicationService = moduleRef.get<PublicationService>(PublicationService);
    publicationRepo = moduleRef.get<PublicationRepository>(
      PublicationRepository,
    );
    authorRepo = moduleRef.get<AuthorRepository>(AuthorRepository);

    jest
      .spyOn(publicationRepo, 'save')
      .mockImplementation(() => Promise.resolve(publicationResult()));

    jest
      .spyOn(publicationRepo, 'find')
      .mockImplementation(() => Promise.resolve([publicationResult()]));

    jest
      .spyOn(publicationRepo, 'findAllWithFilters')
      .mockImplementation(() => Promise.resolve(publicationPaginatedResult()));

    jest
      .spyOn(publicationRepo, 'findOneOrFail')
      .mockImplementation(() => Promise.resolve(publicationResult()));
  });

  describe('create', () => {
    it('should create a new publication', async () => {
      jest
        .spyOn(authorRepo, 'findOne')
        .mockImplementation(() => Promise.resolve(authorTest()));

      const result = await publicationService.create(publicationRequest());

      expect(publicationRepo.save).toHaveBeenCalled();
      expect(result).toStrictEqual(publicationResult());
    });
  });

  describe('create with inexistent author', () => {
    it('should throw an error', async () => {
      jest
        .spyOn(authorRepo, 'findOne')
        .mockImplementation(() => Promise.resolve(null));

      await expect(() =>
        publicationService.create(publicationRequest()),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('delete', () => {
    it('should delete a publication', async () => {
      await publicationService.delete(1);

      expect(publicationRepo.delete).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should find all publications', async () => {
      const result = await publicationService.findAll(null);

      expect(publicationRepo.findAllWithFilters).toHaveBeenCalled();
      expect(result.total).toEqual(1);
      expect(result.data).toHaveLength(1);
      expect(result.data).toBeInstanceOf(Array);
    });
  });

  describe('findById', () => {
    it('should find a publication by id', async () => {
      const result = await publicationService.findById(1);

      expect(publicationRepo.findOneOrFail).toHaveBeenCalled();
      expect(result).toBeInstanceOf(Publication);
      expect(result).toStrictEqual(publicationResult());
    });
  });
});
