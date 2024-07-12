import { useDispatch, useSelector } from "react-redux";
import Modal from "../core/Modal";
import LoadingAnimation from "../core/LoadingAnimation";
import { setLoading } from "../../../redux/store/trueOrFalseStore";
import { z } from "zod";
import InputLabelComponent from "../core/InputLabel";
import {
  resetUnitState,
  setFieldsUnitError,
  setUnitFields,
} from "../../../redux/store/manageUnitStore";
import { useEffect, useState } from "react";

export default function ManageUnitPurchasedModal({ id, title, onSubmit }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.trueOrFalseState).isLoading;
  const fields = useSelector((state) => state.manageUnitState).fields;
  const list_machine = useSelector((state) => state.manageUnitState).unit_data
    ?.machine_state;
  const errorFields = useSelector((state) => state.manageUnitState).errors;
  const zeroFields = { unit_id: "", scene_id: "" };

  const [unitId, setUnitId] = useState();

  const handleChangeInput = (e) => {
    const { value } = e.target;
    setUnitId(value);
    dispatch(
      setUnitFields({
        updated_unit_id: value,
      })
    );
  };

  const storeSchema = z.object({
    unit_id: z.string().nonempty("Machine Scene ID is required"),
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const result = storeSchema.safeParse({ unit_id: unitId });
    if (!result.success) {
      const errors = result.error.formErrors.fieldErrors;
      dispatch(setFieldsUnitError(errors));
    } else {
      dispatch(setLoading(true));
      dispatch(setFieldsUnitError(zeroFields));
      const hasSubmit = await onSubmit();
      if (hasSubmit) {
        handleResetStateFields();
      }
    }
  };

  const handleResetStateFields = () => {
    dispatch(resetUnitState());
  };

  useEffect(() => {
    setUnitId(fields.unit_id);
    if (list_machine?.length > 0) {
      dispatch(setUnitFields({ scene_id_after: list_machine[0].scene_id }));
    }
  }, [dispatch, list_machine, fields.unit_id]);

  return (
    <Modal id={id}>
      <form method="dialog">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => handleResetStateFields()}
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
          <label htmlFor="select_scene">Select Machine Type</label>
          <select
            id="select_scene"
            className="select select-bordered w-full"
            required
            onChange={(e) =>
              dispatch(
                setUnitFields({
                  scene_id_after: e.target.value,
                  scene_id_before: fields.scene_id,
                })
              )
            }
          >
            {list_machine &&
              list_machine.map((item, index) => (
                <option
                  key={index}
                  value={item.scene_id}
                  {...(fields.scene_id === item.scene_id
                    ? { selected: true }
                    : {})}
                >
                  {item.machine_name}
                </option>
              ))}
          </select>
        </div>
        <div className="flex flex-col">
          <InputLabelComponent
            labelName="NFC ID Machine"
            type="text"
            name="unit_id"
            id="unitID"
            className="input input-bordered w-full"
            placeholder="Unit ID"
            labelClassName="self-start"
            defaultValue={unitId}
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
