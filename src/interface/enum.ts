export enum UserRole {
  ADMIN = 'admin',
  MARKETING = 'marketing',
  AGENT = 'agent',
  USER = 'user',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BANNED = 'banned',
  BLOCKED = 'blocked'
}

export enum DeviceType {
  MOBILE = 'mobile',
  DESKTOP = 'desktop',
  TABLET = 'tablet',
}

export enum PaymentStatus {
  PENDING = 'pending',
  ERROR = 'error', 
  SUCCESS = 'success',
  REJECTED = 'reject',
  PROCESSING = 'processing',
} 

export enum Type {
  LAST_LOGIN_IP= "LAST_LOGIN_IP", 
  REGISTER_IP = "REGISTER_IP",
}

export enum DepositType {
  F1_FIRST_DEPOSIT = 'F1_FIRST_DEPOSIT',
  BET_REFUND = 'BET_REFUND',
  EVENT_BONUS = 'EVENT_BONUS',
  FIRST_DEPOSIT_BONUS = 'FIRST_DEPOSIT_BONUS',
  ACTIVITY_BONUS = 'ACTIVITY_BONUS',
  DAILY_QUEST_COMPLETION_REWARDS = 'DAILY_QUEST_COMPLETION_REWARDS',
  TELEGRAM_EVENT_REWARDS = 'TELEGRAM_EVENT_REWARDS',
  DEPOSIT_COMMISSION_AGENCY = 'DEPOSIT_COMMISSION_AGENCY'
}

export enum DepositTypeTitles {
  F1_FIRST_DEPOSIT = 'Thưởng F1 nạp đầu',
  BET_REFUND = 'Hoàn cược',
  EVENT_BONUS = 'Thưởng sự kiện',
  FIRST_DEPOSIT_BONUS = 'Thưởng nạp đầu',
  ACTIVITY_BONUS = 'Thưởng hoạt động',
  DAILY_QUEST_COMPLETION_REWARDS = 'Thưởng hàng ngày',
  TELEGRAM_EVENT_REWARDS = 'Thưởng sự kiện telegram',
  DEPOSIT_COMMISSION_AGENCY = 'Thưởng thành viên cấp dưới nạp đầu'
};

export enum BalanceFlowType {
  // COMMISSIONS = 'COMMISSIONS',
  // REWARD_WINGO = 'REWARD_WINGO',
  // REWARD_K3 = 'REWARD_K3',
  // REWARD_5D = 'REWARD_5D',
  // REWARD_WINGO_TRX = 'REWARD_WINGO_TRX',
  F1_FIRST_DEPOSIT = 'F1_FIRST_DEPOSIT',
  // BET_REFUND = 'BET_REFUND',
  EVENT_BONUS = 'EVENT_BONUS',
  FIRST_DEPOSIT_BONUS = 'FIRST_DEPOSIT_BONUS',
  // ACTIVITY_BONUS = 'ACTIVITY_BONUS'
}

export enum BalanceFlowTitles {
  // COMMISSIONS = 'Hoa hồng',
  // REWARD_WINGO = 'Thắng cược game Wingo',
  // REWARD_K3 = 'Thắng cược game K3',
  // REWARD_5D = 'Thắng cược game 5D',
  // REWARD_WINGO_TRX = 'Thắng cược game Trx',
  F1_FIRST_DEPOSIT = 'Thưởng F1 nạp đầu',
  // BET_REFUND = 'Hoàn cược',
  EVENT_BONUS = 'Thưởng sự kiện',
  FIRST_DEPOSIT_BONUS = 'Thưởng nạp đầu',
  // ACTIVITY_BONUS = 'Thưởng hoạt động'
};

export const revenueTypes = [
  'ONLINE_CASHIN',
  'USER_MAMAGER_EDIT_BALANCE_RECORDED_REVENUE'
];

export const costTypes = [
  'ONLINE_CASHOUT', 'REWARD_WINGO', 'REWARD_K3', 'REWARD_5D',
  'REWARD_WINGO_TRX', 'COMMISSIONS', 'DEPOSIT_COMMISSION_USER',
  'DEPOSIT_COMMISSION_AGENCY', 'F1_FIRST_DEPOSIT', 'BET_REFUND',
  'EVENT_BONUS', 'FIRST_DEPOSIT_BONUS', 'ACTIVITY_BONUS',
  'DAILY_QUEST_COMPLETION_REWARDS',
  'TELEGRAM_EVENT_REWARDS',
  'USER_MAMAGER_EDIT_BALANCE_RECORD_EXPENSE'
];


