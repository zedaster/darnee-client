class StorageService {
    static #localStorageKey = 'chatData';

    constructor() {
        if (!localStorage.getItem(StorageService.#localStorageKey)) {
            localStorage.setItem(StorageService.#localStorageKey, JSON.stringify({}));
        }
    }

    setChatData(chatId, userId, token, refreshToken) {
        if (typeof chatId !== "string" || typeof userId !== "string" || typeof token !== "string" || typeof refreshToken !== "string") {
            throw Error('setChatData arguments must be strings')
        }
        let tokens = JSON.parse(localStorage.getItem(StorageService.#localStorageKey));
        tokens[chatId] = {userId: userId, token: token, refreshToken: refreshToken};
        localStorage.setItem(StorageService.#localStorageKey, JSON.stringify(tokens));
    }

    getChatData(chatId) {
        const tokens = JSON.parse(localStorage.getItem(StorageService.#localStorageKey));
        if (!tokens[chatId]) {
            return null;
        }
        return tokens[chatId];
    }

    deleteChatData(chatId) {
        const tokens = JSON.parse(localStorage.getItem(StorageService.#localStorageKey));
        delete tokens[chatId];
        localStorage.setItem(StorageService.#localStorageKey, JSON.stringify(tokens));
    }
}

const singleton = new StorageService();
export default singleton;