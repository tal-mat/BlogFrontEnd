import React from 'react';
import { UsersProvider } from "../providers/users-provider";
import {UsersDataTable} from '../components/UserManagement';
import Admin from "../functions/Admin";


const UserManagementPage = () => {


    return (
        <UsersProvider>
            <div>
                <Admin component={UsersDataTable} />
            </div>
        </UsersProvider>

    );
};

export default UserManagementPage;