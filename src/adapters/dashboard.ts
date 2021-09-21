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

export const getPollsCreated = async (
  sortBy: 'popular' | 'recent',
): Promise<pollsCreatedResponse> => {
  try {
    const response = await api.get<pollsCreatedResponse>('/user/polls', {
      params: { sortBy },
    });
    return response.data;
  } catch (error) {
    return {
      error: true,
      message: 'An error occured while processing your request',
      pollsCreated: [],
    };
  }
};

export type roomsJoined = {
  id: string;
  name: string;
  created_at: Date;
  pollCount: number;
  memberCount: number;
};

type roomsJoinedResponseType = {
  message: string;
  error: boolean;
  roomsJoined: Array<roomsJoined>;
};

export const getRoomsJoined = async (): Promise<roomsJoinedResponseType> => {
  try {
    const response = await api.get<roomsJoinedResponseType>(
      '/user/rooms-joined',
    );
    return response.data;
  } catch (error) {
    return {
      error: true,
      message: 'An error occured while processing your request',
      roomsJoined: [],
    };
  }
};

export type vote = {
  id: string;
  voteUpdatedAt: Date;
  pollCreatedAt: Date;
  question: string;
  roomId: string;
  optionText: string;
  roomName: string;
};

type votesCast = { message: string; error: boolean; votes: Array<vote> };

export const getVotesCast = async (): Promise<votesCast> => {
  try {
    const response = await api.get<votesCast>('/user/votes');
    return response.data;
  } catch (error) {
    return {
      error: true,
      message: 'An error occured while processing your request',
      votes: [],
    };
  }
};
