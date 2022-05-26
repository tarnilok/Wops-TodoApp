import React, { forwardRef } from "react";
import Image from "next/image";

//style
import "reactjs-popup/dist/index.css";

//assets
import threeDot from "../public/assets/threeDot.svg";
import unionBlack from "../public/assets/unionBlack.svg";
import update from "../public/assets/update.svg";
import trash from "../public/assets/trash.svg";

//library
import Popup from "reactjs-popup";
import { successToastify, errorToastify } from "../toastify/toastify";

//utils
import { ApiHandler } from "../utils/ConnectApi";

const PopupModal = ({ todo, inputRef, setButtonSwitcher, refreshData }) => {
  // eslint-disable-next-line react/display-name
  const CustomButton = forwardRef(({ open, ...props }, ref) => (
    <button className="flex" name="button" ref={ref} {...props}>
      <Image
        src={threeDot}
        alt="threeDot-asset"
        width="20px"
        height="10px"
        className="hover:cursor-pointer "
      />
    </button>
  ));

  const TodoEraser = async (todo) => {
    const response = await ApiHandler(`/api/todos/${todo.id}`, "", "DELETE");

    if (response.status < 300) {
      refreshData();
      successToastify("deleted👍");
    } else {
      errorToastify("something went wrong🤷‍♂️ please try again");
    }
  };

  const Pinner = async (todo) => {
    const data = { pinned: !todo.pinned };
    const response = await ApiHandler(`/api/todos/${todo.id}`, data, "PATCH");

    if (response.status < 300) {
      refreshData();
      successToastify("updated👍");
    } else {
      errorToastify("something went wrong🤷‍♂️ please try again");
    }
  };

  const Updater = async (todo) => {
    inputRef.current.removeAttribute("disabled");
    inputRef.current.focus();
    inputRef.current.setAttribute(
      "class",
      "text-xl font-interRegular text-[#010A1B] ml-[11px] mr-[5px] grow disabled:bg-[#fff] py-[5px] px-[5px] rounded-[4px]  focus:outline-none focus:border-red-600 border-[1.5px] md:text-[16px]"
    );
    setButtonSwitcher(true);
  };
  return (
    <>
      <Popup
        on={"click"}
        arrow={"top bottom"}
        position={["bottom right", "top right", "top center"]}
        trigger={(open) => <CustomButton open={open} />}
      >
        {(close) => (
          <div className="p-[18px] font-interRegular">
            <div
              className="flex hover:bg-slate-100 py-1"
              onClick={() => {
                Pinner(todo), close();
              }}
            >
              <Image src={unionBlack} alt="pin-black-asset" width="20.83px" />
              <span className="grow text-[#010A1B] leading-[25px] text-[16px] tracking-[-0.015em] ml-[10px] hover:cursor-pointer ">
                {todo.pinned ? "Remove pinning" : "Pin on the top"}
              </span>
            </div>
            <div
              className="flex hover:bg-slate-100 py-2 my-[10px]"
              onClick={() => {
                Updater(todo), close();
              }}
            >
              <Image src={update} alt="update-asset" width="20.83px" />
              <span className="grow text-[#010A1B] leading-[19px] text-[16px] tracking-[-0.015em] ml-[11px] hover:cursor-pointer">
                Update
              </span>
            </div>
            <div
              className="flex hover:bg-slate-100 py-2"
              onClick={() => {
                TodoEraser(todo), close();
              }}
            >
              <Image src={trash} alt="trash-asset" width="20.83px" height="20.83px" />
              <span className="grow text-[#010A1B] leading-[19px] text-[16px] tracking-[-0.015em] ml-[11px] hover:cursor-pointer">
                Delete
              </span>
            </div>
          </div>
        )}
      </Popup>
    </>
  );
};

export default PopupModal;
