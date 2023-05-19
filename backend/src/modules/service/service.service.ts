import { Injectable } from '@nestjs/common';
import { Connection } from 'mysql2';
import { InjectClient } from 'nest-mysql';

@Injectable()
export class ServiceService {
    constructor(@InjectClient() private readonly con: Connection) { }


    async create(data: any, user_id: number) {
        return this.con.query('INSERT `service`(`name`, `user_id`) VALUES (?, ?)',
                                            [data.name, user_id]);
    }


    async findAll(user_id: number) {
        const data = await this.con.query('SELECT * FROM `service` WHERE `user_id`=?', user_id);
        return data[0];
    }


    async findOne(id: number) {
        const data = await this.con.query('SELECT * FROM `service` WHERE id=?', id);
        return data[0];
    }


    async update(id: number, data: any) {
        return await this.con
            .query('UPDATE `service` SET `name`=? WHERE id=?', [data.name, id]);
    }


    async remove(id: number) {
        return await this.con.query('DELETE FROM `service` WHERE `id`=?', id);
    }
}
