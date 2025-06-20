export type ProductResponse = {
  id: number,
  category: {
      en: string,
      ar: string
  },
  name: {
      en: string,
      ar: string
  },
  description: {
      en: string,
      ar: string
  },
  stock: number,
  price: number,
  image: string,
  hidden: boolean
};

export type ValueLocales = {
  en: string;
  ar: string;
}

export type Product = {
  id: number,
  category: ValueLocales,
  name: ValueLocales,
  description: ValueLocales,
  stock: number,
  price: number,
  image: string,
  hidden: boolean
};
export type LineItem = {
  product: Product;
  price: number;
  quantity: number;
};
export type Cart = {
  items: LineItem[];
  region: string;
};
export type CartEventProps = {
  action: "added" | "removed" | "cleared";
  item: LineItem
};

export type Locale = "en" | "ar";
export type LocaleOption = {
    label: string;
    value: Locales;
};

export type NewOrderRequest = {
  customer: {
      name: string;
      phone: string;
      email: string;
      address: {
          address1: string;
          street?: string;
          city: string;
          state: string;
      }
  },
  cart: any,
};

export type CbkResponseData = {
  tij_MerchantEncryptCode: string;
  tij_MerchAuthKeyApi: string;
  tij_MerchantPaymentLang: string;
  tij_MerchantPaymentAmount: number;
  tij_MerchantPaymentTrack: number;
  tij_MerchantPaymentRef: string;
  tij_MerchantUdf1: string;
  tij_MerchantUdf2: string;
  tij_MerchantUdf3: string;
  tij_MerchantUdf4: string;
  tij_MerchantUdf5: string;
  tij_MerchPayType: string;
  tij_MerchReturnUrl: string;
  url: string;
};

export type NewOrderResponse = {
  data: CbkResponseData;
  error: string;
};

type TransactionResult = {
  Status: number;
  Amount: string;
  TrackId: string;
  PayType: string;
  PaymentId: string;
  ReceiptNo: string;
  AuthCode: string;
  PostDate: string;
  ReferenceId: string;
  TransactionId: string;
  Message: string;
  PayId: string;
  MerchUdf1: string;
  MerchUdf2: string;
  MerchUdf3: string;
  CCMessage: "CAPTURED" | "CANCELLED",
  MerchUdf4: string;
  MerchUdf5: string;
};


export type State = {
  title: {
    en: string;
    ar: string;
  };
  areas: [
    {
      en: string;
      ar: string;
    }
  ]
};
