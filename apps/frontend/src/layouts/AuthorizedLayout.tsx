import { Outlet } from 'react-router-dom';

const AuthorizedLayout = () => {
  return (
    <main className="flex h-full max-w-5xl items-center justify-center bg-gradient-to-br from-cyan-950 to-cyan-900 p-12 lg:h-[776px] lg:w-[1024px] lg:rounded-3xl lg:align-middle xl:w-[1150px] xl:max-w-6xl">
      <Outlet />
    </main>
  );
};

export default AuthorizedLayout;
