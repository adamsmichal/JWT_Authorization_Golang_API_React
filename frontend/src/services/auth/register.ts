import ApiHandler from 'api';
import { IPostResponse, IRegisterData } from 'utils';

export const register = async (payload: IRegisterData) => {
  const response: IPostResponse = await ApiHandler.post('register', payload);

  return response;
};
