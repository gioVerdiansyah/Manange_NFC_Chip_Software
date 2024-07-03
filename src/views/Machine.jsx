import React, { useEffect } from "react";
import ManageMachineModal from "./components/fragments/ManageMachineModal.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/store/trueOrFalseStore.js";
import fetcher from "../utils/fetcher.js";
import { apiRoutes } from "../routes/api.js";
import { toast } from "react-toastify";
import Cookie from "js-cookie";
import {
  setMachineData,
  setMachineFields,
} from "../redux/store/manageMachineStore.js";
import LoadingAnimation from "./components/core/LoadingAnimation.jsx";
import { IoWarningOutline } from "react-icons/io5";
import showConfirmAlert from "./components/core/ConfirmAlert.jsx";
import showLoadingAlert, {
  closeLoadingAlert,
} from "./components/core/ShowLoadingAlert.jsx";
import Cookies from "js-cookie";

const Machine = () => {
  const dispatch = useDispatch();
  const fields = useSelector((state) => state.manageMachineState).fields;
  const isLoading = useSelector((state) => state.trueOrFalseState).isLoading;
  const machineData = useSelector(
    (state) => state.manageMachineState
  ).machine_data;

  const fetchMachineData = async () => {
    dispatch(setLoading(true));
    const res = await fetcher(apiRoutes.nfc, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " + Cookie.get(process.env.REACT_APP_COOKIE_NAME),
      },
    });
    if (res?.meta?.isSuccess) {
      dispatch(setMachineData(res.data));
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 1000);
    } else {
      toast.error(res?.meta?.message, { autoClose: 5000 });
    }
  };

  const handleSendData = async (modalType, method) => {
    console.log(fields);
    try {
      const res = await fetcher(apiRoutes.nfc, {
        method: method,
        headers: {
          Authorization:
            "Bearer " + Cookie.get(process.env.REACT_APP_COOKIE_NAME),
        },
        body: JSON.stringify(fields),
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log(res);

      if (res?.meta?.isSuccess) {
        document.getElementById(modalType).close();
        toast.success(res?.meta?.message, { autoClose: 5000 });
      } else {
        toast.error(res?.meta?.message, { autoClose: 5000 });
      }

      return res?.meta?.isSuccess;
    } catch (error) {
      console.error("Error sending data:", error);
      toast.error("Failed to send data", { autoClose: 5000 });
      return false;
    }
  };

  useEffect(() => {
    fetchMachineData();
    console.log(machineData);
  }, []);

  const handleDeleteMachine = async (data) => {
    showConfirmAlert({
      Icon: IoWarningOutline,
      yesFunc,
      title: "Are you sure to delete?",
      description: data.machine_name + " Machine?",
    });

    async function yesFunc() {
      showLoadingAlert();
      const res = await fetcher(apiRoutes.nfc, {
        method: "DELETE",
        body: JSON.stringify({ id: data.id }),
        headers: {
          Authorization:
            "Bearer " + Cookies.get(process.env.REACT_APP_COOKIE_NAME),
        },
      });

      setTimeout(() => {
        fetchMachineData()
        closeLoadingAlert();
        if (res?.meta?.isSuccess) {
          toast.success(res?.meta?.message);
        } else {
          toast.error(res?.meta?.message);
        }
      }, 1000);
    }
  };

  return (
    <div className="px-20">
      <ManageMachineModal
        id={"add"}
        title={"Add Machine"}
        onSubmit={() => handleSendData("add", "POST")}
      />
      <ManageMachineModal
        id={"edit"}
        title={"Edit Machine"}
        onSubmit={() => handleSendData("edit", "PUT")}
      />

      <article className="p-10 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-primary">
          3D Machine Data
        </h1>
        <button
          onClick={() => document.getElementById("add").showModal()}
          className="btn btn-outline btn-primary"
        >
          Tambah
        </button>
      </article>
      <article>
        <table className="table mx-auto table-zebra">
          <thead>
            <tr>
              <th className="text-center">No</th>
              <th className="text-center">Name</th>
              <th className="text-center">RFID</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading && machineData.data ? (
              machineData.data.map((item, number) => (
                <tr key={number}>
                  <td className="text-center">{number + 1}</td>
                  <td className="text-center">{item.machine_name}</td>
                  <td className="text-center">{item.nfc_id}</td>
                  <td className="flex gap-5 justify-center">
                    <button
                      onClick={() =>
                        handleDeleteMachine({
                          id: item._id,
                          machine_name: item.machine_name,
                          nfc_id: item.nfc_id,
                        })
                      }
                      className="btn btn-error"
                    >
                      Hapus
                    </button>
                    <button
                      onClick={() => {
                        dispatch(
                          setMachineFields({
                            id: item._id,
                            machine_name: item.machine_name,
                            nfc_id: item.nfc_id,
                          })
                        );
                        document.getElementById("edit").showModal();
                      }}
                      className="btn btn-warning"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">
                  <div className="flex flex-row justify-center items-center">
                    <LoadingAnimation className="w-14" />
                    <p className="font-bold ms-3">Fetching Data...</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </article>
    </div>
  );
};

export default Machine;
