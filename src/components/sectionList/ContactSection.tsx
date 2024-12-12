import Image from "next/image";
import dynamic from "next/dynamic";
import { Shape3, Contact, ArrowRight } from "@/assets/img";
import { useFormik } from "formik";
import * as Yup from "yup";
import { EnquiryFormValues } from "@/types/types";
import { submitEnquiry } from "@/apis/contactus/contactusApis";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactSection: React.FC = () => {
  const initialValues: EnquiryFormValues = {
    name: "",
    phone_no: "",
    email: "",
    message: "",
    status: "PENDING",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
    phone_no: Yup.string()
      .matches(/^[0-9]/, "Phone number is not valid")
      .required("Phone is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    message: Yup.string()
      .min(10, "Message must be at least 10 characters")
      .required("Message is required"),
  });

  const formik = useFormik<EnquiryFormValues>({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      submitEnquiry(values as EnquiryFormValues)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            toast.success("Enquiry form submitted successfully!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            formik.resetForm();
          } else {
            toast.error("Error submitting enquiry form. Please try again!", {
              position: "top-right",
              autoClose: 3000,
            });
          }
        })
        .catch((error) => {
          toast.error("Something went wrong! Please try again.", {
            position: "top-right",
            autoClose: 3000,
          });
        });
    },
  });

  return (
    <>
      <div className="contact-us py-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 p-0">
              <div className="left-block">
                <Image src={Contact} alt="contact" className="img-fluid" />
              </div>
            </div>
            <div className="col-md-6 p-0">
              <div className="right-block">
                <div className="heading mb-4">
                  <span>Contact us</span>
                  <h2 className="mb-4">
                    Let’s make something <br />
                    <strong className="position-relative">
                      awesome
                      <Image
                        src={Shape3}
                        width="230"
                        alt="shape"
                        className="shape"
                      />
                    </strong>{" "}
                    together
                  </h2>
                  <p>
                    It would be great to hear from you! Please connect with us
                    via mobile, email or we would be glad to meet you in person
                    at our office.
                  </p>
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <input
                          type="text"
                          className={`form-control ${
                            formik.touched.name && formik.errors.name
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="Name*"
                          id="name"
                          {...formik.getFieldProps("name")}
                        />
                        {formik.touched.name && formik.errors.name ? (
                          <div className="invalid-feedback">
                            {formik.errors.name}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <input
                          type="text"
                          className={`form-control ${
                            formik.touched.phone_no && formik.errors.phone_no
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="Phone Number *"
                          id="phone"
                          {...formik.getFieldProps("phone_no")}
                          onChange={(e) => {
                            const sanitizedValue = e.target.value.replace(
                              /\D/g,
                              ""
                            );
                            formik.setFieldValue("phone_no", sanitizedValue);
                          }}
                        />
                        {formik.touched.phone_no && formik.errors.phone_no ? (
                          <div className="invalid-feedback">
                            {formik.errors.phone_no}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group mb-3">
                        <input
                          type="email"
                          className={`form-control ${
                            formik.touched.email && formik.errors.email
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="Email*"
                          id="email"
                          {...formik.getFieldProps("email")}
                        />
                        {formik.touched.email && formik.errors.email ? (
                          <div className="invalid-feedback">
                            {formik.errors.email}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group mb-4">
                        <textarea
                          className={`form-control ${
                            formik.touched.message && formik.errors.message
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="Message*"
                          id="message"
                          rows={4}
                          {...formik.getFieldProps("message")}
                        ></textarea>
                        {formik.touched.message && formik.errors.message ? (
                          <div className="invalid-feedback">
                            {formik.errors.message}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <button
                        type="submit"
                        className="btn btn-main"
                        disabled={formik.isSubmitting}
                      >
                        {formik.isSubmitting ? "Sending ..." : "Send Enquiry"}
                        {!formik.isSubmitting && (
                          <Image src={ArrowRight} alt="icon" width="18" />
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(ContactSection), { ssr: false });
