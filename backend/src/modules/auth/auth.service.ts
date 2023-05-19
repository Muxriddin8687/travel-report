import { Injectable } from '@nestjs/common';
import { Connection } from 'mysql2';
import { InjectClient } from 'nest-mysql';

@Injectable()
export class AuthService {
    constructor(@InjectClient() private readonly con: Connection) { }


    async login(userInfo) {
        const data = await this.con.query('SELECT * FROM `user` WHERE login=? AND password=?', [userInfo.login, userInfo.password]);

        if (data[0].length == 1)
            return data[0];
        else
            return false; 
    }

    async register(userInfo) {
        let sql = 'INSERT INTO `user`(`login`, `password`, `name`, `phone`, `address`) VALUES (?, ?, ?, ?, ?)';
        const data = await this.con.query(sql, [userInfo.login, userInfo.password, userInfo.name, userInfo.phone, userInfo.address]);

        return data[0];
    }
}

