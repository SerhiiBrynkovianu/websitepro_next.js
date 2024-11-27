"use client";
import React, { useEffect, useState } from "react";

import styles from "./styles.module.scss";
import { CheckoutForm } from "@/app/components";
import RoadInput from "../RoadInput";
import { StepProps } from "../components.types";
import CarRender from "../CarRender";
import classNames from "classnames";
import { cars } from "@/app/constants/cars";
import { Car } from "@/app/interfaces/car";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const STRIPE_PUBLISHABLE_KEY = "STRIPE_PUBLISHABLE_KEY";
const STRIPE_CLIENT_SECRET = "STRIPE_CLIENT_SECRET";

const Step3 = ({
  onSubmit = () => {},
  form,
  updateForm,
  getProfile,
  setLoading,
  loading,
}: StepProps) => {
  const [secretKey, setSecretKey] = useState<string>();
  const [publicKey, setPublicKey] = useState<string>();

  useEffect(() => {
    const sk = (
      document.getElementById(STRIPE_CLIENT_SECRET) as HTMLInputElement
    )?.value;
    const pk = (
      document.getElementById(STRIPE_PUBLISHABLE_KEY) as HTMLInputElement
    )?.value;
    console.log({ sk, pk });

    setPublicKey(pk);
    setSecretKey(sk);
  }, []);
  const options = {
    clientSecret: secretKey,
  };

  return publicKey && secretKey ? (
    <Elements stripe={loadStripe(publicKey)} options={options}>
      <div className={styles.step}>
        <RoadInput form={form} updateForm={updateForm} disabled />
        <CarRender
          className={classNames(styles.step__car, "showOn")}
          car={
            {
              ...cars.find((el) => el.cartype === form.car),
              ...form.cars?.[form.car ?? "eco_sd"],
            } as Car
          }
        />
        <div className={classNames(styles.step__title, "showOn")}>
          One more step!
        </div>

        <div className={classNames(styles.step__inputs)}>
          <CheckoutForm
            onSuccess={(paymentId) => {
              onSubmit(paymentId);
            }}
            getProfile={getProfile}
            loading={loading}
            setLoading={setLoading}
          />
        </div>
      </div>
    </Elements>
  ) : null;
};

export default Step3;
