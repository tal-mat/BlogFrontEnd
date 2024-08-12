import React from 'react';
import {AdminControlPanel} from "../components/AdminControlPanel";
import Admin from "../functions/Admin";


const AdminControlPanelPage = () => {
    // Renders the PostForm component and passes down the onPostSubmit function.
    return (
        <div>
            <Admin component={AdminControlPanel} />
        </div>
    );
};

export default AdminControlPanelPage;