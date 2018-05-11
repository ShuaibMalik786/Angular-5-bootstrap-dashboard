export class User {
  id: number;
  name: string;
  username: string;
  email: string;
  mobile: string;
  profile_picture_url: string;
  active: boolean;
  email_confirmed: boolean;
  mobile_confirmed: boolean;
  last_known_ip?: string;
  last_login_at?: string;
  roles?: {
    data?: Array<{ id: number, slug: string, name: string }>
  };
}
