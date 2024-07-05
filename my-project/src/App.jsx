import { useState } from 'react'
import './App.css'

function App() {
  const [shortUrlId, setShortUrlId] = useState('');
  const [longUrl, setLongUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setShortUrlId('');

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ url: longUrl });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    try {
      const response = await fetch('https://10s.vercel.app/', requestOptions);

      if (!response.ok) {
        throw new Error('Failed to shorten URL');
      }

      const data = await response.json();
      setShortUrlId(data.id);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <section>
        <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
          <div className="bg-blue-50 p-8 text-center sm:p-10 md:p-16">
            <h2 className="mb-4 text-3xl font-bold md:text-5xl">URL Shortener</h2>
            <p className="mx-auto mb-6 max-w-2xl text-[#647084] md:mb-10">
              Enter a long URL to shorten it.
            </p>
            <form 
              name="url-form"  
              className="relative mx-auto mb-4 flex w-full max-w-2xl flex-col items-start justify-center sm:flex-row"
              onSubmit={handleSubmit}
            >
              <input
                type="url"
                name="url"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                className="mb-3 mr-6 block h-12 w-full bg-white px-6 py-7 text-sm text-[#333333] focus:border-[#3898ec]"
                placeholder="Enter your Long URL"
                required
              />
              <button 
                type="submit"  
                className="w-full cursor-pointer bg-[#276ef1] px-6 py-3 font-semibold text-white transition [box-shadow:rgb(171,_196,_245)_-8px_8px] hover:[box-shadow:rgb(171,_196,_245)_0px_0px] sm:w-auto"
              >
                Get the Short URL
              </button>
            </form>
            {error && <p className="text-red-500">{error}</p>}
            {shortUrlId && (
               <div className="mt-4 p-4 bg-white border border-gray-300 rounded-lg">
               <p className="mb-2 text-lg font-medium text-gray-700">
                 Short URL: <a href={`https://10s.vercel.app/${shortUrlId}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{`https://10s.vercel.app/${shortUrlId}`}</a>
               </p>
               <button 
                 onClick={() => navigator.clipboard.writeText(`https://10s.vercel.app/${shortUrlId}`)} 
                 className="mt-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
               >
                 Copy the short URL
               </button>
             </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default App
