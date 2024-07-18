import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import { pathRoutes } from "../routes/web";
import { handGif, historyVector, jurnalVector, machineVector, payClickVector } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import fetcher from "../utils/fetcher";
import { apiRoutes } from "../routes/api";
import { setDashboardData } from "../redux/store/dashboardDataStore";
import { toast } from "react-toastify";
import { useEffect } from "react";
import formatDate from "../utils/date";

export function DashboardView() {
  const dispatch = useDispatch();
  const dashboardData = useSelector((state) => state.dashboardState);

  const handleFetchingData = async () => {
    const res = await fetcher(apiRoutes.dashboardData, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem(process.env.REACT_APP_COOKIE_NAME),
      },
    });

    console.log(res);
    if (res?.meta?.isSuccess) {
      dispatch(setDashboardData(res?.data));
    } else {
      toast.error(res?.meta?.message);
    }
  };

  useEffect(() => {
    handleFetchingData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div>
        <Fade direction="down">
          <h1 className="text-center font-bold text-4xl flex flex-row">
            Welcome Admin <img src={handGif} alt="Hand GIF" className="w-10" />
          </h1>
        </Fade>
        <Fade duration={3000}>
          <h2 className="text-center text-lg mb-5">
            Manage your{" "}
            <Link to={pathRoutes.machine} className="underline">
              3d Machine Data
            </Link>
          </h2>
        </Fade>
      </div>
      <div className="flex flex-row gap-5">
        <Fade delay={800} direction="up">
          <div className="card bg-base-100 image-full h-full shadow-xl">
            <figure className="relative">
              <img
                src={machineVector}
                alt="Machine Logo Vector"
                className="!h-32 absolute -bottom-12 -left-10"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">3D Machine Total</h2>
              <p className="font-bold text-center text-3xl">
                {dashboardData.total_machine}
              </p>
            </div>
          </div>
        </Fade>
        <Fade delay={1600} direction="up">
          <div className="card bg-base-100 image-full h-full shadow-xl">
            <figure className="relative">
              <img
                src={jurnalVector}
                alt="Jurnal Logo Vector"
                className="!h-20 absolute -bottom-5 -left-3"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Total Machine Used</h2>
              <p className="font-bold text-center text-3xl">
                {dashboardData.total_machine_used}
              </p>
            </div>
          </div>
        </Fade>
        <Fade delay={2400} direction="up">
          <div className="card bg-base-100 image-full h-full shadow-xl">
            <figure className="relative">
              <img
                src={historyVector}
                alt="Journal Logo Vector"
                className="!h-28 absolute -bottom-8 -left-8"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title justify-center">Last Machine Used</h2>
              <div>
                <p className="text-center text-xl font-bold text-wrap">
                  {dashboardData.latest_machine_used.name}
                </p>
                <p className="text-center text-xl font-bold text-wrap">
                  {dashboardData.latest_machine_used.date !== null &&
                    dashboardData.latest_machine_used.date !== "-" &&
                    formatDate(dashboardData.latest_machine_used.date)}
                </p>
              </div>
            </div>
          </div>
        </Fade>
        <Fade delay={2400} direction="up">
          <div className="card bg-base-100 image-full h-full shadow-xl">
            <figure className="relative">
              <img
                src={payClickVector}
                alt="Jurnal Logo Vector"
                className="!h-28 absolute -bottom-8 -left-8"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title justify-center">Last Machine Buy</h2>
              <div>
                <p className="text-center text-xl font-bold text-wrap">
                  {dashboardData.latest_machine_buy.name}
                </p>
                <p className="text-center text-xl font-bold text-wrap">
                  {dashboardData.latest_machine_buy.date !== null &&
                    dashboardData.latest_machine_buy.date !== "-" &&
                    formatDate(dashboardData.latest_machine_buy.date)}
                </p>
              </div>
            </div>
          </div>
        </Fade>
      </div>
      <div className="w-8/12 mt-8">
        <Fade delay={3000}>
          <p>
            This admin software manages NFC data for scanning 3D model equipment
            or machinery, detailing their parts and functions. It provides a
            user-friendly interface for organizing NFC data, allowing users to
            add, edit, and deleted.
          </p>
        </Fade>
      </div>
    </div>
  );
}
