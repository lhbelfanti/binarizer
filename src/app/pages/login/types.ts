import { ViewProps } from '@app-types/prop.types';
import { UserInfo } from '@app-types/user.types';

export interface LoginViewProps extends ViewProps {
    userInfo: UserInfo;
}