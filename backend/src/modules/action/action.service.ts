import { Injectable } from '@nestjs/common';
import { Connection } from 'mysql2';
import { InjectClient } from 'nest-mysql';
import { ActionModel } from './action.model';

@Injectable()
export class ActionService {

    constructor(@InjectClient() private readonly con: Connection) { }


    async create(newData: ActionModel, user_id: number) {
        let sql = 'INSERT `action`(`name`, `phone`, `address`, `travel_type_id`, `person_count`, `duration`, `user_id`) ' +
                `VALUES ('${newData.name}', '${newData.phone}', '${newData.address}', '${newData.travel_type_id}', '${newData.person_count}', '${newData.duration}', '${newData.user_id}')`;

        return this.con.query(sql);
    }


    async findAll(user_id: number) {
        const actions = await this.con.query('SELECT a.*, t.name AS travel_type_name FROM `action` AS a, `travel_type` AS t WHERE a.travel_type_id=t.id AND a.`user_id`=? ORDER BY `date` DESC', user_id);
        const action_items = await this.con.query('SELECT a.*, s.name AS service_name FROM `action_item` AS a, `service` AS s WHERE a.service_id=s.id AND a.`user_id`=?', user_id);

        let action = actions[0];
        let action_item = action_items[0]

        let newArrar: Array<any> = [];
        for (let i = 0; i < action.length; i++) {
            let data: ActionModel = {
                id: action[i]['id'],
                name: action[i]['name'],
                phone: action[i]['phone'],
                address: action[i]['address'],
                travel_type_id: action[i]['travel_type_id'],
                travel_type_name: action[i]['travel_type_name'],
                person_count: action[i]['person_count'],
                summ: action[i]['summ'],
                duration: action[i]['duration'],
                user_id: action[i]['user_id'],
                date: action[i]['date'],
                items: [],
            };
            action_item.forEach(item => {
                if (item.action_id == action[i]['id'])
                    data.items.push(item);
            });
            action_item.map(item => item.action_id != action[i]['id']);
            newArrar.push(data);
        }

        return newArrar;
    }


    async getForDashboard(user_id: number) {
        const actions = await this.con.query('SELECT a.*, t.name AS travel_type_name FROM `action` AS a, `travel_type` AS t WHERE a.travel_type_id=t.id AND a.`status`=0 AND a.`user_id`=? ORDER BY `date` DESC', user_id);
        const action_items = await this.con.query('SELECT a.*, s.name AS service_name FROM `action_item` AS a, `service` AS s WHERE a.service_id=s.id AND a.`user_id`=?', user_id);

        let action = actions[0];
        let action_item = action_items[0]

        let newArrar: Array<any> = [];
        for (let i = 0; i < action.length; i++) {
            let data: ActionModel = {
                id: action[i]['id'],
                name: action[i]['name'],
                phone: action[i]['phone'],
                address: action[i]['address'],
                travel_type_id: action[i]['travel_type_id'],
                travel_type_name: action[i]['travel_type_name'],
                person_count: action[i]['person_count'],
                summ: action[i]['summ'],
                duration: action[i]['duration'],
                user_id: action[i]['user_id'],
                date: action[i]['date'],
                items: [],
            };
            action_item.forEach(item => {
                if (item.action_id == action[i]['id'])
                    data.items.push(item);
            });
            action_item.map(item => item.action_id != action[i]['id']);
            newArrar.push(data);
        }

        return newArrar;
    }


    async findOne(id: number) {
        const actions = await this.con.query('SELECT a.*, t.name AS travel_type_name FROM `action` AS a, `travel_type` AS t WHERE a.travel_type_id=t.id AND a.`id`=? ORDER BY `date` DESC', id);
        const action_items = await this.con.query('SELECT a.*, s.name AS service_name FROM `action_item` AS a, `service` AS s WHERE a.service_id=s.id AND a.`action_id`=?', id);

        let action = actions[0];
        let action_item = action_items[0]

        let newArrar: Array<any> = [];
        for (let i = 0; i < action.length; i++) {
            let data: ActionModel = {
                id: action[i]['id'],
                name: action[i]['name'],
                phone: action[i]['phone'],
                address: action[i]['address'],
                travel_type_id: action[i]['travel_type_id'],
                travel_type_name: action[i]['travel_type_name'],
                person_count: action[i]['person_count'],
                summ: action[i]['summ'],
                duration: action[i]['duration'],
                user_id: action[i]['user_id'],
                date: action[i]['date'],
                items: [],
            };
            action_item.forEach(item => {
                data.items.push(item);
            });
            action_item.map(item => item.action_id != action[i]['id']);
            newArrar.push(data);
        }

        return newArrar;
    }


    async update(id: number, data: ActionModel) {
        return await this.con
            .query('UPDATE `action` SET `name`=?, `phone`=?, `address`=?, `travel_type_id`=?, `person_count`=?, `duration`=? WHERE id=?',
                                    [data.name, data.phone, data.address, data.travel_type_id, data.person_count, data.duration, id]);
    }


    async done(id: number) {
        return await this.con.query('UPDATE `action` SET `status`=\'1\' WHERE id=?', id);
    }


    async remove(id: number) {
        let sql = 'DELETE FROM `action_item` WHERE `action_id`=' + id;
        await this.con.query(sql);
        return await this.con.query('DELETE FROM `action` WHERE `id`=?', id);
    }
}
