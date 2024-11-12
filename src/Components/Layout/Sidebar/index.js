/**
    * @description      : 
    * @author           : Saif
    * @group            : 
    * @created          : 04/11/2024 - 22:30:43
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 04/11/2024
    * - Author          : Saif
    * - Modification    : 
**/
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBorderAll,
  faUser,
  faPenFancy,
  faMoneyBill,
  faTableList,
  faTag,
  faYenSign,
  faHeadphonesAlt
} from "@fortawesome/free-solid-svg-icons";
import {
  faMessage,
} from "@fortawesome/free-regular-svg-icons";

import "./style.css";
import { faUsers } from "@fortawesome/free-solid-svg-icons/faUsers";

export const Sidebar = (props) => {

  const location = useLocation()
  return (
    <div className={`sidebar ${props.sideClass}`} id="sidebar">
      <ul className="list-unstyled">
        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/dashboard') ? 'active' : ''}`} to="/dashboard">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faBorderAll} />
            </span>
            <span className="sideLinkText">Dashboard</span>
          </Link>
        </li>

        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('user-management') ? 'active' : ''}`} to="/user-management">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faUsers} />
            </span>
            <span className="sideLinkText">User Management</span>
          </Link>
        </li>

        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('#') ? 'active' : ''}`} to="#">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faHeadphonesAlt} />
            </span>
            <span className="sideLinkText">Customer Management</span>
          </Link>
        </li>
        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('#') ? 'active' : ''}`} to="#">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faPenFancy} />
            </span>
            <span className="sideLinkText">Content Management</span>
          </Link>
        </li>
        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('#') ? 'active' : ''}`} to="#">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faMoneyBill} />
            </span>
            <span className="sideLinkText">Course Creation</span>
          </Link>
        </li>
        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('category-management') ? 'active' : ''}`} to="/category-management">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faYenSign} />
            </span>
            <span className="sideLinkText">Category Management</span>
          </Link>
        </li>
        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('tag-management') ? 'active' : ''}`} to="/tag-management">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faTag} />
            </span>
            <span className="sideLinkText">Tags Management</span>
          </Link>
        </li>
        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('#') ? 'active' : ''}`} to="#">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faTableList} />
            </span>
            <span className="sideLinkText">Notification Management</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};
