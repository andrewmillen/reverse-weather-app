import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Reverse Weather App</title>
        <meta
          name="description"
          content="An app that asks you for weather conditions and then tells you where they're happening."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Where is it 72° and sunny right now?</h1>
      </main>
    </>
  );
}
