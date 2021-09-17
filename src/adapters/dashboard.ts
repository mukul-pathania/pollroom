import api from './baseApi';

export type createdRooms = {
  id: string;
  name: string;
  created_at: Date;
  _count: {
    polls: number;
    users: number;
  } | null;
}[];

type dashBoardInfoType = {
  message: string;
  error: boolean;
  roomsJoined: number;
  votesCasted: number;
  pollsCreated: number;
  createdRooms: createdRooms;
};
export const getDashboardInfo = async (): Promise<dashBoardInfoType> => {
  try {
    const response = await api.get<dashBoardInfoType>('/user/dashboard');
    return response.data;
  } catch (error) {
    return {
      error: true,
      message: 'An error occured while processing your request',
      roomsJoined: 0,
      votesCasted: 0,
      pollsCreated: 0,
      createdRooms: [],
    };
  }
};

export type pollsCreatedType = {
  id: string;
  created_at: Date;
  _count: {
    vote: number;
  } | null;
  room: {
    name: string;
  };
  question: string;
  room_id: string;
}[];

type pollsCreatedResponse = {
  error: boolean;
  message: string;
  pollsCreated: pollsCreatedType;
};

export const getPollsCreated = async (): Promise<pollsCreatedResponse> => {
  try {
    const response = await api.get<pollsCreatedResponse>('/user/polls');
    return response.data;
  } catch (error) {
    return {
      error: true,
      message: 'An error occured while processing your request',
      pollsCreated: [],
    };
  }
};
