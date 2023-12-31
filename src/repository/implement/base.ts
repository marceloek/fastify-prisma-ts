type IOmitId<T> = Omit<T, 'id'>

interface IBaseRepository<T> {
  find(): Promise<T[]>
  findById(id: number): Promise<T>
  create(data: IOmitId<T>): Promise<T>
  updateById(id: number, data: IOmitId<T>): Promise<T>
  deleteById(id: number): Promise<T>
}

export type { IBaseRepository, IOmitId }
