import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import Nav from "../../components/nav/Nav";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa6";
import EmptyLottie from "../../lottieComponent/Empty.lottie";
import AuthGuard from "../../components/guard/Auth.guard";
import FormTool from "./tool/Form.tool";
import {
  useCreateContactMutation,
  useGetContactQuery,
} from "../../store/services/endpoints/contact.endpoint";
import DataTableTool from "./tool/DataTable.tool";
import { useState } from "react";

const HomePage = () => {
  const { data, isError, isSuccess, isLoading } = useGetContactQuery();

  const [editData, setEditData] = useState({
    edit: false,
    data: null,
  });

  const handleEdit = (id) => {
    const apiData = data?.contacts?.data;
    const finder = apiData.find((i) => i.id === id);
    setEditData({ edit: true, data: finder });
  };

  const handleClose = () => {
    setEditData({ edit: false, data: null });
  };

  return (
    <AuthGuard>
      <Sheet>
        <div className=" w-screen h-screen  bg-[#fcfcfd]">
          <Nav />
          <div className="px-52 mx-auto">
            <div className="flex justify-end mb-5">
              <SheetTrigger asChild>
                <Button className=" bg-basic space-x-2 mt-5 hover:bg-blue-500 active:scale-95 duration-300">
                  <FaPlus className=" mt-[2px]" />
                  <span>Create Contact</span>
                </Button>
              </SheetTrigger>
            </div>

            {data?.contacts?.data.length > 0 ? (
              <DataTableTool
                handleEdit={handleEdit}
                apiData={data?.contacts?.data}
              />
            ) : (
              <div className=" border bg-white shadow w-full mt-5 h-[600px] rounded flex flex-col justify-center items-center">
                <EmptyLottie />
                <p className=" font-semibold text-lg text-gray-400">
                  There is no lists...
                </p>
              </div>
            )}
          </div>
          {/* sheet */}
          <SheetContent onClose={handleClose} onOverlayClick={handleClose}>
            <SheetHeader>
              <SheetTitle className=" font-bold text-2xl">
                Contact Information
              </SheetTitle>
            </SheetHeader>
            <FormTool editData={editData} handleClose={handleClose} />
            {/* <SheetFooter>
              <SheetClose asChild>
                <Button
                  type="submit"
                  className="bg-blue-600 space-x-2 mt-5 hover:bg-blue-500 active:scale-95 duration-300"
                >
                  Save changes
                </Button>
              </SheetClose>
            </SheetFooter> */}
          </SheetContent>
        </div>
      </Sheet>
    </AuthGuard>
  );
};

export default HomePage;
