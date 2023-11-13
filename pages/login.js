import { getProviders, signIn } from "next-auth/react";
import Head from "next/head";
function Login({ providers }) {
  return (
    <div>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col bg-black min-h-screen w-full items-center justify-center">
        <div>
          <img
            className="w-52 mb-5"
            src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
            alt="spotify-logo"
          />
        </div>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              className="bg-login-btn-color font-bold text-white p-3 rounded-lg hover:bg-green-500"
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            >
              登入 {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
