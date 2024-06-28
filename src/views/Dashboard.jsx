import { Link } from "react-router-dom";
import { pathRoutes } from "../routes/web";
import { AuthMidContext } from "../redux/middleware/AuthMidContext";
import { useContext } from "react";
import { RICON, RXCON } from "../lib/icons";

export function DashboardView() {
    const { isAuthenticated } = useContext(AuthMidContext);
    console.log(isAuthenticated);
    return (
        <>
            <div className="flex justify-center items-center h-[80dvh]">
            <article className="grid grid-cols-3 gap-10">
                <div className="card card-compact bg-base-100 w-96 shadow-xl">
                    <figure>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                            alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">3D Machine</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Detail</button>
                        </div>
                    </div>
                </div>
                <div className="card card-compact bg-base-100 w-96 shadow-xl ">
                    <figure>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                            alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Log Activity!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Detail</button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-around">
                   <div className="card bg-primary">
                    <div className="card-body">
                        <h2 className="card-title"> <RICON.RiRobot3Fill/> Newest 3d Machine</h2>
                        <p className="text-primary-content">asdkjadnsaksd</p>
                    </div>
                   </div>
                   <div className="card bg-secondary">
                    <div className="card-body">
                        <h2 className="card-title flex items-center m-0"> <RXCON.RxActivityLog/> Newest Log Activity</h2>
                        <p className="text-primary-content">Success in 22 May 2024</p>
                    </div>
                   </div>
                </div>
            </article>
            </div>
        </>
    );
}
