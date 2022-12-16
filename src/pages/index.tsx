import { useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useSession } from "next-auth/react";

import Header from "@components/Header";
import NavBar from "@components/NavBar";
import Playoff from "@components/Playoff";
import Group from "@components/Group";

const Home: NextPage = () => {
  const [showPlayoffs, setShowPlayoffs] = useState<boolean>(false);
  const { data: sessionData } = useSession();

  const handleChangePhase = (value: boolean) => {
    setShowPlayoffs(value);
  };

  return (
    <>
      <Head>
        <title>Tabela da Copa do Mundo</title>
        <meta name="description" content="World Cup Table" />
      </Head>

      <Header />
      <div className="mt-16 flex h-fit min-h-[calc(100vh-theme(space.16))] flex-col">
        <div className="mx-auto my-0 h-fit w-full max-w-[920px] bg-default-500 p-2 sm:my-4 sm:rounded">
          {sessionData ? (
            <>
              <NavBar onChange={handleChangePhase} show={showPlayoffs} />
              {showPlayoffs ? <Playoff /> : <Group />}
            </>
          ) : (
            <div className="flex h-[calc(100vh-theme(space.16))] w-full flex-col items-center bg-default-500 text-white sm:h-fit">
              <h1 className="text-xl font-bold sm:text-2xl">
                Tabela da Copa do Mundo Qatar 2022
              </h1>
              <div className="relative mt-6 mb-4 aspect-[328/395] w-full bg-cream-500 sm:w-1/3">
                <Image src="/images/qatar-logo.png" fill alt="logo" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
