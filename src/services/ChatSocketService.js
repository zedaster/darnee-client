import {io} from "socket.io-client";
import StorageService from "./StorageService";
import AuthService from "./AuthService";

export default class ChatSocketService {
    #onConnectSuccess;
    #onConnectError;
    #onReceiveMessage;
    #socket;

    constructor(chatId, onConnectSuccess, onConnectError, onReceiveMessage) {
        this.chatId = chatId;
        this.userId = null;
        this.#onConnectSuccess = onConnectSuccess;
        this.#onConnectError = onConnectError;
        this.#onReceiveMessage = onReceiveMessage;
        this.#connect()
    }

    #connect(attemp = 1) {
        const chatId = this.chatId;
        const chatData = StorageService.getChatData(chatId);
        if (!chatData) {
            this.#onConnectError(new Error('no_token'));
            return;
        }
        this.#socket = io.connect(process.env.REACT_APP_CHAT_SOCKET_URL, {
            auth: {token: chatData.token},
            path: process.env.REACT_APP_CHAT_SOCKET_PATH,
            transports: ['websocket']
        });
        this.#socket.on('connect_error', async (error) => {            if (error.message === "Invalid token" && attemp === 1) {
                try {
                    await AuthService.updateToken(chatData.refreshToken);
                } catch (error) {
                    this.#onConnectError(new Error('no_token'));
                    return;
                }
                this.#socket.disconnect();
                this.#connect(attemp + 1);
            } else {
                this.#onConnectError(error);
            }
        })
        this.#socket.on('connection_success', (...args) => {
            this.userId = StorageService.getChatData(this.chatId).userId;
            console.log('Chat data: ' + JSON.stringify(StorageService.getChatData(this.chatId)))
            console.log('User id from chatData: ' + this.userId)
            this.#onConnectSuccess(...args)
        });
        this.#socket.on('receive_message', this.#onReceiveMessage);
    }

    sendMessage(message) {
        this.#socket.emit('send_message', message);
    }

    disconnect() {
        if (this.#socket) this.#socket.disconnect();
    }
}