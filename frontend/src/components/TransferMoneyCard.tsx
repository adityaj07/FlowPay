import { FC } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import axiosInstance from "@/api/axiosInstance";

interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
}

interface TransferMoneyCardProps {
  recepient: User | null;
}

const formSchema = z.object({
  userid: z.string(),
  amount: z.string().min(1, "Amount should not be less than ₹0"),
});

const TransferMoneyCard: FC<TransferMoneyCardProps> = ({ recepient }) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userid: "",
      amount: "",
    },
  });

  const transferMoney = async (values: z.infer<typeof formSchema>) => {
    try {
      // Convert amount to number
      const amount = Number(values.amount);

      const res = await axiosInstance.post("/account/transfer", {
        to: recepient?._id,
        amount: amount,
      });

      if (res.status === 200) {
        toast({
          description: res.data.message,
        });
        form.reset();
      }
    } catch (error: any) {
      toast({
        description: error.response.data.message,
      });
    }
  };

  return (
    <div className="bg-background w-full p-4 md:p-8 rounded-lg relative overflow-hidden">
      <h1 className="font-semibold text-xl mb-4">Recepient details</h1>
      <div className="w-[70%] md:w-[40%]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(transferMoney)}
            className="space-y-4 text-start"
          >
            <FormField
              control={form.control}
              name="userid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User id</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="User Id of recepient"
                      {...field}
                      value={recepient?._id || ""}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the amount" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              variant={"secondary"}
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Initiate Transfer
            </Button>
          </form>
        </Form>
      </div>

      <img
        src="/assets/llleaves.svg"
        alt="pattern"
        className="absolute top-0 object-contain -right-[11rem] md:left-[15rem] lg:left-[40rem] gradient-mask-l-0 bg-repeat-y"
      />
    </div>
  );
};

export default TransferMoneyCard;
