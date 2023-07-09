import restClient from '@http/client';
import { UserInfo } from '@app-types/user.types'

class UsersService {
    static async getUserInfo(user_id: number): Promise<UserInfo> {
      const result = await restClient.get<UserInfo>(`/users/${user_id}`);
  
      return result.data;
    }
}

export default UsersService;