import React, {useState} from 'react';
import Client from '../components/Client';
// import Editor from '../components/Editor';

const EditorPage = () => {
    const [clients, setClients] = useState([
        { socketId: 1, username: 'Filza'},
        { socketId: 2, username: 'Sania'},

    ]);
    return (
        <div className ="mainWrap">
            <div className="aside">
                <div className="asideInner">
                <div className="logo">
                        <img
                            className="logoImage"
                            src={require("../assets/icom.png")}
                        />
                    </div>
                    <h3>Connected</h3>
                    <div className="clientsList">
                        {clients.map((client) => (
                            <Client
                                key={client.socketId}
                                username={client.username}
                            />
                        ))}
                    </div>
                </div>
                <button className="btn copyBtn">Copy ROOM ID</button>
                <button className="btn leaveBtn">Leave Room</button>
            </div>
            <div className="editorwrap">
                <Editor />
            </div>
        </div>
    
    )
}

export default EditorPage;