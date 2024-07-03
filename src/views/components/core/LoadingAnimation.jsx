import { twMerge } from "tailwind-merge";
import loadingGif from "../../../assets/gif/loading.gif";

export default function LoadingAnimation({ ...props }) {
  return (
    <img
      src={loadingGif}
      alt="Is Loading"
      className={twMerge("w-20", props.className)}
      {...props}
    />
  );
}
