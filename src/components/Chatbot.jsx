import {useState} from 'react'

function Chatbot(){
    const [error, setError] = useState("");
    return(
            <section className='app'>
            <p>What do you need assistance with?
            <botton className="surprise">Send Message</botton>
            </p>
            <div className='input-container'>
                <input 
                value={""}
                placeholder='Enter you Question'
                onChange={""}
                />
            
            {!error && <button>Ask me</button>}
            {error && <button>Clear</button>}
            </div>
            {error && <p>{error}</p>}
            <div className='search-results'>
                <div key={""}>
                    <p className='answer'>

                    </p>
                </div>

            </div>
            </section>

    )
}

export default Chatbot;