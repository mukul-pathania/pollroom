import api from './baseApi';

type createNewRoomType = { message: string; error: boolean };
export const createNewRoom = async (
  roomName: string,
): Promise<createNewRoomType> => {
  try {
    const response = await api.post<createNewRoomType>('/room/new', {
      roomName,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    return {
      error: true,
      message: 'An error occured while processing your request',
    };
  }
};
