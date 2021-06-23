import axios from "axios";
import config from "../config/config.json";
class CustomerService {
    url = 'customer';
    getAll = async () => {
        return await axios.get(config.baseAddress + this.url);
    }
    save = async (model: any) => {
        return await axios.post(config.baseAddress + this.url, model);
    }
    update = async (model: any) => {
        return await axios.put(config.baseAddress + this.url, model);
    }
    remove = async (id: any) => {
        return await axios.delete(config.baseAddress + this.url + '/' + id);
    }
}

export const useCustomerService = () => new CustomerService()