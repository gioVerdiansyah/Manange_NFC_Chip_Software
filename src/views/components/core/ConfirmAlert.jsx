import "react-alert-confirm/lib/style.css";
import AlertConfirm, { Button } from "react-alert-confirm";

export default async function showConfirmAlert({
  Icon,
  title = "Are you sure?",
  description,
  cancelText,
  yesText,
  yesFunc,
}) {
  await AlertConfirm({
    title: (
      <div className="flex flex-row items-center">
        {Icon && <Icon className="text-red-600 text-2xl" />}
        <p className="font-bold !ml-1">{title}</p>
      </div>
    ),
    desc: (
      <span>
        {description ??
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, odit."}
      </span>
    ),
    footer: (dispatch) => {
      return (
        <>
          <Button className="pointer" onClick={() => dispatch("cancel")}>
            {cancelText ?? "Cancel"}
          </Button>
          <Button onClick={() => dispatch("yes")} styleType="danger">
            {yesText ?? "Yes"}
          </Button>
        </>
      );
    },
    closeBefore: async (action) => {
      if (action === "yes") yesFunc();
    },
  });
}
