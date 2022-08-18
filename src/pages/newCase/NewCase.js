import React from "react";
import { useFormik } from "formik";
import { useLocation } from "react-router-dom";
import "./newCase.css";
import { addNewCase } from "../../firebase/cases";
import toast, { Toaster } from "react-hot-toast";
export default function NewCase() {
  let location = useLocation();
  let adminId = new URLSearchParams(location.search).get("aid");
  let validate = (values) => {
    let errors = {};
    if (!values.name) errors.name = "يرجي ادخال اسم الحالة";
    if (!values.address) errors.address = "يرجي ادخال عنوان الحالة";
    if (!values.description) errors.description = "يرجي ادخال وصف الحالة";
    if (!values.debt) errors.debt = "يرجي ادخال المبلغ الخاص بالحالة";
    if (!values.natinalID)
      errors.natinalID = "يرجي ادخال الرقم القومي للحالة / العائل";
    if (isNaN(values.natinalID) || values.natinalID.length != 14)
      errors.natinalID = "برجاء ادخال الرقم القومي بشكل صحيح";
    return errors;
  };
  let formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      description: "",
      debt: 1,
      natinalID: "",
    },
    validate,
    onSubmit: async (values) => {
      // toast.success("من فضلك انتظر", {
      //   style: {
      //     fontSize: "1.6rem",
      //   },
      // });
      // let promiseResult = await addNewCase({ ...values, adminId });
      toast.promise(
        addNewCase({ ...values, adminId }),
        {
          loading: "من فضلك انتظر",
          success: (data) => {
            formik.resetForm();
            return `تمت اضافة الحالة بنجاح`;
          },
          error: (err) => `حدث خطأ برجاء المحاولة مره اخري `,
        },
        {
          style: {
            minWidth: "250px",
            fontSize: "2rem",
          },
          success: {
            duration: 2000,
            icon: "👏",
          },
        }
      );
    },
  });
  return (
    <div className="row newCase" dir="rtl">
      <div className="col-md-6 order-md-0 order-1 d-flex flex-column align-items-center newCase__right">
        <h3>إضافة حالة جديدة</h3>
        <form
          className="mt-5"
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
        >
          <div className="mb-5 newCase__right-box">
            <label>اسم الحالة</label>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <small className="fs-4 text-danger mt-2 d-block">
              {formik.errors.name && formik.errors.name}
            </small>
          </div>
          <div className="mb-5 newCase__right-box">
            <label>العنوان</label>
            <input
              type="text"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
            />
            <small className="fs-4 text-danger mt-2 d-block">
              {formik.errors.address && formik.errors.address}
            </small>
          </div>
          <div className="mb-5 newCase__right-box">
            <label>الرقم القومي للحالة / العائل</label>
            <input
              type="phone"
              name="natinalID"
              value={formik.values.natinalID}
              onChange={formik.handleChange}
            />
            <small className="fs-4 text-danger mt-2 d-block">
              {formik.errors.natinalID && formik.errors.natinalID}
            </small>
          </div>
          <div className="mb-5 newCase__right-box">
            <label>وصف الحالة</label>
            <textarea
              type="text"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            <small className="fs-4 text-danger mt-2 d-block">
              {formik.errors.description && formik.errors.description}
            </small>
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
            <small className="fs-4 text-danger mt-2 d-block">
              {formik.errors.debt && formik.errors.debt}
            </small>
          </div>
          <button
            type="submit"
            className="customBtn primaryBtn"
            disabled={!formik.isValid}
          >
            إضافة
          </button>
          <Toaster />
        </form>
      </div>
      <div className="col-md-6 order-md-1 order-0 newCase__left">
        <img src={require("./../../assest/newCase.png")} className="w-100" />
      </div>
    </div>
  );
}
