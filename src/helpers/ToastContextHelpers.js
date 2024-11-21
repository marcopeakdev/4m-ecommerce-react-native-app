// Return price of all selections given the users latestAWSPayload object
export const getPriceOfTab = payload => {
  const { selections } = payload;

  let price = 0;

  if (selections?.length > 0) {
    selections.forEach(selection => {
      price = price + selection.price * selection.quantity;
    });
  }

  return price;
};

export const getPriceOfAllTabs = payload => {
  let price = 0;

  if (payload?.length > 0) {
    payload.forEach(tab => {
      tab?.selections.forEach(selection => {
        price =
          price + selection.price * selection.quantity;
      });
    });
  }

  return price;
};

export const listFoodOrdersByGroupIdQuery = groupId => {
  return `query {
      listFoodOrders(filter: {groupId: {eq: "${groupId}"}}) {
      items {
        id
        userName
        selections {
          id
          quantity
          price
          name
          itemGuid
          itemGroupGuid
          foodOrderId
          modifiers
        }
        orderSubmitted
        orderTime
        orderGuid
        checkGuid
        groupId
        diningOptionGuid
        diningOptionName
        inviteAccepted
        readyToSubmit
        singlePayee
        tableGuid
        tableName
        userEmail
        userPhone
      }
    }
  }`;
};

export const listFoodOrdersByFoodOrderIdQuery =
  foodOrderId => {
    return `query {
          listFoodOrders(filter: {id: {eq: "${foodOrderId}"}}) {
          items {
            id
            userName
            selections {
              id
              quantity
              price
              name
              itemGuid
              itemGroupGuid
              foodOrderId
              modifiers
            }
            orderGuid
            checkGuid
            orderSubmitted
            orderTime
            groupId
            diningOptionGuid
            diningOptionName
            inviteAccepted
            readyToSubmit
            singlePayee
            tableGuid
            tableName
            userEmail
            userPhone
          }
        }
      }`;
  };

export const testFoodOrdersByFoodOrderIdQuery =
  foodOrderId => {
    return {
      query: `query FoodOrdersByFoodOrderId($id: ID){
        listFoodOrders(filter: {id: {eq: $id}}) {
          items {
            id
            userName
            selections {
              id
              quantity
              price
              name
              itemGuid
              itemGroupGuid
              foodOrderId
              modifiers
            }
            orderGuid
            checkGuid
            orderSubmitted
            orderTime
            groupId
            diningOptionGuid
            diningOptionName
            inviteAccepted
            readyToSubmit
            singlePayee
            tableGuid
            tableName
            userEmail
            userPhone
          }
        }
      }`,
      variables: { id: foodOrderId }
    };
  };

export const deleteFoodOrderById = id => {
  return {
    query: `mutation DeleteFoodOrder($id: ID!) {
      deleteFoodOrder(input: {id: $id}) {
        id
      }
    
    }`,
    variables: { id: id }
  };
};

export const parseModifierOptionData = data => {
  return data.map(item => {
    return {
      isDefault: item.isDefault,
      leftTitle: item.name,
      guid: item.guid,
      value: item.price ? item.price : 0,
      rightTitle: item.price
        ? '+$' + item.price.toFixed(2)
        : ''
    };
  });
};
