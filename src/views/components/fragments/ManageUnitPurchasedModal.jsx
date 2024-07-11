import { useDispatch, useSelector } from "react-redux";
import Modal from "../core/Modal";
import LoadingAnimation from "../core/LoadingAnimation";
import { setLoading } from "../../../redux/store/trueOrFalseStore";
import { z } from "zod";
import InputLabelComponent from "../core/InputLabel";
import {
  setFieldsUnitError,
  setUnitFields,
} from "../../../redux/store/manageUnitStore";

export default function ManageUnitPurchasedModal({ id, title, onSubmit }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.trueOrFalseState).isLoading;
  const fields = useSelector((state) => state.manageUnitState).fields;
  console.log(fields)
  const list_machine = useSelector((state) => state.manageUnitState).unit_data
    ?.machine_state;
  const errorFields = useSelector((state) => state.manageUnitState).errors;
  const zeroFields = { scene_id: "", unit_id: "" };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    dispatch(setUnitFields({ [name]: value }));
  };

  const storeSchema = z.object({
    unit_id: z.string().nonempty("Machine Scene ID is required"),
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const result = storeSchema.safeParse(fields);
    if (!result.success) {
      const errors = result.error.formErrors.fieldErrors;
      dispatch(setFieldsUnitError(errors));
    } else {
      dispatch(setLoading(true));
      dispatch(setFieldsUnitError(zeroFields));
      const hasSubmit = await onSubmit();
      console.log(hasSubmit);
      if (hasSubmit) {
        handleResetStateFields();
      }
    }
  };

  const handleResetStateFields = () => {
    dispatch(setUnitFields(zeroFields));
    dispatch(setFieldsUnitError(zeroFields));
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
          <select
            className="select select-bordered w-full"
            onChange={(e) => {
              console.log(e.target.value);

              dispatch(setUnitFields({ scene_id: e.target.value }));
            }}
          >
            <option disabled selected>
              Select 3D machine
            </option>
            {list_machine &&
              list_machine.map((item, index) => (
                <option key={index} value={item.scene_id}>
                  {item.machine_name}
                </option>
              ))}
          </select>
        </div>
        <div className="flex flex-col">
          <InputLabelComponent
            labelName="Machine Name"
            type="text"
            name="unit_id"
            id="unitID"
            className="input input-bordered w-full"
            placeholder="Unit ID"
            labelClassName="self-start"
            defaultValue={fields.unit_id}
            error={errorFields.unit_id.length > 0}
            errorMessage={errorFields.unit_id}
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
