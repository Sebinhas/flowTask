import axiosInstance from '../../config/axios';

export const createTask = async (listId: string, taskData: any) => {
  const response = await axiosInstance.post(`/tasks/list/${listId}`, taskData);
  return response.data;
};
