import React from "react";
import { getProviders, signIn as SignInWithProvider } from "next-auth/react";
import Header from "../../components/Header";

export default function signin({ providers }) {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-56 text-center px-14">
        <img
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="logo"
          layout="fill"
          className="mx-auto mt-10"
          objectFit="contain"
        />
        <p className="text-sm italic text-gray-500">
          Sign up to Firegram now, share your life with your friends.
        </p>

        <div className="mt-40">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="p-3 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700"
                onClick={() =>
                  SignInWithProvider(provider.id, { callbackUrl: "/" })
                }
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
