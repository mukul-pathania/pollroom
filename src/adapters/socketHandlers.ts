import { Socket } from 'socket.io-client';

export type poll = {
  created_at: Date;
  id: string;
  question: string;
  options: {
    created_at: Date;
    id: string;
    option_text: string;
    _count: {
      votes: number;
    } | null;
    votes: {
      id: string;
    }[];
  }[];
};

const registerSocketHandlers = (
  socket: Socket,
  roomId: string,
  addPoll: (poll: poll) => void,
): void => {
  socket.on('connect', () => {
    socket.emit('room', roomId);
  });

  socket.on('poll:created', (poll) => {
    addPoll(poll);
  });

  // socket.on('connect_error', (err) => {
  //   console.log(err.message);
  // });
  // socket.on('disconnect', (reason) => {
  //   console.log('socket disconnected', reason);
  // });
};

export default registerSocketHandlers;
