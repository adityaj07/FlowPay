import { FC, useEffect, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import { Separator } from "@/components/ui/separator";
import axiosInstance from "@/api/axiosInstance";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

interface DashboardProfileProps {}

interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
}

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const DashboardProfile: FC<DashboardProfileProps> = ({}) => {
  const [user, setUser] = useState<User | null>(null);
  const [updatedUser, setUpdatedUser] = useState<Boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    const getUser = async () => {
      const res = await axiosInstance.get("/user");
      const user = res.data.user;
      setUser(user);
    };

    getUser();
  }, [updatedUser]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { firstName, lastName, password } = values;
      const requestData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        password: password.trim(),
      };
      const response = await axiosInstance.put("/user/updateuser", requestData);

      const updatedUser = response.data.updatedUser;

      if (response.status === 200) {
        console.log(response.data.message);
        toast({
          description: response.data.message,
        });

        setUser(updatedUser);
        setUpdatedUser(true);
        form.reset();
      } else {
        toast({
          description: response.data.message,
        });
      }
    } catch (error: any) {
      toast({
        description: error.response.data.message,
      });
    }
  }

  return (
    <div className="h-screen md:h-fit">
      <DashboardHeader text="Profile" />
      <Separator className="bg-slate-100/30 my-4" />
      <div className="bg-background w-full p-8 rounded-lg relative overflow-hidden">
        {user && (
          <h1 className="text-wrap text-sm md:text-md ">
            Your user id is{" "}
            <span className="bg-slate-500/50 p-2 rounded-full">
              {user?._id}
            </span>
          </h1>
        )}
        <div className="flex justify-start items-center mt-6 ">
          <Avatar className="w-24 h-24">
            <AvatarFallback className="text-3xl md:text-5xl font-black">
              {user?.firstName?.split("")[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2 ">
            <span className=" ml-6 font-extrabold text-3xl md:text-5xl">
              {user?.firstName} {user?.lastName}
            </span>
            <span className="text-xs md:text-sm ml-6">{user?.username}</span>
          </div>
        </div>
        <img
          src="/assets/llleaves.svg"
          alt="pattern"
          className="absolute top-0 -right-[11rem] md:left-[15rem] lg:left-[40rem] gradient-mask-l-0 "
        />
      </div>

      <h2 className="mt-4 mb-2 md:mt-12 md:mb-5 text-2xl font-medium ">
        Update your information
      </h2>
      <Card className="w-full lg:max-w-[70%] ">
        <CardHeader>
          <CardTitle>Update Profile</CardTitle>
          <CardDescription>Enter your details.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 text-start"
            >
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your updated firstname"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your updated lastname"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your updated password"
                        type="password"
                        {...field}
                      />
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
                Update
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardProfile;
