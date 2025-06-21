import axiosInstance from '../../config/axios';

export const getBoards = async (projectId: string) => {
    try {
        const response = await axiosInstance.get(`/boards/${projectId}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los tableros:', error);
        throw error;
    }
};

export const createBoard = async (boardData: any) =>{
    try {
        const response = await axiosInstance.post('/boards', boardData);
        return response.data;
    } catch (error) {
        console.error('Error al crear el tablero:', error);
        throw error;
    }
}

export const getInfoBoard = async (boardId: string) => {
    try {
        const response = await axiosInstance.get(`/boards/${boardId}`)
        return response.data
    } catch (error) {
        console.error("Error al taer la info del tablero", error)
        throw error;
    }
}
