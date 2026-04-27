export interface Usuario {
  id: number;
  username: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: 'admin' | 'developer' | 'designer';
  location: string;
  repoIds: number[];
}