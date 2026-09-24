import { axiosInstance } from "./axiosInstance";

class CharactersService {

    async listarPersonagens() {
        const response = await axiosInstance.get("/character");
        return response.data;
    }
}

export default new CharactersService();