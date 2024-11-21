import { API } from 'aws-amplify';
import React, {
  createContext,
  useState,
  useEffect,
  useContext
} from 'react';
import { DINE_IN, TAKE_OUT } from '../constants/food';
import { AppContext } from './AppContext';
import {
  returnDayOfWeek,
  splitFullName
} from './formatStrings';
import {
  getMenus,
  getTables,
  getRestaurants,
  postOrder,
  getDiningOptions,
  updateOrderCheck,
  getMenusMetadata,
  getSchedules
} from './toastApiCalls';
import { listFoodOrdersByFoodOrderIdQuery } from './ToastContextHelpers';

const ToastContext = createContext();

const ToastContextProvider = ({ children }) => {
  /* Start AWS Based Data */
  const [latestAWSPayload, setLatestAWSPayload] = useState(
    {}
  );

  const getTableByGuid = guid => {
    const returnTable = Object.entries(tables).filter(
      table => table[1].guid === guid
    );
    return returnTable;
  };

  const getDiningOptionsByGuid = guid => {
    const returnDiningOption = diningOptions.filter(
      option => option.guid === guid
    );
    return returnDiningOption;
  };

  const buildSelections = selections => {
    const builtSelections = selections.map(selection => {
      const parsedModifiers = JSON.parse(
        selection.modifiers
      );

      const builtModifiers = parsedModifiers.map(
        modifier => {
          return {
            optionGroup: { guid: modifier.modifierGuid },
            item: {
              guid: modifier.selectionId?.replace(
                'ref_',
                ''
              )
            },
            quantity: selection.quantity
          };
        }
      );

      const builtSelection = {
        entityType: 'MenuItemSelection',
        itemGroup: {
          entityType: 'MenuGroup',
          guid: selection.itemGroupGuid
        },
        item: {
          entityType: 'MenuItem',
          guid: selection.itemGuid
        },
        quantity: selection.quantity,
        modifiers: builtModifiers
      };

      return builtSelection;
    });

    return builtSelections;
  };

  const buildOrderObject = foodOrder => {
    const {
      diningOptionGuid,
      diningOptionName,
      selections,
      tableGuid,
      userEmail,
      userName,
      modifiers,
      userPhone,
      orderTime
    } = foodOrder;

    const builtSelections = selections.map(selection => {
      const parsedModifiers = JSON.parse(
        selection.modifiers
      );

      const builtModifiers = parsedModifiers.map(
        modifier => {
          return {
            optionGroup: { guid: modifier.modifierGuid },
            item: {
              guid: modifier.selectionId?.replace(
                'ref_',
                ''
              )
            },
            quantity: selection.quantity
          };
        }
      );

      const builtSelection = {
        entityType: 'MenuItemSelection',
        itemGroup: {
          entityType: 'MenuGroup',
          guid: selection.itemGroupGuid
        },
        item: {
          entityType: 'MenuItem',
          guid: selection.itemGuid
        },
        quantity: selection.quantity,
        modifiers: builtModifiers
      };

      return builtSelection;
    });

    const splitName = splitFullName(userName);

    let order;

    if (diningOptionName === DINE_IN) {
      order = {
        entityType: 'Order',
        diningOption: {
          guid: diningOptionGuid,
          entityType: 'DiningOption'
        },
        checks: [
          {
            entityType: 'Check',
            selections: builtSelections,
            customer: {
              entityType: 'Customer',
              firstName: splitName[0],
              lastName: splitName[1],
              phone: '555-555-5555',
              email: userEmail
            }
          }
        ],
        table: { entityType: 'Table', guid: tableGuid },
        promisedDate: null
      };
    }

    if (diningOptionName === TAKE_OUT) {
      order2 = {
        entityType: 'Order',
        diningOption: {
          guid: diningOptionGuid,
          entityType: 'DiningOption'
        },
        checks: [
          {
            entityType: 'Check',
            selections: builtSelections,
            customer: {
              entityType: 'Customer',
              firstName: splitName[0],
              lastName: splitName[1],
              phone: '555-555-5555',
              email: userEmail
            }
          }
        ],
        promisedDate: orderTime
      };
    }

    console.log(`Build ${diningOptionName} Order`);

    return order;
  };

  const [submittedOrder, setSubmittedOrder] = useState({});

  const submitSingleOrder = () => {};

  const submitGroupOrder = () => {};

  /* End AWS Based Data */

  // restaurant[0][0] = first restaurant's GUID
  // restaurant[0][1] = first restaurant's data
  // menu[0][0] = first menu's GUID
  // menu[0][1] = first menu's data

  const { setToastLoaded } = useContext(AppContext);

  // Restaurant and Menu State Information

  const [restaurant, setRestaurant] = useState(null);
  const [menus, setMenus] = useState(null);
  const [tables, setTables] = useState({});
  const [diningOptions, setDiningOptions] = useState([]);
  const [openTimes, setOpenTimes] = useState({
    openTime: '',
    closeTime: ''
  });
  const [
    modifierGroupReferences,
    setModifierGroupReferences
  ] = useState(null);
  const [
    modifierOptionReferences,
    setModifierOptionReferences
  ] = useState(null);
  const [
    preModifierGroupReferences,
    setPreModifierGroupReferences
  ] = useState(null);

  // Tab Ordering State Information / Functions
  const [closeTabAlert, setCloseTabAlert] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedDiningOption, setSelectedDiningOption] =
    useState(null);
  const [customerData, setCustomerData] = useState({
    entityType: 'Customer'
  });
  const [orderTime, setOrderTime] = useState(null);

  /* console.log('diningOption', selectedDiningOption);
  console.log('table', selectedTable);
  console.log('customerData', customerData);
  console.log('orderTime', orderTime); 
  console.log('customerData', customerData); */

  const clearTab = async () => {
    try {
      const selectionIdsToDelete =
        latestAWSPayload.selections.map(
          selection => selection.id
        );

      const { data: selectionDeleteRes } =
        await API.graphql({
          query: `mutation DeleteSelectionsById($ids: [ID]){
                          deleteSelectionsById(ids: $ids ) 
                            {
                              id
                            }
                        }`,
          variables: { ids: selectionIdsToDelete }
        });

      const { data: payloadRes } = await API.graphql({
        query: listFoodOrdersByFoodOrderIdQuery(
          latestAWSPayload.id
        )
      });

      setLatestAWSPayload(
        payloadRes.listFoodOrders.items[0]
      );
    } catch (error) {
      console.log('Error clearing all selections');
      console.log(error);
    }
  };

  useEffect(async () => {
    const schedules = await getSchedules();
    try {
      const { weekSchedule, daySchedules } =
        schedules.schedules;

      const todayScheduleID =
        weekSchedule[returnDayOfWeek()];
      const { openTime, closeTime } =
        daySchedules[todayScheduleID];

      setOpenTimes({ openTime, closeTime });
    } catch (error) {
      console.log('Error with Schedules');
    }
  }, []);

  useEffect(async () => {
    const menus = await getMenus();

    try {
      const menuArray = Object.entries(menus.menus).filter(
        menu => {
          return menu[1].visibility.includes(
            'TOAST_ONLINE_ORDERING'
          );
        }
      );

      setMenus(menuArray);
    } catch (error) {
      console.log('Error with Menu Data ', error);
    }

    const restaurantTables = await getTables();
    const diningOptions = await getDiningOptions();

    setTables(restaurantTables);
    setDiningOptions(diningOptions);
    setToastLoaded(true);
  }, []);

  return (
    <ToastContext.Provider
      value={{
        restaurant,
        menus,
        tables,
        diningOptions,
        openTimes,
        modifierGroupReferences,
        modifierOptionReferences,
        preModifierGroupReferences,
        closeTabAlert,
        setCloseTabAlert,
        clearTab,
        selectedTable,
        setSelectedTable,
        selectedDiningOption,
        setSelectedDiningOption,
        customerData,
        setCustomerData,
        setOrderTime,
        orderTime,
        setLatestAWSPayload,
        latestAWSPayload,
        getTableByGuid,
        getDiningOptionsByGuid,
        buildOrderObject,
        buildSelections,
        submitSingleOrder,
        submitGroupOrder,
        submittedOrder,
        setSubmittedOrder
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export { ToastContext, ToastContextProvider };
