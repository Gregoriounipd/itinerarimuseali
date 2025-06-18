import Head from 'next/head';

export default function info() {
    return (
        <>
            <Head>
                <title> Cos&apos;é questo sito? </title>
            </Head>
            <main className="max-w-3x1 mx-auto p-6">
                <h1 className="text-4x1 font-bold mb-4 text-gray-900">Cos&apos;è questo sito?</h1>
                <p className="text-lg text-gray-700 leading-relaxed">
                    QUalcosa di scritto, some random things


                </p>
                <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                    Ma che fai bro...
                </p>
            </main>
        </>
    );
}