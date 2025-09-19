// services/base-nswag.service.ts

import { Observable } from 'rxjs';

export interface ICrudClient<TDto, TSearch = any> {
  getAll(search?: TSearch): Observable<TDto[]>;
  getById(id: number | string): Observable<TDto>;
  create(dto: TDto): Observable<TDto>;
  update(id: number | string, dto: TDto): Observable<TDto>;
  delete(id: number | string): Observable<void>;
}


export class BaseNSwagService<
  TDto,
  TSearch = any,
  TClient extends ICrudClient<TDto, TSearch> = ICrudClient<TDto, TSearch>
> {
  constructor(protected client: TClient) {}

  getAll(search?: TSearch): Observable<TDto[]> {
    return this.client.getAll(search);
  }

  getById(id: number | string): Observable<TDto> {
    return this.client.getById(id);
  }

  create(dto: TDto): Observable<TDto> {
    return this.client.create(dto);
  }

  update(id: number | string, dto: TDto): Observable<TDto> {
    return this.client.update(id, dto);
  }

  delete(id: number | string): Observable<void> {
    return this.client.delete(id);
  }
}



// @Injectable({ providedIn: 'root' })
// export class UserService extends BaseNSwagService<UserDto, UserSearch, UserClient> {
//   constructor(client: UserClient) {
//     super(client);
//   }
// }