import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
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
import { ArrowLeft, Loader2 } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  username: z.string().email("Invalid email address"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Signup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { username, firstName, lastName, password } = values;
      const requestData = {
        username: username.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        password: password.trim(),
      };
      const response = await axiosInstance.post("/user/signup", requestData);

      if (response.status === 200) {
        // console.log(response.data);
        toast({
          description: "Signup successful",
        });

        navigate("/dashboard/home");
      } else {
        toast({
          description: "error registering",
        });
      }
      // console.log(response);
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

          <motion.div
            className="flex flex-col justify-center items-center w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-4">Create your account</h1>
            <small className="mb-6">
              Start receiving and sending payments through Flow.
            </small>
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
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your firstname"
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
                          <Input placeholder="Enter your lastname" {...field} />
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
                            type={showPassword ? "text" : "password"}
                            {...field}
                          />
                        </FormControl>
                        <div className="flex items-center space-x-2 pt-2">
                          <Checkbox
                            id="showpassword"
                            onClick={handleShowPassword}
                          />
                          <label
                            htmlFor="showpassword"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
                          >
                            Show Password
                          </label>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    variant={"outline"}
                    type="submit"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Sign up
                  </Button>
                </form>
              </Form>

              <p className="mt-5 text-sm flex items-center gap-4 ">
                Already have an account?
                <Link to="/login" className="hover:underline">
                  Login here
                </Link>
              </p>
              <div className="flex flex-col gap-1 p-2 rounded-md  border dark:border-slate-50/30  mt-6">
                <span className="font-semibold">
                  Wanna just try out FlowPay?{" "}
                </span>
                <Link to="/login" className="hover:underline">
                  Go to Login
                </Link>
              </div>

              <Link to="/">
                <p className="mt-12 md:mt-24 text-sm flex items-center gap-4 cursor-pointer hover:underline">
                  <ArrowLeft />
                  Back to home page
                </p>
              </Link>
            </div>
          </motion.div>
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
export default Signup;
