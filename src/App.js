import 'bootstrap/dist/css/bootstrap.min.css';
// import bootstrap from 'bootstrap'
import HomePage from "./pages/home/HomePage";
import ChatPage from "./pages/chat/ChatPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NotFoundPage from "./pages/not-found/NotFoundPage";
import CreateChatPage from "./pages/create-chat/CreateChatPage";
import JoinChatPage from "./pages/join-chat/JoinChatPage";

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route index path="/" element={<HomePage/>}/>
                    <Route index path="create-chat" element={<CreateChatPage/>}/>
                    <Route index path="join/:id" element={<JoinChatPage/>}/>
                    {/*<Route index path="restore-chats" element={<RestoreChatsPage/>}/>*/}
                    <Route path="chat/:id" element={<ChatPage/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
