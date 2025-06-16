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

export type Product = {
  id: number,
  category: string,
  name: string,
  description: string,
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
