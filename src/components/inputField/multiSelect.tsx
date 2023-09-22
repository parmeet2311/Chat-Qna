import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Port } from "../../../envData";
import { notify } from "../toast/toast";

const MultiSelect = () => {
  // const options1 = ["A._DHARMARAJ_vs_THE_CHIEF_EDUCATIONAL_OFFICER_PUDUKKOTTAI.pdf", "B._DHARMARAJ_vs_THE_CHIEF_EDUCATIONAL_OFFICER_PUDUKKOTTAI.pdf","C._DHARMARAJ_vs_THE_CHIEF_EDUCATIONAL_OFFICER_PUDUKKOTTAI.pdf"];
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [options, setOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  console.log(selectedOptions);
  const TransferSelect = async () => {
    notify("info","Wait, While we update your pdf!")
    const formData = new FormData();
    formData.append("selected_pdf", "sample.pdf");
    try {
      const response = await axios.post(
        `${Port}/send_pdf_names`,
        {
          pdfFileNames: selectedOptions,
        }
      );
      notify("success",response.data.Status)
      console.log(response);
      console.log("Pdf uploaded successfully");
    } catch (err) {
      notify("error",`${err}`)
      console.log(err);
    }
  };
  const FetchPdfApi = `${Port}/selected_pdfs`;
  const FetchPdf = async () => {
    try {
      const response = await axios.post(FetchPdfApi);
      console.log(response.data.pdfs);
      setOptions(response.data.pdfs);
    } catch (err) {
notify("error", `Error Fetching pdf! ${err}`)
      console.log("Error fetching PDF", err);
    }
  };

  // useEffect(()=>{
  //   TransferSelect()
  // },[selectedOptions])

  const toggleOption = (value: string, label: string) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== value));
    } else {
      setSelectedOptions([...selectedOptions, label]);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };
  function truncateAddress(address: string) {
    const start = address.slice(0, 10);
    const end = address.slice(-7);
    return `${start}...${end}`;
  }

  const DeletePdf = async (pdfName: string) => {
    try {
      notify("info", "Wait, while we delete pdf!")
      const response = await axios.post(`${Port}/delete_pdf`, {
        delete_file: pdfName,
      });
      console.log(response);
      FetchPdf();
      notify("success", "Successfully deleted pdf!")
    } catch (err) {
      notify("error", "Error Deleting pdf!")
      console.log(err);
    }
  };
  useEffect(() => {
    FetchPdf();
  }, [FetchPdfApi],);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* <button onClick={TransferSelect}>Test</button> */}
      <button
        className="w-full text-black font-semibold text-center rounded-md border border-gray-500 py-2 px-[10px] mb-3 bg-slate-400"
        onClick={TransferSelect}
      >
        Update PDF
      </button>
      <button
        className="border text-[#e5e5e5] border-gray-500 rounded-md py-2 px-[10px] w-full overflow-hidden "
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          Select options
          {/* {selectedOptions.length === 0
            ? "Select options"
            : selectedOptions.map((option) => truncateAddress(option)).join(", ")} */}
        </span>
      </button>
      {isOpen && (
        <ul
          style={{ transition: "0.3s" }}
          className="absolute left-0 mt-2 py-2 w-full overflow-x-scroll bg-white border border-gray-300 rounded-md shadow-lg z-10"
        >
          {options.map((option, index) => (
            <li className="flex justify-between items-center" key={index}>
              <label className="flex whitespace-nowrap items-center space-x-2 p-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option as any)}
                  onChange={() => toggleOption(option as any, option as any)}
                  className="relative form-checkbox h-5 w-5 text-blue-500"
                />
                <span className="text-black">
                  {/* {option as any} */}
                  {truncateAddress(option as string)}
                </span>
              </label>
              <span
                onClick={() => DeletePdf(option as string)}
                className="text-[#ff1f1f] pr-3 text-[22px] cursor-pointer"
              >
                x
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiSelect;
