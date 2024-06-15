import { Api } from '../axios-config';

export interface IProduct {
  _id: string;
  name: string;
  dueDate: Date;
  vencido: boolean;
  vencendo: boolean;
}

export interface ICreateProduct {
  name: string;
  dueDate: Date;
}

const create = async (body: ICreateProduct): Promise<IProduct> => {
  try {
    const { data } = await Api.post<IProduct>('', body);

    return data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

const remove = async (id: string): Promise<boolean> => {
  try {
    const { data } = await Api.delete<boolean>(id);

    return data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

const get = async (): Promise<IProduct[]> => {
  try {
    const { data } = await Api.get<IProduct[]>('');

    return data;
  } catch (error) {
    throw new Error((error as { message: string }).message || 'Erro ao obter produtos.');
  }
};

export const productService = {
  create,
  remove,
  get
};