import {Schema,Document} from 'mongoose';
import { genSalt, hash } from 'bcrypt';

export const UserSchema = new Schema<User>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  rooms: { type: [], required: false },
});

UserSchema.pre<User>('save', function (next: Function) {
  const user = this;
  if (user.password) {
    genSalt(10, function (err, salt) {
      if (err) return next(err);

      hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  }
});

export interface User extends Document {
  id?: string;
  username: string;
  email: string;
  password: string;
  rooms:[];
}
