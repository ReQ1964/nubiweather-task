import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as zod from 'zod';

const LoginSchema = zod.object({
  username: zod.string().min(3),
  email: zod.string().email(),
  password: zod.string().min(8),
});

interface LoginInputs {
  username: string;
  email: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({ resolver: zodResolver(LoginSchema) });

  const onSubmit: SubmitHandler<LoginInputs> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <input type="text" placeholder="username" {...register('username')} />
      {errors.username && <p>Username is required</p>}
      <input type="text" placeholder="email" {...register('email')} />
      {errors.email && <p>Email is required</p>}
      <input type="password" placeholder="password" {...register('password')} />
      {errors.password && <p>Password is required</p>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginPage;
