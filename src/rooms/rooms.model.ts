import * as mongoose from 'mongoose';
import { User, UserSchema } from '../users/users.model';

const MessageSchema = new mongoose.Schema({
  message: { type: mongoose.Schema.Types.Mixed, required: true },
  owner: { type: UserSchema, required: true },
});

export const RoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  users: { type: [UserSchema], required: false },
  messages: { type: [MessageSchema], required: false },
});

interface Message {
  message: any;
  owner: string;
}


export interface Room extends mongoose.Document {
  id: string;
  name: string;
  users?: User[];
  messages?: Message[];
}
