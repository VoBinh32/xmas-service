const filtersReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SORT_BY_AMOUNT":
      return {
        ...state,
        sortBy: "amount",
      };

    default:
      return state;
  }
};

export default filtersReducer;
