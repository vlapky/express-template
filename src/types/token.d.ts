import { rolesType } from '../routes/roles/roles.utils';

export interface UserToken {
  id: string;
  role: rolesType;
}
