import { Router, request } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import ensureAuthentication from '../middlewares/ensureAuthentication';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouters = Router();
const upload = multer(uploadConfig);

usersRouters.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const createUser = new CreateUserService();
  const user = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return res.json(user);
});

usersRouters.patch(
  '/avatar',
  ensureAuthentication,
  upload.single('avatar'),
  async (req, res) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    delete user.password;

    return res.json(user);
  },
);

export default usersRouters;
