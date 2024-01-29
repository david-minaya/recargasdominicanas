import { Entity, PrimaryGeneratedColumn, BaseEntity, OneToMany, OneToOne, ManyToOne } from 'typeorm';
import { NotificationToken } from './notificationToken.entity';
import { AccessToken } from './accessToken.entity';
import { Balance } from './balance.entity';
import { BankAccount } from './bankAccount.entity';
import { Deposit } from './deposit.entity';
import { Profit } from './profit.entity';
import { SalesReport } from './salesReport.entity';
import { Role } from './role.entity';
import { TempPassword } from './tempPassword.entity';

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => Balance, balance => balance.user)
  balances?: Balance[];

  @OneToMany(() => Profit, profit => profit.user)
  profits?: Profit[];

  @ManyToOne(() => Role, role => role.users)
  role?: Role;

  @OneToMany(() => Deposit, deposit => deposit.user)
  deposits?: Deposit[];

  @OneToOne(() => AccessToken, accessToken => accessToken.user, { cascade: true })
  accessToken?: AccessToken;

  @OneToOne(() => TempPassword, tempPassword => tempPassword.user, { cascade: true })
  tempPassword?: TempPassword;

  @OneToMany(() => BankAccount, bankAccount => bankAccount.user)
  bankAccounts?: BankAccount[];

  @OneToMany(() => SalesReport, salesReport => salesReport.user)
  salesReports?: SalesReport[];

  @OneToMany(() => NotificationToken, notificationToken => notificationToken.user)
  notificationTokens?: NotificationToken[];
}
