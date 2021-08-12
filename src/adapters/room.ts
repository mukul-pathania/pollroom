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
  creator: {
    id: string;
    username: string;
  };
  created_at: Date;
  name: string;
  polls: {
    created_at: Date;
    id: string;
    question: string;
    options: {
      created_at: Date;
      id: string;
      option_text: string;
      _count: { votes: number } | null;
      votes:
        | {
            id: string;
          }[];
    }[];
  }[];
} | null;

export const getRoomInfo = async (
  roomId: string,
): Promise<{
  roomInfo: roomInfo;
  error: boolean;
  message: string;
}> => {
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
