const API_HOST =
  import.meta.env.VITE_API_HOST || "http://103.157.218.98:8866/api";

const BASE_URL = `${API_HOST}`;

const REST_APIS = {
  TRANSACTION: {
    DEPOSIT_TO_WALLET: "/deposit-service/wallet/deposit",
  },
};

export { REST_APIS };
export { API_HOST, BASE_URL };
