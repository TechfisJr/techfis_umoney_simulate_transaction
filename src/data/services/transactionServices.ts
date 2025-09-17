import { api } from "../api/config";

import { REST_APIS } from "../../constants";

class TransactionServices {
  depositToWallet = async ({ ...props }) => {
    try {
      const response = await api.post(
        `${REST_APIS.TRANSACTION.DEPOSIT_TO_WALLET}`,
        {
          ...props,
        }
      );

      if (response.status === 200) {
        return response.data.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
}

const transactionServices = new TransactionServices();

export default transactionServices;
