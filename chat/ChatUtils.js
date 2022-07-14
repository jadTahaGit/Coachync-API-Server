import {v4 as uuidv4} from "uuid";

// Create User

export const createUser = ({ username = "", socketId = null } = {}) => ({
  id: uuidv4(),
  username: username,
  socketId: socketId,
});

// Create Message

export const createMessage = ({ message = "", sender = "" } = {}) => ({
  id: uuidv4(),
  time: getTime(new Date(Date.now())),
  message: message,
  sender: sender,
});

// Create Chat

export const createChat = ({
  messages = [],
  name = "Community",
  users = [],
  isCommunity = false,
} = {}) => ({
  id: uuidv4(),
  name: isCommunity ? "Community" : createChatNameFromUsers(users),
  messages: messages,
  users: users,
  typingUsers: [],
  isCommunity: isCommunity,
});

// Get and return date in 24hr time i.e. '11:30', '19:30'

const getTime = (date) => {
  return `${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`;
};
