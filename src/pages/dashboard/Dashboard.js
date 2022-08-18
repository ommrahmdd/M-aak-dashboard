import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { logout } from "../../firebase/admin";
import { useLocation } from "react-router-dom";
import "./dashboard.css";
export default function Dashboard() {
  let history = useHistory();
  let location = useLocation();
  let adminId = new URLSearchParams(location.search).get("aid");
  let handleLogOut = () => {
    logout().then((data) => {
      if (data == true) {
        history.push("/");
      }
    });
  };
  return (
    <div className="row justify-content-center dashboard" dir="rtl">
      <div className="col-md-6 d-flex flex-column align-items-center dashboard__right">
        <h3>لوحة التحكم</h3>
        <div className="d-flex flex-column">
          <button
            className="customBtn sBtn"
            onClick={() => history.push(`/dashboard/case?aid=${adminId}`)}
          >
            إضافة حالة
          </button>
          <button className="customBtn sBtn">الحالات الحالية</button>
          <button className="customBtn sBtn">المستخدمين</button>
          <button className="customBtn sBtn" onClick={handleLogOut}>
            تسجيل الخروج
          </button>
        </div>
      </div>
      <div className="col-md-6 dashboard__left">
        <img src={require("./../../assest/dashboard.png")} className="w-100" />
      </div>
    </div>
  );
}
