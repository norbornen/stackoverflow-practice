import 'reflect-metadata';
import * as dotenv from 'dotenv';
import {
  createConnection,
  Entity,
  getRepository,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
  JoinTable
} from 'typeorm';

@Entity()
class User1 extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToMany(() => Game1, (game) => game.players, { cascade: true })
  @JoinTable()
  games?: Game1[];
}

@Entity()
class Game1 extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToMany(() => User1, (user) => user.games)
  players?: User1[];
}

(async () => {
  dotenv.config();

  const connection = await createConnection({
    type: 'postgres',
    username: process.env.POSTGRES_LOCAL_DBUSER,
    database: 'test',
    synchronize: true,
    logging: true,
    entities: [
      User1, Game1
    ]
  });

  try {
    const game1 = await getRepository(Game1).save({});
    const user = await getRepository(User1).save({ games: [game1] });

    const game2 = await getRepository(Game1).save({});
    user.games = [ ...user.games, game2 ];
    await getRepository(User1).save(user);

    const game3 = await getRepository(Game1).save({});
    await getRepository(User1)
      .createQueryBuilder()
      .relation(User1, 'games')
      .of(user)
      .add([ game3 ]);

    const item = await getRepository(User1).findOne(user.id, { relations: ['games']});
    console.log(item);
    
  } catch (err) {
    console.error(err);
  }

  await connection.close();

})();
