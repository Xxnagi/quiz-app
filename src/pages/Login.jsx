"use client";
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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/api/firebaseConfig";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);

    const { username, password } = data;

    try {
      await signInWithEmailAndPassword(auth, username, password);
      navigate("/home");
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
          <CardTitle className="text-3xl">Login</CardTitle>
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
                      <Input placeholder="Enter your email" {...field} />
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
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center">
            <p className="text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Create one
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
