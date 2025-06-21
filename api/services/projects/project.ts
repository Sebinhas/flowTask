import axiosInstance from '../../config/axios';

export interface Board {
  id: string;
  name: string;
  tasks: number;
  description?: string;
  visibility: string;
  status: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  category: string;
  other_category: string | null;
  color: string;
  owner_id: string;
  created_at: string;
  projectBoards: Board[];
}

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
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getProjectsByUserId = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/projects/${userId}`)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export const getProjectByOwnerId = async (ownerId: string) => {
  try {
    console.log('ownerId', ownerId)
    const response = await axiosInstance.get(`/projects/owner/${ownerId}`)
    console.log('response', response)
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export const getProjectById = async (id: string): Promise<Project> => {
  try {
    const response = await axiosInstance.get<Project>(`/projects/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error al obtener el proyecto');
  }
};

