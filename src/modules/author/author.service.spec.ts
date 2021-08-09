import { Test } from '@nestjs/testing';
import { Author } from './author.entity';
import { AuthorRepository } from './author.repository';
import { AuthorService } from './author.service';
import { AuthorRequest } from './dto/author-request';

const authorRequest = (): AuthorRequest => {
  const request = new AuthorRequest();
  request.name = 'John';
  request.nickname = 'jj';
  request.dateBirth = new Date('2020-08-09T12:41:07Z');
  return request;
};

const authorResult = (): Author => {
  const result = new Author();
  result.id = 1;
  result.name = 'John';
  result.nickname = 'jj';
  result.dateBirth = new Date('2020-08-09T12:41:07Z');
  result.createAt = new Date('2021-08-09T09:00:00Z');
  result.updatedAt = new Date('2021-08-09T09:00:00Z');
  return result;
};

describe('AuthorService', () => {
  let authorService: AuthorService;
  let authorRepo: AuthorRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthorService,
        {
          provide: AuthorRepository,
          useValue: {
            find: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
            findOneOrFail: jest.fn(),
          },
        },
      ],
    }).compile();

    authorService = moduleRef.get<AuthorService>(AuthorService);
    authorRepo = moduleRef.get<AuthorRepository>(AuthorRepository);

    jest
      .spyOn(authorRepo, 'save')
      .mockImplementation(() => Promise.resolve(authorResult()));

    jest
      .spyOn(authorRepo, 'find')
      .mockImplementation(() => Promise.resolve([authorResult()]));

    jest
      .spyOn(authorRepo, 'findOneOrFail')
      .mockImplementation(() => Promise.resolve(authorResult()));
  });

  describe('create', () => {
    it('should create a new author', async () => {
      const result = await authorService.create(authorRequest());

      expect(authorRepo.save).toHaveBeenCalled();
      expect(result).toStrictEqual(authorResult());
    });
  });

  describe('delete', () => {
    it('should delete a author', async () => {
      await authorService.delete(1);

      expect(authorRepo.delete).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should find all authors', async () => {
      const result = await authorService.findAll();

      expect(authorRepo.find).toHaveBeenCalled();
      expect(result).toHaveLength(1);
      expect(result[0]).toBeInstanceOf(Author);
    });
  });

  describe('findById', () => {
    it('should find a author by id', async () => {
      const result = await authorService.findById(1);

      expect(authorRepo.findOneOrFail).toHaveBeenCalled();
      expect(result).toBeInstanceOf(Author);
      expect(result).toStrictEqual(authorResult());
    });
  });
});
