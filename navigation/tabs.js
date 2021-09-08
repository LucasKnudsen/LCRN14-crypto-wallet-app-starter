import React from 'react'
import { TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSelector } from 'react-redux'
import { setTradeModalVisibility } from '../stores/tab/tabActions'

import { Home, Portfolio, Market, Profile } from '../screens'
import { TabIcon } from '../components'
import { COLORS, icons } from '../constants'
import store from '../stores/configureStore'

const Tab = createBottomTabNavigator()

const TabBarCustomButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  )
}

const Tabs = () => {
  const { isTradeModalVisible } = useSelector((state) => state.tabReducer)

  const tradeTabButtonClickHandler = () => {
    store.dispatch(setTradeModalVisibility(!isTradeModalVisible))
  }

  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: COLORS.primary,
          borderTopColor: 'transparent',
          height: 140,
        },
      }}>
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            if (!isTradeModalVisible) {
              return <TabIcon focused={focused} icon={icons.home} label='Home' />
            }
          },
        }}
        listeners={{
          tabPress: (event) => {
            if (isTradeModalVisible) {
              event.preventDefault()
            }
          },
        }}
      />
      <Tab.Screen
        name='Portfolio'
        component={Portfolio}
        options={{
          tabBarIcon: ({ focused }) => {
            if (!isTradeModalVisible) {
              return <TabIcon focused={focused} icon={icons.briefcase} label='Portfolio' />
            }
          },
        }}
        listeners={{
          tabPress: (event) => {
            if (isTradeModalVisible) {
              event.preventDefault()
            }
          },
        }}
      />
      <Tab.Screen
        name='Trade'
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={isTradeModalVisible ? icons.close : icons.trade}
              iconStyle={
                isTradeModalVisible
                  ? {
                      width: 15,
                      height: 15,
                    }
                  : null
              }
              label='Trade'
              isTrade={true}
            />
          ),
          tabBarButton: (props) => (
            <TabBarCustomButton {...props} onPress={() => tradeTabButtonClickHandler()} />
          ),
        }}
      />
      <Tab.Screen
        name='Market'
        component={Market}
        options={{
          tabBarIcon: ({ focused }) => {
            if (!isTradeModalVisible) {
              return <TabIcon focused={focused} icon={icons.market} label='Market' />
            }
          },
        }}
        listeners={{
          tabPress: (event) => {
            if (isTradeModalVisible) {
              event.preventDefault()
            }
          },
        }}
      />
      <Tab.Screen
        name='Profile'
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            if (!isTradeModalVisible) {
              return <TabIcon focused={focused} icon={icons.profile} label='Profile' />
            }
          },
        }}
        listeners={{
          tabPress: (event) => {
            if (isTradeModalVisible) {
              event.preventDefault()
            }
          },
        }}
      />
    </Tab.Navigator>
  )
}

// const mapStateToProps = (state) => {
//   return {
//     isTradeModalVisible: state.tabReducer.isTradeModalVisible,
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setTradeModalVisibility: (isVisible) => {
//       return dispatch(setTradeModalVisibility(isVisible))
//     },
//   }
// }

export default Tabs
