import { useDispatch, useSelector } from "react-redux";
import {
  setFieldsMachineError,
  setMachineFields,
} from "../../../redux/store/manageMachineStore";
import Modal from "../core/Modal";
import LoadingAnimation from "../core/LoadingAnimation";
import { setLoading } from "../../../redux/store/trueOrFalseStore";
import { z } from "zod";
import InputLabelComponent from "../core/InputLabel";

export default function ManageMachineModal({ id, title, onSubmit }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.trueOrFalseState).isLoading;
  const fields = useSelector((state) => state.manageMachineState).fields;
  const errorFields = useSelector((state) => state.manageMachineState).errors;
  const zeroFields = { machine_name: "", nfc_id: "" };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    dispatch(setMachineFields({ [name]: value }));
  };

  const storeSchema = z.object({
    nfc_id: z.string().nonempty("NFC ID is required"),
    machine_name: z.string().nonempty("Machine Name is required"),
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const result = storeSchema.safeParse(fields);
    if (!result.success) {
      const errors = result.error.formErrors.fieldErrors;
      dispatch(setFieldsMachineError(errors));
    } else {
      dispatch(setLoading(true));
      dispatch(setFieldsMachineError(zeroFields));
      const hasSubmit = await onSubmit();
      console.log(hasSubmit);
      if (hasSubmit) {
        handleResetStateFields()
      }
    }
  };

  const handleResetStateFields = () => {
    dispatch(setMachineFields(zeroFields));
    dispatch(setFieldsMachineError(zeroFields));
  };

  return (
    <Modal id={id}>
      <form method="dialog">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={handleResetStateFields}
        >
          ✕
        </button>
      </form>
      <h3>{title}</h3>
      <form
        method="post"
        className="flex flex-col gap-3 mt-3"
        onSubmit={handleOnSubmit}
      >
        <div className="flex flex-col">
          <InputLabelComponent
            labelName="Machine Name"
            type="text"
            name="machine_name"
            id="machineName"
            className="input input-bordered w-full"
            placeholder="Machine Name"
            labelClassName="self-start"
            defaultValue={fields.machine_name}
            error={errorFields.machine_name.length > 0}
            errorMessage={errorFields.machine_name}
            onChangeEvent={handleChangeInput}
          />
        </div>
        <div className="mt-3 mb-3 flex flex-col">
          <InputLabelComponent
            labelName="NFC ID"
            type="text"
            name="nfc_id"
            id="nfcId"
            className="input input-bordered w-full"
            placeholder="Machine NFC ID"
            labelClassName="self-start"
            defaultValue={fields.nfc_id}
            error={errorFields.nfc_id.length > 0}
            errorMessage={errorFields.nfc_id}
            onChangeEvent={handleChangeInput}
          />
        </div>
        {isLoading ? (
          <div className="flex flex-row justify-center items-center">
            <LoadingAnimation className="w-14" />{" "}
            <p className="font-bold ms-3">Sending Data...</p>
          </div>
        ) : (
          <button type="submit" className="btn btn-primary col-span-2">
            Submit
          </button>
        )}
      </form>
    </Modal>
  );
}
