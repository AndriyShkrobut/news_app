import { createParamDecorator } from '@nestjs/common';

import { User } from 'src/users/interfaces/user.interface';

export const GetUser = createParamDecorator(
    (_, req): User => {
        return req.user;
    },
);
