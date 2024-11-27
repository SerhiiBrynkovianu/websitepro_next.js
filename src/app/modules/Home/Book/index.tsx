"use client";
import React, { useEffect, useState } from "react";

import styles from "./styles.module.scss";
import { Map, Step1, Step2, Step3 } from "./components";
import { MapProvider } from "@/app/providers/map-provider";
import { CarQuote, CarType } from "@/app/interfaces/car";
import { axiosInstance } from "@/app/utils";
import { getBookingRequestBody } from "@/app/utils/book";
import { SelectItem } from "@/app/components/Select/select.types";
import { carseatList, meetList, passList, petList } from "@/app/constants/cars";
import { toast } from "react-toastify";

export interface Form {
  from?: Partial<google.maps.places.AutocompletePrediction>;
  to?: Partial<google.maps.places.AutocompletePrediction>;
  date?: Date | null;
  hour?: string;
  minute?: string;
  dayTime?: "AM" | "PM";
  pass_number?: SelectItem;
  pet?: SelectItem;
  carseat?: SelectItem;
  meet?: SelectItem;
  cars?: {
    [key in CarType]: CarQuote;
  };
  car?: CarType;
  isNow?: boolean;
  paymentId?: string;
  name?: string;
  phone?: string;
  email?: string;
}

const steps = [
  {
    component: Step1,
  },
  {
    component: Step2,
  },
  {
    component: Step3,
  },
];

const initValues = {
  pass_number: passList[0],
  pet: petList[0],
  carseat: carseatList[0],
  meet: meetList[0],
  // from: {
  //   description: "1 Elizabeth Street, New York, NY, USA",
  //   place_id: "ChIJmX62ACdawokR02NfgvQNL10",
  // },
  // to: {
  //   description: "150 Elizabeth Street, New York, NY, USA",
  //   place_id: "ChIJY5PfgohZwokRVh_MGOK-Oqo",
  // },
  // date: moment().add(3, "days").toDate(),
  // hour: hours[0],
  // minute: minutes[0],
  // dayTime: dayTimes[0],
};
const Book = () => {
  const [step, setStep] = useState<number>(0);
  const [form, setForm] = useState<Form>(initValues);
  const [quote, setQuote] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const activeStep = steps[step];

  console.log(form);

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 0)); // Move back one step, but don't go below 0
  };

  const updateForm = (data: Partial<Form>) => {
    setForm((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const validateBooking = async (
    cartype: CarType,
    values?: Partial<Form>
  ): Promise<CarQuote | undefined> => {
    try {
      const resp = await axiosInstance.post(`includes/ajax/_booking2.php`, {
        method: "validate_booking",
        params: getBookingRequestBody({ ...form, ...values }, cartype),
      });
      if (resp.data?.success) {
        const quoteResp = await axiosInstance.post(
          `includes/ajax/_booking_quote2.php`,
          { method: "get_quote" }
        );
        const quote = quoteResp.data?.results?.quote;
        const car = {
          price: quote?.pricing?.subtotal,
          travel_time: quote?.travel_time?.label,
        };
        console.log({ car });

        return car;
      }
      console.log(resp);
    } catch (e) {
      console.log(e);
    }
  };

  const validateBookings = async () => {
    setLoading(true);
    const eco_sd = await validateBooking("eco_sd");
    const eco_mv = await validateBooking("eco_mv");
    const eco_suv = await validateBooking("eco_suv");
    updateForm({
      cars: {
        eco_sd: eco_sd as CarQuote,
        eco_mv: eco_mv as CarQuote,
        eco_suv: eco_suv as CarQuote,
      },
    });
    setLoading(false);
  };

  const getQuote = async () => {
    try {
      const resp = await axiosInstance.post(
        `includes/ajax/_booking_quote2.php`,
        {
          method: "show_quote",
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      setQuote(resp.data);
      console.log(resp);
    } catch (e) {
      console.log(`[getQuote] err:`, e);
    }
  };

  const createOrder = async (paymentId: string) => {
    try {
      setLoading(true);
      const resp = await axiosInstance.post(`includes/ajax/_booking2.php`, {
        method: "book",
        paymentId,
      });
      toast.success("Created");
      setForm(initValues);
      setStep(0);
      setQuote("");
      console.log("here", resp);
      setLoading(false);
    } catch (e) {
      toast.error("Something went wrong");
      setLoading(false);
      console.log(`[getQuote] err:`, e);
    }
  };
  const nextStep = async (paymentId?: string) => {
    if (step === 0) {
      await validateBookings();
    }
    if (step === 1) {
      await validateBooking(form.car as CarType);
      await getQuote();
    }
    if (step === 2) {
      await createOrder(paymentId ?? "");
      return;
    }
    setStep((prev) => {
      const newStep = prev + 1;
      if (!steps[newStep]) {
        return prev;
      }
      return newStep;
    });
  };

  const getProfile = async (values: Partial<Form>) => {
    try {
      await axiosInstance.post(`includes/ajax/_booking2.php`);
      await validateBooking(form.car as CarType, values);
    } catch (e) {
      console.log(`[getProfile] err:`, e);
    }
  };

  useEffect(() => {
    if (step === 1) {
      validateBookings();
    }
  }, [form.pass_number, form.pet, form.carseat, form.meet]);

  return (
    <div id="reservation-section" className={styles.book}>
      <div className="container">
        <MapProvider>
          <div className={styles.book__inner}>
            <div className={styles.book__map}>
              <Map form={form} />
            </div>
            <div className={styles.book__content}>
              <activeStep.component
                onSubmit={nextStep}
                onBack={prevStep}
                form={form}
                updateForm={updateForm}
                loading={loading}
                getProfile={getProfile}
                setLoading={setLoading}
              />
            </div>
          </div>
        </MapProvider>
        <div
          className={styles.hidden}
          dangerouslySetInnerHTML={{ __html: quote }}
        />
      </div>
    </div>
  );
};

export default Book;
