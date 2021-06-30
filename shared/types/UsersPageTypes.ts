export interface UsersPageData {
  users: UsersPageUser[];
}

export interface UsersPageUser {
  email: string;
  username: string;
  userId: number;
  permissions: string[];
}