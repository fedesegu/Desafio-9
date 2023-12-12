import { messageModel } from "../../dao/models/message.model.js";

class MessagesManager {
    async findAll() {
        const result = await messageModel.find().lean();
        return result;
    }

    async createOne(obj) {
        const result = await messageModel.create(obj);
        return result;
    }  
}

export const messagesManager = new MessagesManager();