/**
    * @description      : 
    * @author           : Saif
    * @group            : 
    * @created          : 04/11/2024 - 21:20:25
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 04/11/2024
    * - Author          : Saif
    * - Modification    : 
**/
import { Route, Routes, BrowserRouter } from "react-router-dom";

import AdminLogin from "../Screens/Auth/Login";
import ForgetPassword from "../Screens/Auth/ForgetPassword";
import ForgetPassword2 from "../Screens/Auth/ForgetPassword2";
import ForgetPassword3 from "../Screens/Auth/ForgetPassword3";
import { Dashboard } from "../Screens/Dashboard";
import { UserManagement } from "../Screens/UserManagement";
import { AddUser } from "../Screens/UserManagement/AddUser";
import { EditUser } from "../Screens/UserManagement/EditUser";
import { UserDetails } from "../Screens/UserManagement/UserDetail";
import { CategotyManagement } from "../Screens/CategoryManagement";
import { TagManagement } from "../Screens/TagManagement";
import { CustomerSupport } from "../Screens/CustomerSupport";
import { AddMessage } from "../Screens/CustomerSupport/AddMessage";
import { EditMessage } from "../Screens/CustomerSupport/EditMessage";
import { MessageDetail } from "../Screens/CustomerSupport/MessageDetail";
import { NotificationManagement } from "../Screens/NotificationManagement";
import { AddNotification } from "../Screens/NotificationManagement/AddNotification";
import { EditNotification } from "../Screens/NotificationManagement/EditNotification";
import { NotificationDetail } from "../Screens/NotificationManagement/NotificationDetail";
// end



import Profile from "../Screens/Profile";
import EditProfile from "../Screens/Profile/EditProfile";
import ChangePassword from "../Screens/Profile/ChangePassword";
import { ProtectedRoutes } from "./ProtectedRoutes";
import Error from "../Screens/Error";


export default function AdminRouter() {
  return (
    <BrowserRouter basename="/admin">
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/forget-password2" element={<ForgetPassword2 />} />
        <Route path="/forget-password3" element={<ForgetPassword3 />} />

        <Route path="/dashboard" element={<ProtectedRoutes Components={Dashboard} />} />
        <Route path="/user-management" element={<ProtectedRoutes Components={UserManagement} />} />
        <Route path="/add-user" element={<ProtectedRoutes Components={AddUser} />} />
        <Route path="/edit-user" element={<ProtectedRoutes Components={EditUser} />} />
        <Route path="/user-management/user-details/:id" element={<ProtectedRoutes Components={UserDetails} />} />
        <Route path="/customer-support" element={<ProtectedRoutes Components={CustomerSupport} />} />
        <Route path="/add-message" element={<ProtectedRoutes Components={AddMessage} />} />
        <Route path="/edit-message" element={<ProtectedRoutes Components={EditMessage} />} />
        <Route path="/customer-support/message-details/:id" element={<ProtectedRoutes Components={MessageDetail} />} />

        <Route path="/notification-management" element={<ProtectedRoutes Components={NotificationManagement} />} />
        <Route path="/add-notification" element={<ProtectedRoutes Components={AddNotification} />} />
        <Route path="/edit-notification" element={<ProtectedRoutes Components={EditNotification} />} />
        <Route path="/notification-management/message-details/:id" element={<ProtectedRoutes Components={NotificationDetail} />} />

        <Route path="/category-management" element={<ProtectedRoutes Components={CategotyManagement} />} />
        <Route path="/tag-management" element={<ProtectedRoutes Components={TagManagement} />} />

        <Route path="/profile" element={<ProtectedRoutes Components={Profile} />} />
        <Route path="/profile/edit-profile" element={<ProtectedRoutes Components={EditProfile} />} />
        <Route path="/profile/change-password" element={<ChangePassword />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
