import ApiHandler from 'api';
import { ILoginData, IPostResponse } from 'utils';

export const login = async (payload: ILoginData) => {
  const response: IPostResponse = await ApiHandler.post('login', payload);

  return response;
};
