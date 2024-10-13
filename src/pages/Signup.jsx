"use client"; // Keep this if you're using a client component in a Vite app
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
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Adjust the path as necessary
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { auth } from "@/api/firebaseConfig";

const SignUp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm();
  const navigate = useNavigate(); // Initialize useNavigate

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);

    const { username, password } = data;

    try {
      await createUserWithEmailAndPassword(auth, username, password);
      alert("Account created successfully!");
      // Redirect to the login page after successful sign-up
      navigate("/login"); // Use navigate instead of router.push
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-[350px] flex flex-col items-center justify-center">
        <CardHeader>
          <CardTitle className="text-3xl">Sign Up</CardTitle>
        </CardHeader>
        <CardContent className="min-w-full">
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors?.username?.message}
                    </FormMessage>
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
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors?.password?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating..." : "Sign Up"}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center">
            <p className="text-sm">
              Already have an account?{" "}
              <span
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => navigate("/login")} // Use navigate to go to login page
              >
                Log in
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
