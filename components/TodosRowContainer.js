import { useRef, useState } from "react";
import Image from "next/image";

//assets
import union from "../public/assets/union.svg";
import arrow from "../public/assets/arrow.svg";

//utils
import { ApiHandler } from "../utils/ConnectApi";

//componennts
import PopupModal from "./PopupModal";

//library
import { successToastify, errorToastify } from "../toastify/toastify";

const TodosRowContainer = ({ todo, ml, refreshData }) => {
  const inputRef = useRef();
  const [buttonSwitcher, setButtonSwitcher] = useState(false);

  const CheckboxTracker = async (e) => {
    const data = { checked: e.target.checked };
    await ApiHandler(`/api/todos/${todo.id}`, data, "PATCH");
    inputRef.current.style.textDecorationLine = todo.checked ? "none" : "line-through";
    inputRef.current.style.opacity = todo.checked ? "100%" : "40%";
    refreshData();
  };

  const ButtonContainer = () => {
    const Updater = async () => {
      const data = { title: inputRef.current.value };
      const response = await ApiHandler(`/api/todos/${todo.id}`, data, "PATCH");
      inputRef.current.setAttribute("disabled", true);
      inputRef.current.setAttribute(
        "class",
        "text-xl text-[#010A1B] font-interRegular ml-[11px] mr-[5px] grow disabled:bg-[#fff] py-[5px] px-[5px] rounded-[4px] focus:outline-none focus:border-red-600 md:text-[16px]"
      );
      setButtonSwitcher(false);

      if (response.status < 300) {
        refreshData();
        successToastify("updated👍");
      } else {
        errorToastify("something went wrong🤷‍♂️ please try again");
      }
    };
    return (
      {Updater},
      <button
        type="button"
        className="bg-[#21A7F9] rounded-[4px] w-[20px] h-[20px] ml-[8px] absolute right-[40px]"
        onClick={Updater}
      >
        <Image src={arrow} alt="arrow-asset" width="12px" />
      </button>
    );
  };

  return (
    <div className="flex items-center mt-[20px] relative h-[32px] font-interRegular">
      {todo.pinned && <Image src={union} alt="union-asset" width="21px" />}
      <input
        type="checkbox"
        className={
          ml
            ? "w-[24px] h-[24px] ml-[41px] shrink-0 hover:cursor-pointer mb:ml-[31px]"
            : "w-[24px] h-[24px] ml-[18px] shrink-0 hover:cursor-pointer mb:ml-[8px]"
        }
        value={todo.checked}
        onChange={(e) => CheckboxTracker(e)}
      />
      <input
        type="text"
        defaultValue={todo.title}
        className="text-xl text-[#010A1B] font-interRegular ml-[11px] mr-[5px] grow disabled:bg-[#fff] py-[5px] px-[5px] rounded-[4px]  focus:outline-none focus:border-red-600 md:text-[16px]"
        ref={inputRef}
        disabled
      />
      {buttonSwitcher && <ButtonContainer />}

      <PopupModal
      key={todo.id}
        todo={todo}
        refreshData={refreshData}
        inputRef={inputRef}
        setButtonSwitcher={setButtonSwitcher}
      />
    </div>
  );
};

export default TodosRowContainer;
