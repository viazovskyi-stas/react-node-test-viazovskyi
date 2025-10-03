import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/action/user";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  TextField,
} from "@mui/material";
import { PiNotepad, PiXLight } from "react-icons/pi";
import { CFormSelect } from "@coreui/react";
import { pakistanCities } from "../../constant";
import { useForm } from "../../hooks/useForm";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const EditClient = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { currentEmployee, isFetching } = useSelector((state) => state.user);

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    setValues,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      phone: "",
      email: "",
      city: "",
    },
    validationSchema: {
      firstName: { required: true, minLength: 2, maxLength: 50 },
      lastName: { required: true, minLength: 2, maxLength: 50 },
      username: { required: true, minLength: 3, maxLength: 20 },
      phone: { required: true, minLength: 10, maxLength: 15 },
      city: { required: false },
    },
  });

  useEffect(() => {
    if (currentEmployee && open) {
      setValues({
        firstName: currentEmployee.firstName || "",
        lastName: currentEmployee.lastName || "",
        username: currentEmployee.username || "",
        phone: currentEmployee.phone || "",
        email: currentEmployee.email || "",
        city: currentEmployee.city || "",
      });
    }
  }, [currentEmployee, open]);

  const onSubmit = (data) => {
    dispatch(updateUser(currentEmployee._id, data, currentEmployee?.role));
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      scroll="paper"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      fullWidth="sm"
      maxWidth="sm"
      aria-describedby="alert-dialog-slide-description">
      <DialogTitle className="flex items-center justify-between">
        <div className="text-sky-400 font-primary">Edit Client</div>
        <div className="cursor-pointer" onClick={handleClose}>
          <PiXLight className="text-[25px]" />
        </div>
      </DialogTitle>
      <DialogContent>
        <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
          <div className="text-xl flex justify-start items-center gap-2 font-normal">
            <PiNotepad size={23} />
            <span>Client Details</span>
          </div>
          <Divider />
          <table className="mt-4">
            <tr>
              <td className="pb-4 text-lg">First Name </td>
              <td className="pb-4">
                <TextField
                  size="small"
                  fullWidth
                  value={values.firstName}
                  onChange={handleChange("firstName")}
                  error={Boolean(errors.firstName)}
                  helperText={errors.firstName}
                />
              </td>
            </tr>
            <tr>
              <td className="pb-4 text-lg">Last Name </td>
              <td className="pb-4">
                <TextField
                  size="small"
                  fullWidth
                  value={values.lastName}
                  onChange={handleChange("lastName")}
                  error={Boolean(errors.lastName)}
                  helperText={errors.lastName}
                />
              </td>
            </tr>
            <tr>
              <td className="pb-4 text-lg">User Name </td>
              <td className="pb-4">
                <TextField
                  size="small"
                  fullWidth
                  value={values.username}
                  onChange={handleChange("username")}
                  error={Boolean(errors.username)}
                  helperText={errors.username}
                />
              </td>
            </tr>
            <tr>
              <td className="pb-4 text-lg">Email </td>
              <td className="pb-4">
                <TextField
                  size="small"
                  fullWidth
                  placeholder="Optional"
                  value={values.email}
                  onChange={handleChange("email")}
                />
              </td>
            </tr>
            <tr>
              <td className="flex items-start pt-2 text-lg">Phone </td>
              <td className="pb-4">
                <TextField
                  type="number"
                  size="small"
                  fullWidth
                  value={values.phone}
                  onChange={handleChange("phone")}
                  error={Boolean(errors.phone)}
                  helperText={errors.phone}
                />
              </td>
            </tr>
            <tr>
              <td className="pb-4 text-lg">City </td>
              <td className="pb-4">
                <CFormSelect
                  value={values.city}
                  onChange={(e) => handleChange("city")(e)}
                  className="border-[1px] p-2 rounded-md w-full border-[#c1c1c1] cursor-pointer text-black">
                  <option value="">Select City</option>
                  {pakistanCities.map((city, key) => (
                    <option key={key} value={city}>
                      {city}
                    </option>
                  ))}
                </CFormSelect>
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </td>
            </tr>
          </table>
        </div>
      </DialogContent>
      <DialogActions>
        <button
          onClick={handleClose}
          variant="contained"
          type="reset"
          className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all">
          Cancel
        </button>
        <button
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin">
          {isFetching ? 'Submitting...' : 'Save'}
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default EditClient;

