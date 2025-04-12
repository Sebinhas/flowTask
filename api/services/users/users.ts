import axiosInstance from '../../config/axios';

export const getUsers = async () => {
   try {
      const response = await axiosInstance.get('/users');
      return response.data;
   } catch (error: any) {
      throw new Error(error.response.data.message);
   }
}

export const getUserById = async (id: string) => {
   try {
      const response = await axiosInstance.get(`/users/${id}`);
      return response.data;
   } catch (error: any) {
      throw new Error(error.response.data.message);
   }
}