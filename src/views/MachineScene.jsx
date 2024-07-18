import React, { useEffect } from "react";
import ManageMachineModal from "./components/fragments/ManageMachineModal.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/store/trueOrFalseStore.js";
import fetcher from "../utils/fetcher.js";
import { apiRoutes } from "../routes/api.js";
import { toast } from "react-toastify";
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
import Pagination from "./components/core/Pagination.jsx";
import InputComponent from "./components/core/Input.jsx";
import { MdOutlineSearch } from "react-icons/md";
import NavbarAdmin from "./components/fragments/NavbarAdmin.jsx";
import { setSearchField } from "../redux/store/searchStore.js";

const MachineScene = () => {
  const dispatch = useDispatch();
  const fields = useSelector((state) => state.manageMachineState).fields;
  const isLoading = useSelector((state) => state.trueOrFalseState).isLoading;
  const machineData = useSelector(
    (state) => state.manageMachineState
  ).machine_data;
  const searchField = useSelector((state) => state.searchFieldState).fields;

  const fetchMachineData = async (url = apiRoutes.scene) => {
    dispatch(setLoading(true));
    const res = await fetcher(url, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem(process.env.REACT_APP_COOKIE_NAME),
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
    try {
      const res = await fetcher(apiRoutes.scene, {
        method: method,
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem(process.env.REACT_APP_COOKIE_NAME),
        },
        body: JSON.stringify(fields),
      });
      console.log(res);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (res?.meta?.isSuccess) {
        document.getElementById(modalType).close();
        toast.success(res?.meta?.message, { autoClose: 5000 });
      } else {
        toast.error(res?.meta?.message, { autoClose: 5000 });
      }

      return res?.meta?.isSuccess;
    } catch (error) {
      toast.error("Failed to send data", { autoClose: 5000 });
      return false;
    } finally {
      dispatch(setLoading(false));
      fetchMachineData();
    }
  };

  const handleDeleteMachine = async (data) => {
    showConfirmAlert({
      Icon: IoWarningOutline,
      yesFunc,
      title: "Are you sure to delete?",
      description: data.machine_name + " Machine?",
      styleType: "danger",
    });

    async function yesFunc() {
      showLoadingAlert();
      const res = await fetcher(apiRoutes.scene, {
        method: "DELETE",
        body: JSON.stringify({ id: data.id }),
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem(process.env.REACT_APP_COOKIE_NAME),
        },
      });

      setTimeout(() => {
        fetchMachineData();
        closeLoadingAlert();
        if (res?.meta?.isSuccess) {
          toast.success(res?.meta?.message);
        } else {
          toast.error(res?.meta?.message);
        }
      }, 1000);
    }
  };

  const handleSearchNfc = async (e) => {
    e.preventDefault();
    const query = searchField;
    if (!query || query.trim() === "") {
      fetchMachineData();
    } else {
      const res = await fetcher(apiRoutes.sceneSearch + query, {
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem(process.env.REACT_APP_COOKIE_NAME),
        },
      });
      if (res?.meta?.isSuccess) {
        console.log(res);
        dispatch(setMachineData(res.data));
      } else {
        toast.error(res?.meta?.message);
      }
    }
  };

  useEffect(() => {
    fetchMachineData();
  }, []);

  console.log(machineData.data);
  return (
    <>
      <NavbarAdmin />
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

        <article
          className="px-10 py-3 flex items-center justify-between rounded-md"
          style={{ boxShadow: "0px 0px 10px rgb(0,0,0,0.2)" }}
        >
          <h1 className="text-2xl font-extrabold text-primary">
            3D Machine Data
          </h1>
          <form className="pl-10" onSubmit={handleSearchNfc}>
            <InputComponent
              className="w-40 px-3 !h-9"
              name="query"
              placeholder="Search..."
              defaultValue={searchField}
              onChange={(e) => dispatch(setSearchField(e.target.value))}
            />
            <button
              type="submit"
              className="h-9 min-h-8 btn btn-outline btn-primary ml-2"
            >
              <MdOutlineSearch />
            </button>
          </form>
          <button
            onClick={() => document.getElementById("add").showModal()}
            className="btn btn-outline btn-primary h-9 min-h-8"
          >
            Tambah
          </button>
        </article>
        <article
          className="mt-10 px-5 rounded-md py-5"
          style={{ boxShadow: "0px 0px 10px rgb(0,0,0,0.2)" }}
        >
          <table className="table mx-auto table-zebra">
            <thead>
              <tr>
                <th className="text-center">No</th>
                <th className="text-center">Name</th>
                <th className="text-center">Scene ID</th>
                <th className="text-center">Total Units</th>
                <th className="text-center">Total Used</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && machineData.data ? (
                machineData.data.map((item, number) => (
                  <tr key={number}>
                    <td className="text-center">{number + 1}</td>
                    <td className="text-center">{item.machine_name}</td>
                    <td className="text-center">{item.scene_id}</td>
                    <td className="text-center">{item.was_purchased}</td>
                    <td className="text-center">{item.total_used}</td>
                    <td className="flex gap-5 justify-center">
                      <button
                        onClick={() =>
                          handleDeleteMachine({
                            id: item._id,
                            machine_name: item.machine_name,
                            scene_id: item.scene_id,
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
                              scene_id: item.scene_id,
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
                  <td colSpan="6">
                    <div className="flex flex-row justify-center items-center">
                      <LoadingAnimation className="w-14" />
                      <p className="font-bold ms-3">Fetching Data...</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {machineData.data && (
            <Pagination
              apiRoute={
                searchField && searchField.trim() !== ""
                  ? apiRoutes.sceneSearch + searchField
                  : apiRoutes.scene
              }
              fetchingFunc={fetchMachineData}
              data={machineData.pagination}
            />
          )}
        </article>
      </div>
    </>
  );
};

export default MachineScene;
