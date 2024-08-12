import React from 'react';
import { useParams } from 'react-router-dom';
import EditUser from "../components/EditUser";
import Admin from "../functions/Admin";

export default function EditUserPage() {
    const { userId } = useParams()
    console.log("EditUserPage - userID:", userId);



    return (
        <div>
            <Admin component={EditUser} userId={userId} />
        </div>
    );
}
