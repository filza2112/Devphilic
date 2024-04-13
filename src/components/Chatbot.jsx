import {useState} from 'react'

function Chatbot(){
    const [error, setError] = useState("");
    const [value , setValue] = setState("");
    const getResponse = async () => {
        if(!value){
            setError("Error! Please ask a question!")
            return
        }
        try{
            const options ={
                method: 'POST',
                body: JSON.stringify({
                    history:chatHistory,
                    message: value
                }),
                headers : {
                    'Content-Type' : 'application/json'
                }
            }
            const response = await fetch('http://localhost:5000/gemini', options)
            const data =await response.text()
            console.log(data)
            setChatHistory(oldChatHistory => [...oldChatHistory, {
                role: "user",
                parts: value
            },
            {
                role: "model",
                part: data
            }
        ])
        setValue("")
        }
        catch (error) {
            console.error(error);
            setError("Things are not looking good. Please try again later!")
        }

    }
    const clear = () => {
        setValue("")
        setError("")
        setChatHistory([])
    }
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
                {chatHistory.map((chatItem, _index) => <div key={_index}>
                    <p className='answer'>
                    {chatItem.role} : {chatItem.parts}
                    </p>
                </div>)}

            </div>
            </section>

    )
}

export default Chatbot;