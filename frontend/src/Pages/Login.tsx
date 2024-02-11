import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import axiosInstance from "@/api/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const formSchema = z.object({
  username: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { username, password } = values;
      const requestData = {
        username: username.trim(),
        password: password,
      };

      const response = await axiosInstance.post("/user/login", requestData);

      if (response.status === 200) {
        // toast.success("Signup successful",{
        //   position:'top-center'
        // })

        toast({
          description: "Logged in successfully",
        });
        navigate("/dashboard/home");
      } else {
        toast({
          description: "Error logging in",
        });
      }
    } catch (error: any) {
      toast({
        description: error.response.data.message,
      });
    }
  }
  return (
    <div className="w-screen h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex justify-start items-center flex-col">
          <div className="w-full mb-6">
            <Link to="/" className="flex gap-2 justify-start items-center">
              <img src="/assets/logo.png" alt="logo" className="w-[88px]" />
              <span className="mr-4 -ml-4 font-bold text-[clamp(1.95rem, 1.56vw + 1.56rem, 2.81rem)]">
                FlowPay
              </span>
            </Link>
          </div>

          <div className="flex flex-col justify-center items-center w-full h-full">
            <h1 className="text-4xl font-bold mb-4">Welcome back!</h1>
            <small className="mb-6">Enter your details to login to Flow.</small>
            <div className=" mx-auto md:w-[50%] w-[85%]">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8 text-start"
                >
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email" {...field} />
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
                            placeholder="Enter your password"
                            type="password"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button variant={"outline"} type="submit">
                    Login
                  </Button>
                </form>
              </Form>
              <p className="mt-5 text-sm flex items-center gap-4 ">
                Don&apos;t have an account?
                <Link to="/signup" className="hover:underline">
                  Signup here
                </Link>
              </p>
              <Link to="/">
                <p className="mt-12 md:mt-24 text-sm flex items-center gap-4 cursor-pointer hover:underline">
                  <ArrowLeft />
                  Back to home page
                </p>
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-black text-white dark:bg-slate-200 lg:flex justify-center items-center rounded-l-3xl h-screen hidden dark:text-background flex-col">
          <img
            src="/assets/logo.png"
            alt="flowpay logo"
            className="w-[31.25rem] h-[31.25rem]"
          />
          <p className="text-5xl font-black ">FlowPay</p>
          <small className="text-[clamp(1.95rem, 1.56vw + 1.56rem, 2.81rem)]">
            Since 2024
          </small>
        </div>
      </div>
    </div>
  );
};
export default Login;
