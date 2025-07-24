import { mixed, number, object, ObjectSchema, string, TestContext } from 'yup';
import { UserPasswordLogin } from '~/domain/models/auth/login';
import { RecoverPassword, SendRecoverRequest } from '~/domain/models/account/RecoverPassword';
import { Optional } from '~/domain/types/steoreotype';
import { Gender } from '~/domain/models/users/user';
import { Messages } from '~/domain/types/messages';

export const LoginSchema: ObjectSchema<UserPasswordLogin> = object().shape({
  username: string().required(Messages.RequiredField),
  password: string().required(Messages.RequiredField),
});

export const RecoverSchema: ObjectSchema<RecoverPassword> = object().shape({
  token: string().required(Messages.RequiredField),
  password: string().required(Messages.RequiredField),
  repeated: string()
    .test(
      'Validate RNC',
      Messages.PasswordNotMatches,
      (value: Optional<string>, context: TestContext) => {
        return context.parent.password === value;
      }
    )
    .required(Messages.RequiredField),
});

export const SendRecoverPasswordSchema: ObjectSchema<SendRecoverRequest> = object().shape({
  username: string().required(Messages.RequiredField),
  company: string().required(Messages.RequiredField),
});

export const RegisterSchema = object().shape({
  username: string().required(Messages.RequiredField),
  password: string().required(Messages.RequiredField),
  document: string().required(Messages.RequiredField),
  email: string().email(Messages.InvalidEmail).required(Messages.RequiredField),
  roleId: number().required(Messages.RequiredField),
  userInfo: object().shape({
    firstName: string().required(Messages.RequiredField),
    lastName: string().required(Messages.RequiredField),
    gender: mixed<Gender>().oneOf(Object.values(Gender)).required(Messages.RequiredField),
    country: string().required(Messages.RequiredField),
    city: string().required(Messages.RequiredField),
    birthDate: string().required(Messages.RequiredField),
    image: string().required(Messages.RequiredField),
  }),
});
