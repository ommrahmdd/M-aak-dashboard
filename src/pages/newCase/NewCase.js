import React from "react";
import { useFormik } from "formik";
import "./newCase.css";
export default function NewCase() {
  let formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      description: "",
      debt: 1,
    },
  });
  return (
    <div className="row newCase" dir="rtl">
      <div className="col-md-6 d-flex flex-column align-items-center newCase__right">
        <h3>إضافة حالة جديدة</h3>
        <form className="mt-5">
          <div className="mb-5 newCase__right-box">
            <label>اسم الحالة</label>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </div>
          <div className="mb-5 newCase__right-box">
            <label>العنوان</label>
            <input
              type="text"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
            />
          </div>
          <div className="mb-5 newCase__right-box">
            <label>وصف الحالة</label>
            <textarea
              type="text"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
          </div>
          <div className="mb-5 newCase__right-box">
            <label>الدين</label>
            <input
              type="number"
              min={1}
              name="debt"
              value={formik.values.debt}
              onChange={formik.handleChange}
              className="w-50"
            />
          </div>
        </form>
      </div>
      <div className="col-md-6 newCase__left">
        <img src={require("./../../assest/newCase.png")} className="w-100" />
      </div>
    </div>
  );
}
