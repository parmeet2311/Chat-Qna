import { useEffect, useState } from "react";
import Chat from "@/components/Chat";
import MobileSiderbar from "@/components/MobileSidebar";
import Sidebar from "@/components/Sidebar";
import { ToastContainer } from "react-toastify";
// import useAnalytics from "@/hooks/useAnalytics";

export default function Home() {
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  // const { trackEvent } = useAnalytics();

  // useEffect(() => {
  //   trackEvent("page.view", { page: "home" });
  // }, []);

  const toggleComponentVisibility = () => {
    setIsComponentVisible(!isComponentVisible);
  };

  return (
    <main className="overflow-hidden w-full h-screen relative flex">
      {isComponentVisible ? (
        <MobileSiderbar toggleComponentVisibility={toggleComponentVisibility} />
      ) : null}
      <div className="dark hidden flex-shrink-0 bg-[#1a1c23] md:flex md:w-[260px] md:flex-col">
        <div className="flex h-full min-h-0 flex-col ">
          <Sidebar />
        </div>
      </div>
      <Chat toggleComponentVisibility={toggleComponentVisibility} />
      <ToastContainer/>
    </main>
  );
}
