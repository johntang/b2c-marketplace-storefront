"use client";
import {
  FieldError,
  FieldValues,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import { Button } from "@/components/atoms";
import { zodResolver } from "@hookform/resolvers/zod";
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink";
import { LabeledInput } from "@/components/cells";
import { registerFormSchema, RegisterFormData } from "./schema";
import { signup } from "@/lib/data/customer";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import useCommonTranslation from "@/hooks/useCommonTranslation";

export const RegisterForm = () => {
  const methods = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
};

const Form = () => {
  const [error, setError] = useState();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const submit = async (data: FieldValues) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("first_name", data.firstName);
    formData.append("last_name", data.lastName);
    formData.append("phone", data.phone);

    const res = await signup(formData);

    if (res && !res?.id) setError(res);
  };

  const t = useTranslations("RegisterPage");

  const commonT = useCommonTranslation();
  return (
    <main className="container">
      <h1 className="heading-xl text-center uppercase my-6">{t("title")}</h1>
      <form onSubmit={handleSubmit(submit)}>
        <div className="w-96 max-w-full mx-auto space-y-4">
          <LabeledInput
            label={commonT("firstName")}
            error={errors.firstName as FieldError}
            {...register("firstName")}
          />
          <LabeledInput
            label={commonT("lastName")}
            error={errors.lastName as FieldError}
            {...register("lastName")}
          />
          <LabeledInput
            label={commonT("email")}
            error={errors.email as FieldError}
            {...register("email")}
          />
          <LabeledInput
            label={commonT("password")}
            type="password"
            error={errors.password as FieldError}
            {...register("password")}
          />
          <LabeledInput
            label={commonT("confirmPassword")}
            type="password"
            error={errors.confirmPassword as FieldError}
            {...register("confirmPassword")}
          />
          <LabeledInput
            label={commonT("phone")}
            error={errors.phone as FieldError}
            {...register("phone")}
          />
          {error && <p className="label-md text-negative">{error}</p>}
          <Button
            className="w-full flex justify-center"
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            {commonT("register")}
          </Button>
          <p className="text-center label-md">
            {t("haveAnAccount")}{" "}
            <LocalizedClientLink href="/user" className="underline">
              {commonT("login")}!
            </LocalizedClientLink>
          </p>
        </div>
      </form>
    </main>
  );
};
