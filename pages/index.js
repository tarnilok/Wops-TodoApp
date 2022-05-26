import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

//components
import TodosRowContainer from "../components/TodosRowContainer";
import Header from "../components/Header";

//utils
import { ApiHandler } from "../utils/ConnectApi";

//assets
import stroke from "../public/assets/stroke.svg";
import arrow from "../public/assets/arrow.svg";

//library
import { successToastify, errorToastify } from "../toastify/toastify";

export async function getServerSideProps() {
  const response = await fetch(process.env.END_POINT + "/api/todos");
  const todos = await response.json();
  return { props: { todos } };
}

export default function Home({ todos }) {
  const [todoItem, setTodoItem] = useState("");
  const inputFocusRef = useRef();
  const router = useRouter();

  console.log(process.env.NEXT_PUBLIC_END_POINT)

  const refreshData = () => {
    router.replace(router.asPath);
  }

  useEffect(() => {
    inputFocusRef.current.focus();
  }, []);

  const todoAddHandler = async () => {
    if (todoItem) {
      const data = { title: todoItem };
      const response = await ApiHandler("/api/todos", data, "POST");
      setTodoItem("");
      if (response.status < 300) {
        refreshData();
        successToastify("work-to-do is created successfully🚀");
      } else {
        errorToastify("something went wrong🤷‍♂️ please try again");
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") todoAddHandler();
  };

  return (
    <div>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="A Todo App designed by WesterOps" />
        <link rel="icon" href="/assets/logo3.svg" />
      </Head>
      <Header />
      <section className="w-[718px] h-[800px] mt-[40px] bg-[#FFF] rounded-[8px] border-[#E5E5E5] overflow-auto md:w-[600px] sm:w-[400px] sm:h-[75vh] mb:w-[350px] mb:h-auto">
        <h2 className="text-center text-2xl text-[#194591] font-interSemiBold mt-[17px] ">
          To Do List
        </h2>
        <hr className="mt-[16px] h-[1.5px] border-none bg-[#E5E5E5]" />
        <div className="w-[148px] h-[4px] bg-[#FF7964] mt-[-3px] ml-auto mr-auto"></div>
        <div className="pl-[72px] pr-[63px] relative flex pt-[32px] sm:pl-[20px] sm:pr-[20px] sm:flex-col">
          <input
            type="text"
            value={todoItem}
            onChange={(e) => setTodoItem(e.target.value)}
            className="pl-[57px] pr-[20px] py-[15px] w-[521px] h-[54px] text-xl font-interRegular text-[#010A1B] placeholder-text-xl border-[1.5px] border-[#999C9F] rounded-[4px] focus:outline-none focus:border-blue-600 md:text-[16px] md:placeholder:-text-[16px] sm:w-auto sm:pr-[10px] sm:pl-[45px]"
            placeholder="Add a task..."
            onKeyDown={(e) => handleKeyDown(e)}
            ref={inputFocusRef}
          />
          <div className="absolute top-[49px] left-[91px] sm:left-[35px]">
            <Image src={stroke} alt="stroke-asset" width="18px" height="14px" />
          </div>
          <button
            type="button"
            onClick={todoAddHandler}
            className="bg-[#21A7F9] rounded-[4px] w-[54px] h-[54px] ml-[8px] sm:w-[200px] sm:ml-0 sm:mr-auto sm:mt-3"
          >
            <Image src={arrow} alt="arrow-asset" width="" />
          </button>
        </div>
        <div className="mt-[32px] pl-[33px] pr-[73px] h-[600px] max-h-[601px] sm:h-[45vh] overflow-auto scrollbar-hide sm:pl-[15px] sm:pr-[40px] sm:mt-[15px] mb:pl-[10px] mb:pr-[10px]">
          {todos
            .filter((e) => e.pinned === true)
            .map((todo) => (
              <div key={todo.id}>
                <TodosRowContainer
                  todo={todo}
                  refreshData={refreshData}
                />
              </div>
            ))}
          <hr className="mt-[44px] mb-[14px] h-[1.5px] border-none bg-[#E5E5E5] ml-[72px] mr-[72px] md:ml-0 md:mr-0" />
          {todos
            .filter((e) => e.pinned === false)
            .map((todo) => (
              <div key={todo.id}>
                <TodosRowContainer
                  todo={todo}
                  ml={39}
                  refreshData={refreshData}
                />
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
