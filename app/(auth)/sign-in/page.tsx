"use client";

import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { storeAuthToken, validateToken } from "@/lib/auth";
import { API_URL } from "@/lib/constants";
import processError from "@/lib/error";
import { $http, addAccessTokenToHttpInstance } from "@/lib/http";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const signInSchema = z.object({
  username: z
    .string()
    .email()
    .toLowerCase()
    .trim()
    .min(2, "Email must be at least 2 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignInFormField = z.infer<typeof signInSchema>;

interface SignInResponse {
  data: {
    access_token: string;
    refresh_token: string;
    user: {
      name: string;
      email: string;
      id: string;
    };
  };
}

const SignIn = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGoogleAuthLoading, setIsGoogleAuthLoading] =
    useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isValidSubmit, setIsValidSubmit] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<SignInFormField>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<SignInFormField> = async (values) => {
    setIsLoading(true);
    setError("");

    try {
      // Call FastAPI backend
      const { data } = await $http.post<SignInResponse>("/auth/login", values);

      const decoded = validateToken(data.data.access_token);
      await storeAuthToken(data.data.access_token);
      addAccessTokenToHttpInstance(data.data.access_token);

      // Store user data
      sessionStorage.setItem(
        "user_session",
        JSON.stringify({
          email: data.data.user.email,
          name: data.data.user.name,
        }),
      );

      const redirectUri = searchParams.get("redirectUri");
      router.push(redirectUri || "/");
      router.refresh();
    } catch (error) {
      console.error("Sign in error:", error);
      if (error instanceof AxiosError) {
        processError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = () => {
    setIsGoogleAuthLoading(true);
    window.location.href = `${API_URL}/auth/google`;
  };

  useEffect(() => {
    if (!form.formState.isValid) {
      setIsValidSubmit(false);
    } else {
      setIsValidSubmit(true);
    }
  }, [form.formState.isValid]);

  const handleFormError = (errors: any) => {
    console.log("Form validation errors:", errors);
    // Show first error to user
    const firstErrorKey = Object.keys(errors)[0];
    if (firstErrorKey && errors[firstErrorKey]?.message) {
      toast.error(errors[firstErrorKey].message);
    }
  };

  return (
    <main className="w-screen h-screen bg-foreground">
      <section className="max-w-7xl mx-auto py-16 flex justify-between">
        <div className="w-150 bg-white rounded-2xl border border-[#66666650] px-20 pt-2 pb-12">
          <div className="flex justify-center">
            <Image src={"/logo.png"} alt="Logo" width={200} height={50} />
          </div>
          <div className="text-[#333333]">
            <h1 className="text-2xl mb-1 text-primary">Sign In</h1>
            <p className="font-normal mb-4">
              Don't have an account?{" "}
              <Link
                href={"/sign-up"}
                className="underline font-medium text-primary"
              >
                Sign up
              </Link>
            </p>
            <form onSubmit={form.handleSubmit(onSubmit, handleFormError)}>
              <FieldGroup>
                <FieldSet>
                  <Field>
                    <FieldLabel>Email address</FieldLabel>
                    <input
                      type="email"
                      placeholder="Enter email"
                      {...form.register("username")}
                      required
                      autoComplete="off"
                      className="border border-[#66666659] h-14 w-full outline-none bg-transparent rounded-md px-2"
                    />
                    {/* {form.formState.errors.username && (
                                            <p className="text-sm text-red-600 mt-1" role="alert">
                                                {form.formState.errors.username.message}
                                            </p>
                                        )} */}
                  </Field>
                  <Field>
                    <FieldLabel>Password</FieldLabel>
                    <div className="flex items-center justify-between pr-3 border border-[#66666659] rounded-md h-14 w-full">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...form.register("password")}
                        required
                        autoComplete="new-password"
                        aria-describedby="password-requirements"
                        className="outline-none border-none shadow-none bg-transparent px-2"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        type="button"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        className="cursor-pointer"
                      >
                        {showPassword ? (
                          <EyeOff size={16} color="black" />
                        ) : (
                          <Eye size={16} color="black" />
                        )}
                      </button>
                    </div>
                    {/* {form.formState.errors.password && (
                                            <p className="text-sm text-red-600 mt-1" role="alert">
                                                {form.formState.errors.password.message}
                                            </p>
                                        )} */}
                  </Field>
                </FieldSet>
              </FieldGroup>
              <button
                type="submit"
                disabled={isLoading || !isValidSubmit}
                className={`rounded-3xl ${isValidSubmit ? "bg-primary" : "bg-[#11111125]"} text-white text-base flex items-center justify-center w-full py-5 mt-8 ${isValidSubmit ? "cursor-pointer" : "cursor-not-allowed"}`}
              >
                {isLoading ? "Signing in..." : "Sign in to your account"}
              </button>
            </form>
            <div className="flex items-center justify-between gap-6 text-base text-[#666666] mt-5">
              <span className="h-px w-full bg-[#666666]" />
              OR
              <span className="h-px w-full bg-[#666666]" />
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={signInWithGoogle}
                disabled={isGoogleAuthLoading || isLoading}
                className="w-62.5 flex items-center justify-center gap-4 border border-[#333333] rounded-3xl text-[#333333] text-sm py-3 cursor-pointer"
              >
                <Image
                  src="/images/google_logo.png"
                  alt="Google Logo"
                  width={16}
                  height={16}
                />
                {isGoogleAuthLoading ? "Signing in..." : "Sign in with Google"}
              </button>
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-semibold text-black mb-2">
              Shop with Anniqcleo
            </h2>
            <p className="w-100 text-xl text-black mb-8 text-center">
              Shop our complete range of botanical powered skincare essentials.
            </p>
            <Image
              src={"/images/contact1.avif"}
              alt="Content"
              width={400}
              height={400}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignIn;
