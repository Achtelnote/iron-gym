"use client";

import { useLocale, useTranslations } from "next-intl";
import { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdError } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";

import useCart from "@/app/hooks/cart";
import Button from "@/components/button";
import InputField from "@/components/form/input-field";
import Select from "@/components/form/select";
import Logo from "@/components/logo";
import { ProductImage } from "@/components/product-thumbnail";
import { Typography } from "@/components/typography";
import { CbkResponseData, NewOrderRequest } from "@/types";
import states from "@/public/states.json";


// TODO: Redo this whole garbage wtf
export default function CheckoutPage() {
  const t = useTranslations("checkout");

  return (
    <div className="w-[80%] h-full fhd:w-[var(--content-width)] flex flex-col m-auto pb-20 pt-[75px]">
      <Typography variant="title" weight="thin" className="hidden hd:block p-8 fhd:py-16 uppercase">
        {t("checkout")}
      </Typography>
      <Typography variant="title" weight="medium" className="hd:hidden text-2xl! p-8 uppercase">
        {t("checkout")}
      </Typography>
      <div className="grow grid grid-cols-1 hd:grid-cols-[5fr_6fr] gap-8 fhd:gap-16">
        <CheckoutOrderSummary />
        <CheckoutForm />
      </div>
    </div>
  );
}

function CheckoutOrderSummary() {
  const t = useTranslations("checkout");
  const tCommon = useTranslations("common");
  const { cart } = useCart();
  const locale = useLocale() as "ar" | "en";
  const totalPrice = useMemo(() => {
    let total = 0;
    cart.items.forEach(i => {
      total += i.product.price * i.quantity;
    });
    return total;
  }, [cart]);

  return (
    <div className="hidden flex-1 hd:flex flex-col gap-8 p-8 px-6 fhd:px-12 rounded-tl-4xl rounded-br-4xl bg-[var(--primary)]">
      <Logo className="h-[50px] w-[200px] fhd:w-[250px]" />
      <Typography variant="subtitle" weight="light" className="text-2xl! fhd:text-3xl! mt-2">
        {t("orderSummary")}
      </Typography>
      <div className="hd:max-h-[calc(100vh-400px)] fhd:max-h-[calc(100vh-650px)] 2k:max-h-auto flex flex-col gap-2 py-4 overflow-y-auto">
        {
          cart.items.map((i) => (
            <div key={`checkout-cart-item-${i.product.id}`} className="max-h-25   grid grid-cols-[80px_1fr] gap-2">
              <ProductImage image={i.product.image} className="rounded-md! w-full max-h-[80px]" />
              <div className="overflow-hidden px-1">
                <Typography className="truncate">{i.product.name[locale]}</Typography>
                <div className="flex justify-between mt-2">
                  <Typography capitalized>{t("quantity")}</Typography>
                  <Typography>{i.quantity}</Typography>
                </div>
                <div className="flex justify-between">
                  <Typography capitalized>{t("total")}</Typography>
                  <Typography>{tCommon("price", { price: i.product.price * i.quantity, currency: "kwd" })}</Typography>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <div className="flex-1 grow"></div>
      <div className="flex justify-between">
        <Typography variant="subtitle" weight="light" className="text-2xl! fhd:text-3xl!">
          {t("total")}
        </Typography>
        <Typography variant="subtitle" weight="light" className="text-2xl! fhd:text-3xl!">
          { tCommon("price", { price: totalPrice, currency: "kwd" }) }
        </Typography>
      </div>
    </div>
  );
}

type CheckoutForm = {
  personalDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  },
  paymentDetails: {
    Name: string;
    cardNumber: string;
    cvv: string;
    expirationDate: string;
  },
  shippingDetails: {
    address1: string;
    city: string;
    state: string;
  },
};

function CheckoutForm() {
  const {
    register,
    handleSubmit,
    watch,
  } = useForm<CheckoutForm>();
  const t = useTranslations("checkout");
  const locale = useLocale();
  const { cart } = useCart();
  const {
    mutate,
    isPending,
    isError
  } = useMutation({
    mutationKey: ["newOrder"],
    mutationFn: async (data: NewOrderRequest) => {
      // TODO: Move to api.ts
      const req = await fetch(`/api/orders/`, { method: "POST", body: JSON.stringify(data) });
      if (req.status != 201) {
        throw new Error("Failed to submit order");
      }
      const json = await req.json() as CbkResponseData;
      
      // Add validation
      const url = json.url;

      const form = document.createElement("form");
      form.method = "POST";
      form.action = url;
      form.enctype = "application/x-www-form-urlencoded";
      Object.entries(json).forEach(([k, v]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = k;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        input.value = v as any;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();

      return json;
    },
    onError: () => {
      // TODO: Inform user the purchase failed
    }
  });

  const onSubmitForm: SubmitHandler<CheckoutForm> = (data) => {
    const order = {
      customer: {
          name: `${data.personalDetails.firstName} ${data.personalDetails.lastName}`,
          phone: data.personalDetails.phone,
          email: data.personalDetails.email,
          address: {
              address1: data.shippingDetails.address1,
              city: data.shippingDetails.city,
              state: data.shippingDetails.state,
          }
      },
      cart: cart.items.map((i) => ({
        id: i.product.id,
        quantity: i.quantity
      })),
    };

    mutate(order);
  };

  const selectedState = watch("shippingDetails.state");
  const cities = useMemo(() => {
    const state = states.find((s) => s.title[locale as "en" | "ar"] == selectedState);
    if (state) 
      return state.areas.map((s) => ({ label: s[locale as "en" | "ar"], value: s[locale as "en" | "ar"] }));
    return [];
  }, [selectedState, locale])

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="h-full w-full flex flex-col flex-1 hd:pt-12">
      <Typography variant="title1" weight="semibold" className="hidden hd:block w-full">
        {t("completeYourOrder")}
      </Typography>
      <div className="w-full hd:mt-8">
        <Typography variant="body1" weight="light">
          {t("personalDetails")}
        </Typography>
        <div className="flex flex-col hd:flex-row gap-4 mt-4">
          <InputField block {...register("personalDetails.firstName")} label={t("firstName")} />
          <InputField block {...register("personalDetails.lastName")} label={t("lastName")} />
        </div>
        <div className="flex flex-col hd:flex-row gap-4 mt-4">
          <InputField block {...register("personalDetails.email")} type="email" label={t("email")} />
          <InputField required block {...register("personalDetails.phone")} type="tel" label={t("phoneNumber")} />
        </div>
      </div>
      {/* <div className="w-full mt-8">
        <Typography variant="body1" weight="light">
          Payment Details
        </Typography>
        <div className="w-14 p-2 mt-4 bg-white rounded-md">
          <img src="/knet.png" />
        </div>
        <div className="hd:flex gap-4 mt-4">
          <InputField block {...register("paymentDetails.Name")} label="Name" placeholder="John Doe" />
          <InputField block {...register("paymentDetails.cardNumber")} label="Cart Number" placeholder="1234 5678 XXXX XXXX" />
        </div>
        <div className="hd:flex gap-4 mt-4">
          <InputField block {...register("paymentDetails.cvv")} label="CVV" placeholder="123" />
          <InputField block {...register("paymentDetails.expirationDate")} label="Expiration Date" placeholder="MM/YY" pattern="\d{2}/\d{2}" onKeyUp={formatString} />
        </div>
      </div> */}
      <div className="w-full mt-8">
        <Typography variant="body1" weight="light">
          {t("shippingAddress")}
        </Typography>
        <InputField block {...register("shippingDetails.address1")} label={t("address1")} className="mt-4" />
        <div className="flex flex-col hd:flex-row gap-4 mt-4">
          {/* <Select
            block
            label={t("city")}
            options={states.find((s) => s.title.en == selectedState)?.areas.map((s) => ({ key: s[locale as "en" | "ar"], value: s.en }))}
            {...register("shippingDetails.city")}
          /> */}
          <InputField block {...register("shippingDetails.city")} label={t("city")} dataList={cities} />
          <Select
            block
            label={t("state")}
            options={states.map((s) => ({ label: s.title[locale as "en" | "ar"], value: s.title.en }))}
            {...register("shippingDetails.state")}
          />
          {/* <InputField block {...register("shippingDetails.state")} label={t("state")} placeholder={t("placeholder.state")} /> */}
        </div>
      </div>
      <div className="">
        <Typography className={`text-red-400! flex items-center gap-2 ${isError ? "" : "invisible"}`}>
          <MdError size={16} className="animate-pulse" />
          {t("orderFailed")}
        </Typography>
        <Button block label={t("confirmOrder")} className="mt-2" loading={isPending} />
      </div>
    </form>
  );
}
