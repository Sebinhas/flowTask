import axiosInstance from '../../config/axios';

interface ProjectData {
  name: string;
  description: string;
  category: string;
  color: string;
  other_category: string | null;
  owner_id: string;
}

export const createProject = async (projectData: ProjectData) => {
  try {
    const response = await axiosInstance.post('/projects', projectData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getProjectsByUserId = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/projects/${userId}`)
    return response.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export const getProjectByOwnerId = async (ownerId: string) => {
  try {
    console.log('ownerId', ownerId)
    const response = await axiosInstance.get(`/projects/owner/${ownerId}`)
    console.log('response', response)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

