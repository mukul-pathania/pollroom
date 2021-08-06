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

export type roomInfo = {
  created_at: Date;
  creator: {
    username: string;
  };
  name: string;
  polls: {
    id: string;
    created_at: Date;
    question: string;
    options: {
      id: string;
      created_at: Date;
      option_text: string;
      votes: {
        id: string;
        option_id: string;
        created_at: Date;
        user_id: string;
      }[];
    }[];
  }[];
} | null;

export const getRoomInfo = async (
  roomId: string,
): Promise<{ roomInfo: roomInfo; error: boolean; message: string }> => {
  try {
    const response = await api.get<{
      roomInfo: roomInfo;
      error: boolean;
      message: string;
    }>(`/room/${roomId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return {
      error: true,
      message: 'An error occured while processing your request',
      roomInfo: null,
    };
  }
};
