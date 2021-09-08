import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import store from './stores/configureStore'

import Tabs from './navigation/tabs'

const Stack = createStackNavigator()

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={'MainLayout'}>
          <Stack.Screen name='MainLayout' component={Tabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App
