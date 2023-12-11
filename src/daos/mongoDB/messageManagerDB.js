import { messaggeModel } from "../../dao/models/message.model.js";

class MessagesManager {
    async findAll() {
        const result = await messaggeModel.find().lean();
        return result;
    }

    async createOne(obj) {
        const result = await messaggeModel.create(obj);
        return result;
    }  
}

export const messagesManager = new MessagesManager();