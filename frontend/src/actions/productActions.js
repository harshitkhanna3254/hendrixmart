import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  CLEAR_PRODUCT_DETAILS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
} from "../constants/productConstants";

import axios from "axios";

export const listProducts = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });

      const { data } = await axios.get("/api/products");

      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const listProductDetails = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_DETAIL_REQUEST });

      const { data } = await axios.get(`/api/products/${id}`);

      dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAIL_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const clearProductDetails = () => async (dispatch) => {
  dispatch({ type: CLEAR_PRODUCT_DETAILS, payload: {} });
};

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_DELETE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.delete(`/api/products/${id}`, config);

      dispatch({ type: PRODUCT_DELETE_SUCCESS });
    } catch (error) {
      dispatch({
        type: PRODUCT_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
