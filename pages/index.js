import Head from "next/head";
import Header from "../components/Header";
import Feed from "../components/Feed";
import Modal from "../components/Modal";

export default function Home() {
  return (
    <div className="h-screen overflow-y-scroll bg-gray-50 scrollbar-hide ">
      <Head>
        <title>Supagram!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Feed />
      {/* Header */}

      {/* Feed */}

      {/* Modal */}
      <Modal />
      {/* Modal */}
    </div>
  );
}
