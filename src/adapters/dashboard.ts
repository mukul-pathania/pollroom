import api from './baseApi';

type dashBoardInfoType = {
  message: string;
  error: boolean;
  roomsJoined: number;
  votesCasted: number;
  pollsCreated: number;
};
export const getDashboardInfo = async (): Promise<dashBoardInfoType> => {
  try {
    const response = await api.get<dashBoardInfoType>('/user/dashboard', {});
    return response.data;
  } catch (error) {
    return {
      error: true,
      message: 'An error occured while processing your request',
      roomsJoined: 0,
      votesCasted: 0,
      pollsCreated: 0,
    };
  }
};
