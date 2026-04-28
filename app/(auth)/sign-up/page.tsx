"use client";

import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Check, Eye, EyeOff, X } from "lucide-react";
import axios, { AxiosError } from "axios";
import { $http, addAccessTokenToHttpInstance } from "@/lib/http";
import { storeAuthToken, validateToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import processError from "@/lib/error";
import { API_URL, APP_URL } from "@/lib/constants";
import { toast } from "sonner";

const signUpSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),
    email: z
      .string()
      .email()
      .toLowerCase()
      .trim()
      .min(2, "Email must be at least 2 characters"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .refine(
        (password) => {
          const hasUppercase = /[A-Z]/.test(password);
          const hasSpecialChar = /[!@#$%^&*(),.?:"|{}<>]/.test(password);
          const hasNumber = /[0-9]/.test(password);
          const hasMinLength = password.length >= 8;
          return hasUppercase && hasMinLength && hasSpecialChar && hasNumber;
        },
        {
          message:
            "Password must contain at least one uppercase letter, one special character, one number, and be at least 8 characters long.",
        },
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignUpFormField = z.infer<typeof signUpSchema>;

interface SignUpResponse {
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

const SignUp = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [showPasswordValidation, setShowPasswordValidation] =
    useState<boolean>(false);
  const [isValidSubmit, setIsValidSubmit] = useState<boolean>(false);
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGoogleAuthLoading, setIsGoogleAuthLoading] =
    useState<boolean>(false);
  const [passwordValidation, setPasswordValidation] = useState({
    hasUpperCase: false,
    hasSpecialChar: false,
    hasNumber: false,
    hasMinLength: false,
  });

  const form = useForm<SignUpFormField>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const watchPassword = form.watch("password");
  const watchConfirmPassword = form.watch("confirmPassword");

  useEffect(() => {
    const hasUpperCase = /[A-Z]/.test(watchPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?:"|{}<>]/.test(watchPassword);
    const hasNumber = /[0-9]/.test(watchPassword);
    const hasMinLength = watchPassword.length >= 8;

    setPasswordValidation({
      hasUpperCase,
      hasSpecialChar,
      hasNumber,
      hasMinLength,
    });

    if (watchPassword && watchPassword.length > 0) {
      setShowPasswordValidation(true);
    } else {
      setShowPasswordValidation(false);
    }
  }, [watchPassword]);

  useEffect(() => {
    if (watchConfirmPassword) {
      form.trigger("confirmPassword");
    }
  }, [watchPassword, watchConfirmPassword, form]);

  const passwordRequirements = [
    { key: "hasMinLength", label: "Password must be a minimum of 8 letters" },
    { key: "hasUpperCase", label: "An uppercase letter must be used" },
    { key: "hasNumber", label: "A number must be used" },
    { key: "hasSpecialChar", label: "A special character must be used" },
  ];

  const passwordsMatch =
    watchPassword && watchConfirmPassword === watchConfirmPassword;
  const passwordsDontMatch =
    watchPassword && watchConfirmPassword !== watchConfirmPassword;

  const onSubmit: SubmitHandler<SignUpFormField> = async (values) => {
    setIsLoading(true);

    try {
      const { data } = await $http.post<SignUpResponse>("/user", values);

      const decoded = validateToken(data.data.access_token);
      await storeAuthToken(data.data.access_token);
      addAccessTokenToHttpInstance(data.data.access_token);

      sessionStorage.setItem(
        "user_session",
        JSON.stringify({
          email: data.data.user.email,
          name: data.data.user.email,
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
    if (!form.formState.isValid || !acceptTerms) {
      setIsValidSubmit(false);
    } else {
      setIsValidSubmit(true);
    }
  }, [acceptTerms, form.formState.isValid]);

  const handleFormError = (errors: any) => {
    console.log("Form validation errors:", errors);
    // Show first error to user
    const firstErrorKey = Object.keys(errors)[0];
    if (firstErrorKey && errors[firstErrorKey]?.message) {
      toast.error(errors[firstErrorKey].message);
    }
  };

  return (
    <main className="bg-foreground w-screen h-screen">
      <section className="max-w-7xl mx-auto py-16 flex justify-between">
        <div className="w-150 bg-white rounded-2xl border border-[#66666650] px-20 pt-2 pb-12">
          <div className="flex justify-center">
            <Image src={"/logo.png"} alt="Logo" width={200} height={50} />
          </div>
          <div className="text-[#333333]">
            <h1 className="text-2xl mb-1 text-primary">Sign Up</h1>
            <p className="font-normal mb-4">
              Already have an account?{" "}
              <Link
                href={"/sign-in"}
                className="underline font-medium text-primary"
              >
                Log in
              </Link>
            </p>
            <form onSubmit={form.handleSubmit(onSubmit, handleFormError)}>
              <FieldGroup>
                <FieldSet>
                  <Field>
                    <FieldLabel>Full Name</FieldLabel>
                    <input
                      type="text"
                      placeholder="Enter full name"
                      {...form.register("name")}
                      required
                      autoComplete="off"
                      className="border border-[#66666659] h-14 w-full outline-none bg-transparent rounded-md px-2"
                    />
                    {/* {form.formState.errors.name && (
                                            <p className="text-sm text-red-600 mt-1" role="alert">
                                                {form.formState.errors.name.message}
                                            </p>
                                        )} */}
                  </Field>
                  <Field>
                    <FieldLabel>Email address</FieldLabel>
                    <input
                      type="email"
                      placeholder="Enter email"
                      {...form.register("email")}
                      required
                      autoComplete="off"
                      className="border border-[#66666659] h-14 w-full outline-none bg-transparent rounded-md px-2"
                    />
                    {/* {form.formState.errors.email && (
                                            <p className="text-sm text-red-600 mt-1" role="alert">
                                                {form.formState.errors.email.message}
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
                    {showPasswordValidation && (
                      <div>
                        {passwordRequirements.map(({ key, label }) => {
                          const isValid =
                            passwordValidation[
                              key as keyof typeof passwordValidation
                            ];
                          return (
                            <div key={key} className="flex items-center gap-2">
                              <div
                                className={`flex items-center justify-center w-4 h-4 rounded-sm border ${isValid ? "border-green-500 bg-green-500" : "border-red-500"}`}
                              >
                                {isValid && <Check size={14} color="white" />}
                              </div>
                              <p
                                className={`${isValid ? "text-green-600" : "text-red-600"}`}
                              >
                                {label}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    {/* {form.formState.errors.password && (
                                            <p className="text-sm text-red-600 mt-1" role="alert">
                                                {form.formState.errors.password.message}
                                            </p>
                                        )} */}
                  </Field>
                  <Field>
                    <FieldLabel>Confirm Password</FieldLabel>
                    <div className="flex items-center justify-between pr-3 border border-[#66666659] rounded-md h-14 w-full">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        {...form.register("confirmPassword")}
                        autoComplete="new-password"
                        aria-describedby="confirm-password-status"
                        className="border-none outline-none shadow-none bg-transparent px-2"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="cursor-pointer"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={16} color="black" />
                        ) : (
                          <Eye size={16} color="black" />
                        )}
                      </button>
                    </div>
                    {passwordsMatch && (
                      <div className="flex items-center gap-2 mt-2">
                        <Check size={14} color="text-green-500" />
                        <p className="text-sm text-green-500">
                          Passwords match
                        </p>
                      </div>
                    )}
                    {passwordsDontMatch && (
                      <div className="flex items-center gap-2 mt-2">
                        <X size={14} color="text-red-500" />
                        <p className="text-sm text-red-500">
                          Passwords don't match
                        </p>
                      </div>
                    )}
                    {form.formState.errors.confirmPassword && (
                      <p className="text-sm text-red-600 mt-1" role="alert">
                        {form.formState.errors.confirmPassword.message}
                      </p>
                    )}
                  </Field>
                </FieldSet>
              </FieldGroup>
              <div className="flex items-center gap-2 mt-3">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="accent-primary cursor-pointer"
                />
                <p className="text-sm">
                  By creating an account, I agree to our{" "}
                  <Link
                    href={"/terms-and-condition"}
                    className="underline text-primary"
                  >
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    href={"/privacy-policy"}
                    className="underline text-primary"
                  >
                    Privacy Policy
                  </Link>{" "}
                </p>
              </div>
              <button
                type="submit"
                disabled={isValidSubmit ? false : true}
                className={`rounded-3xl ${isValidSubmit ? "bg-primary" : "bg-[#11111125]"} text-white text-base flex items-center justify-center w-full py-5 mt-8 ${isValidSubmit ? "cursor-pointer" : "cursor-not-allowed"}`}
              >
                {isLoading ? "Creating..." : "Create an account"}
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
                {isGoogleAuthLoading ? "Signing up..." : "Sign up with Google"}
              </button>
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-semibold text-black mb-2">
              Shop with Anniqcleo
            </h2>
            <p className="w-100 text-xl text-black font-normal mb-8 text-center">
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

export default SignUp;
