import { Injectable } from '@nestjs/common';
import { Connection } from 'mysql2';
import { InjectClient } from 'nest-mysql';
import { ActionItemModel } from '../action/action.model';

@Injectable()
export class ActionItemService {
    constructor(@InjectClient() private readonly con: Connection) { }


    async create(data: ActionItemModel[], user_id: number) {
        let sql = 'INSERT `action_item`(`action_id`, `service_id`, `comment`, `price`, `user_id`) VALUES ';

        data.forEach(item => {
            sql += `('${item.action_id}', '${item.service_id}', '${item.comment}', '${item.price}', '${user_id}'),`;
        });

        sql = sql.slice(0, -1);

        return this.con.query(sql);
    }


    async findAll(user_id: number) {
        const data = await this.con.query('SELECT * FROM `action_item` WHERE `user_id`=?', user_id);
        return data[0];
    }


    async findOne(id: number) {
        const data = await this.con.query('SELECT * FROM `action_item` WHERE id=?', id);
        return data[0];
    }


    async update(data: ActionItemModel[]) {
        let sql = '';

        data.forEach((item: any) => {
            sql += `UPDATE action_item AS a SET a.service_id='${item.service_id}', a.comment='${item.comment}', a.price='${item.price}' WHERE id='${item.id}';`;
        });

        return await this.con.query(sql);
    }


    async remove(id: number) {
        return await this.con.query('DELETE FROM `action_item` WHERE `id`=?', id);
    }
}
