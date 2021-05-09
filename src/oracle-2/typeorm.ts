import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { createConnection, Entity, Column, PrimaryColumn, getRepository, MoreThan, JoinColumn, ManyToOne, LessThan } from 'typeorm';

@Entity('DEPARTMENTS')
class Department {
  @PrimaryColumn('number')
  DEPARTMENT_ID: number;

  @Column('varchar', {length: 30})
  DEPARTMENT_NAME: string;

  @Column('number')
  MANAGER_ID: number;

  @Column('number')
  LOCATION_ID: number;

  @ManyToOne((type) => Employee)
  @JoinColumn({ name: 'MANAGER_ID' })
  MANAGER: Employee;
}

@Entity('EMPLOYEES')
class Employee {
  @PrimaryColumn('number')
  EMPLOYEE_ID: number;

  @Column('varchar', {length: 20})
  FIRST_NAME: string;

  @Column('varchar', {length: 25})
  LAST_NAME: string;
}


(async () => {
  dotenv.config();

  const connection = await createConnection({
    type: 'oracle',
    username: process.env.ORACLE_DB_USER,
    password: process.env.ORACLE_DB_PASSWORD,
    schema: 'HR',
    synchronize: false,
    logging: true,
    extra: {
      connectString: process.env.ORACLE_DB_CONNECT_STRING
    },
    entities: [
      Department, Employee
    ]
  });

  try {
    let items = await getRepository(Department).find({
      where: {
        DEPARTMENT_ID: LessThan(100)
      },
      relations: [ 'MANAGER' ],
      take: 2
    });
    console.log(items);

    const qb = getRepository(Department).createQueryBuilder('d');
    qb.innerJoinAndMapOne(`${qb.alias}.MANAGER`, Employee, 'e', 'd.MANAGER_ID = e.EMPLOYEE_ID')
      .limit(2);
    items = await qb.getMany();
    console.log(items);
    
  } catch (err) {
    console.error(err);
  }

  await connection.close();

})();
