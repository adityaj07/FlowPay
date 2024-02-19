import { FC } from "react";
import DashboardHeader from "./DashboardHeader";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/mode-toggle";
import { Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmDialogue from "@/components/ConfirmDialogue";
import axiosInstance from "@/api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface DashboardSettingsProps {}

const DashboardSettings: FC<DashboardSettingsProps> = ({}) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const res = await axiosInstance.delete("/user/deleteuser");

      if (res.status === 200) {
        toast({
          description: res.data.message,
        });
        navigate("/");
      } else {
        toast({
          description: "Error deleting the user",
        });
      }
    } catch (error: any) {
      toast({
        description: error.response.data.message,
      });
    }
   
  };

  const confirmButtons: JSX.Element[] = [
    <Button type="submit" variant="destructive" onClick={handleDelete}>
      Delete my account
    </Button>,
  ];

  return (
    <div>
      <DashboardHeader text="Settings" />
      <Separator className="bg-slate-100/30 my-4" />
      <div className="w-full border py-2 lg:px-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-medium">Mode</h2>
          <div className="w-full lg:w-[60%] px-4 py-3 bg-background rounded-md flex justify-between items-center">
            <span>Your preferred mode of using Flowpay</span>
            <ModeToggle />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border border-red-600 p-4 rounded-lg lg:w-[60%]">
          <h2 className="text-xl font-medium text-red-500">Danger Zone</h2>
          <div className="w-full px-4 py-3 bg-background rounded-md flex justify-between items-center">
            <span>Delete your account</span>
            <Button size="icon" variant="outline">
              <ConfirmDialogue
                confirmTrigger={
                  <Trash2Icon className="h-[1.2rem] w-[1.2rem] text-red-800" />
                }
                confirmHeading="Do you want to delete your account?"
                confirmDesc="We are sorry to see you go"
                buttons={confirmButtons}
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSettings;
