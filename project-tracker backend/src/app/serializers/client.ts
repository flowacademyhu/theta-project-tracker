import {Client} from "../models/client";

export interface ClientSerializer {
    name: string,
    description: string
}

export const show = (client: Client): ClientSerializer => {
    return {
        name: client.name,
        description: client.description
    }
};

export const index = (clients: Array<Client>): Array<ClientSerializer> => {
    return clients.map((client: Client) => show(client));
} 