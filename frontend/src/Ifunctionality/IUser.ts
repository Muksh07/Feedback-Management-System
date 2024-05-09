export interface IUser 
{
  name: string;
  email: string;
  password: string;
  gender: string;
  phoneNumber: number|null;
  role?: string; // Optional property (default: 'user')
  status?: string; 
}
