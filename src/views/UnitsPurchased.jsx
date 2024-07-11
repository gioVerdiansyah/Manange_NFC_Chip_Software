import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/store/trueOrFalseStore.js";
import fetcher from "../utils/fetcher.js";
import { apiRoutes } from "../routes/api.js";
import { toast } from "react-toastify";
import Cookie from "js-cookie";
import LoadingAnimation from "./components/core/LoadingAnimation.jsx";
import { IoWarningOutline } from "react-icons/io5";
import showConfirmAlert from "./components/core/ConfirmAlert.jsx";
import showLoadingAlert, {
  closeLoadingAlert,
} from "./components/core/ShowLoadingAlert.jsx";
import Cookies from "js-cookie";
import Pagination from "./components/core/Pagination.jsx";
import InputComponent from "./components/core/Input.jsx";
import { MdOutlineSearch } from "react-icons/md";
import NavbarAdmin from "./components/fragments/NavbarAdmin.jsx";
import ManageUnitPurchasedModal from "./components/fragments/ManageUnitPurchasedModal.jsx";
import { setUnitData, setUnitFields } from "../redux/store/manageUnitStore.js";

const UnitsPurchased = () => {
  const dispatch = useDispatch();
  const fields = useSelector((state) => state.manageUnitState).fields;
  const isLoading = useSelector((state) => state.trueOrFalseState).isLoading;
  const machineData = useSelector((state) => state.manageUnitState).unit_data;

  const fetchMachineData = async (url = apiRoutes.units) => {
    dispatch(setLoading(true));
    const res = await fetcher(url, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " + Cookie.get(process.env.REACT_APP_COOKIE_NAME),
      },
    });
    console.log(res)
    if (res?.meta?.isSuccess) {
      dispatch(setUnitData(res.data));
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
      const res = await fetcher(apiRoutes.units, {
        method: method,
        headers: {
          Authorization:
            "Bearer " + Cookie.get(process.env.REACT_APP_COOKIE_NAME),
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
      const res = await fetcher(apiRoutes.units, {
        method: "DELETE",
        body: JSON.stringify({ id: data.id }),
        headers: {
          Authorization:
            "Bearer " + Cookies.get(process.env.REACT_APP_COOKIE_NAME),
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

  const handleSearchUnit = async (e) => {
    e.preventDefault();
    const query = e.target.query.value;
    console.log(query);
    const res = await fetcher(apiRoutes.sceneSearch + query, {
      headers: {
        Authorization:
          "Bearer " + Cookie.get(process.env.REACT_APP_COOKIE_NAME),
      },
    });
    if (res?.meta?.isSuccess) {
      console.log(res);
      dispatch(setUnitData(res.data));
    } else {
      toast.error(res?.meta?.message);
    }
  };

  useEffect(() => {
    fetchMachineData();
  }, []);

  return (
    <>
      <NavbarAdmin />
      <div className="px-20">
        <ManageUnitPurchasedModal
          id={"add"}
          title={"Add Machine"}
          onSubmit={() => handleSendData("add", "POST")}
        />
        <ManageUnitPurchasedModal
          id={"edit"}
          title={"Edit Machine"}
          onSubmit={() => handleSendData("edit", "PUT")}
        />

        <article
          className="px-10 py-3 flex items-center justify-between rounded-md"
          style={{ boxShadow: "0px 0px 10px rgb(0,0,0,0.2)" }}
        >
          <h1 className="text-2xl font-extrabold text-primary">
            Units Purchased
          </h1>
          <form className="pl-10" onSubmit={handleSearchUnit}>
            <InputComponent
              className="w-40 px-3 !h-9"
              name="query"
              placeholder="Search Unit ID..."
            />
            <button
              type="submit"
              className="h-9 min-h-8 btn btn-outline btn-primary ml-2"
            >
              <MdOutlineSearch />
            </button>
          </form>
          <button
            onClick={() => {
              document.getElementById("add").showModal()}}
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
                <th className="text-center">Unit ID</th>
                <th className="text-center">Machine Nmae</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && machineData.data ? (
                machineData.data.map((item, number) => (
                  <tr key={number}>
                    <td className="text-center">{number + 1}</td>
                    <td className="text-center">{item.id}</td>
                    <td className="text-center">{item.machine_name}</td>
                    <td className="flex gap-5 justify-center">
                      <button
                        onClick={() =>
                          handleDeleteMachine({
                            unit_id: item.id,
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
                            setUnitFields({
                              unit_id: item.id,
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
          {machineData.data && (
            <Pagination
              apiRoute={apiRoutes.scene}
              fetchingFunc={fetchMachineData}
              data={machineData.pagination}
            />
          )}
        </article>
      </div>
    </>
  );
};

export default UnitsPurchased;
