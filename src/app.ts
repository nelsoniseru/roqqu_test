import express from 'express';
 import { UserRepositoryImpl } from './adapters/repositories/user-repository-impl';
 import { UserService } from './application/services/user.service';
 import { UserController } from './adapters/controllers/user.controller';
 import { createUserRouter } from './adapters/route/user.route';


 import { AddressRepositoryImpl } from './adapters/repositories/address-repositoy-impl';
 import { AddressService } from './application/services/address.service';
 import { AddressController } from './adapters/controllers/address.controller';
 import { createAddressRouter } from './adapters/route/address.route';


 import { PostRepositoryImpl } from './adapters/repositories/post-repository-impl';
 import { PostService } from './application/services/post.service';
 import { PostController } from './adapters/controllers/post.controller';
 import { createPostRouter } from './adapters/route/post.route';

export const createApp = () => {
  const app = express();
  app.use(express.json());


   const userRepository = new UserRepositoryImpl();
   const userService = new UserService(userRepository);
   const userController = new UserController(userService);
   const userRouter = createUserRouter(userController);

   const addressRepository = new AddressRepositoryImpl();
   const addressService = new AddressService(addressRepository);
   const addressController = new AddressController(addressService);
   const addressRouter = createAddressRouter( addressController);

   const postRepository = new PostRepositoryImpl();
   const postService = new PostService(postRepository);
   const postController = new PostController(postService);
   const postRouter = createPostRouter(postController);

   app.use('/users', userRouter);
   app.use('/address', addressRouter);
   app.use('/post', postRouter);



  return app;
};
