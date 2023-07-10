import axios from "axios";
import TokenStorageService from "./StorageService";

class AuthService {
    static #createRoomPath = AuthService.#getPath('createRoom');
    static #joinRoomPath = AuthService.#getPath('joinRoom');
    static #restoreRoomsPath = AuthService.#getPath('restoreRooms');
    static #updateTokenPath = AuthService.#getPath('updateToken');

    async createChat(name, email) {
        const data = {username: name}
        if (email) {
            data.email = email;
        }

        const request = await axios.post(AuthService.#createRoomPath, data)
        const message = request.data.message;
        if (message !== "Room created") {
            throw new Error(message);
        }
        const token = request.data.data.token;
        const refreshToken = request.data.data.refreshToken;
        const decodedToken = AuthService.#parseJwt(token);
        const chatId = decodedToken.chat;
        const userId = decodedToken.user;

        TokenStorageService.setChatData(chatId, userId, token, refreshToken);
        return chatId;
    }

    async joinChat(name, email, inviteHash) {
        const data = {username: name, inviteHash: inviteHash}
        if (email) {
            data.email = email;
        }

        const request = await axios.post(AuthService.#joinRoomPath, data)
        const message = request.data.message;
        if (message !== "User joined") {
            throw new Error(message);
        }
        const token = request.data.data.token;
        const refreshToken = request.data.data.refreshToken;
        const decodedToken = AuthService.#parseJwt(token);
        const chatId = decodedToken.chat;
        const userId = decodedToken.user;

        TokenStorageService.setChatData(chatId, userId, token, refreshToken);
        return chatId;
    }

    async updateToken(refreshToken) {
        try {
            const data = {refreshToken: refreshToken};
            console.log(`[AuthSerivce | updateToken] data is ${JSON.stringify(data)}`)
            const request = await axios.post(AuthService.#updateTokenPath, data);

            const newToken = request.data.data.token;
            const newRefreshToken = request.data.data.refreshToken;
            const decodedToken = AuthService.#parseJwt(newToken);
            const chatId = decodedToken.chat;
            const userId = decodedToken.user;
            TokenStorageService.setChatData(chatId, userId, newToken, newRefreshToken);
        } catch (error) {
            throw error;
        }
    }

    static #getPath(subPath) {
        let path = process.env.REACT_APP_AUTH_API_URL;
        if (!path.endsWith('/')) {
            path += '/';
        }
        path += subPath;
        return path;
    }

    static #parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }
}

const singleton = new AuthService();
export default singleton;

