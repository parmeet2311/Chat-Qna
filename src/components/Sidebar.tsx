import React, { useState, useEffect } from "react";
import {
  AiOutlineMessage,
  AiOutlinePlus,
  AiOutlineUser,
  AiOutlineSetting,
} from "react-icons/ai";
import { BiLinkExternal } from "react-icons/bi";
import axios from "axios";
import { FiMessageSquare } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import CustomModal from "./Modal/modal";
import { FiUpload } from "react-icons/fi";
import MultipleSelect from "./inputField/selectField";
import MultiSelect from "./inputField/multiSelect";
import { notify } from "./toast/toast";
// import toast
// Initialization for ES Users
// import { Select, initTE } from "tw-elements";
// initTE({ Select });
 
// interface Option{
//   value:String;
//   label:String;
// }

const Sidebar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  

  const closeModal = () => {
    setModalOpen(false);
  };
 
  return (
    <div className="scrollbar-trigger flex h-full w-full flex-1 items-start border-white/20">
      <nav className="flex h-full flex-1 flex-col space-y-1 p-2">
        {/* <div className=" rounded-md"> */}

        {/* <Select/> */}
        <a
          onClick={openModal}
          className="flex justify-center bg-white text-center font-semibold py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200  bg-gradient-to-tl from-teal-400 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent caret-pink-600  cursor-pointer text-md mb-1 flex-shrink-0 border border-white/20"
        >
          Upload PDF
          {/* <AiOutlinePlus className="text-white h-4 w-4" /> */}
          <FiUpload className="text-purple-600 h-6 w-6" />
        </a>
        <MultiSelect />
        {/* </div> */}
        <div className="flex-col flex-1 overflow-y-auto border-b border-white/20">
          <div className="flex flex-col gap-2 pb-2 text-gray-100 text-sm">
            {/* <a className="flex py-3 px-3 items-center gap-3 relative rounded-md hover:bg-[#2A2B32] cursor-pointer break-all hover:pr-4 group">
              <FiMessageSquare className="h-4 w-4" />
              <div className="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">
                New conversation
                <div className="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-gray-900 group-hover:from-[#2A2B32]"></div>
              </div>
            </a> */}
          </div>
        </div>
        {/* <a
          onClick={openModal}
          target="_blank"
          className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"
        >
          <BiLinkExternal className="h-4 w-4" />
          Upload PDF
        </a> */}
        <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
          <AiOutlineMessage className="h-4 w-4" />
          Clear conversations
        </a>

        <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
          <MdLogout className="h-4 w-4" />
          Log out
        </a>
      </nav>
      <CustomModal isOpen={modalOpen} onClose={closeModal}>
        <h1>Your Modal Content Goes Here</h1>
      </CustomModal>
    </div>
  );
};

export default Sidebar;
