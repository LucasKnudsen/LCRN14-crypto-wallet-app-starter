import React, { useCallback } from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { MainLayout } from '.'
import { useFocusEffect } from '@react-navigation/core'
import { getCoinMarket, getHoldings } from '../stores/market/marketActions'
import { COLORS, dummyData, icons, SIZES } from '../constants'
import { BalanceInfo, Chart, IconTextButton } from '../components'

const Home = () => {
  const { marketReducer } = useSelector((state) => state)
  const { myHoldings, coins, configureStore, error, loading } = marketReducer

  useFocusEffect(
    useCallback(() => {
      getHoldings(dummyData.holdings)
      getCoinMarket()
    }, [])
  )

  let totalWallet = myHoldings?.reduce((a, b) => a + (b.total || 0), 0).toFixed(0)
  let valueChange = myHoldings?.reduce((a, b) => a + (b.holding_value_change_7d || 0), 0)
  let percChange = (valueChange / (totalWallet - valueChange)) * 100

  const renderWalletInfoSection = () => {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: COLORS.gray,
        }}>
        {/* Balance info */}
        <BalanceInfo
          title='Your wallet'
          displayAmount={totalWallet}
          changePct={percChange}
          containerStyle={{ marginTop: 50 }}
        />

        {/* Buttons */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: 30,
            marginBottom: -15,
            paddingHorizontal: SIZES.radius,
          }}>
          <IconTextButton
            label='Transfer'
            icon={icons.send}
            containerStyle={{ flex: 1, height: 40, marginRight: SIZES.radius }}
            onPress={() => console.log('TRANSFER')}
          />
          <IconTextButton
            label='Withdraw'
            icon={icons.withdraw}
            containerStyle={{ flex: 1, height: 40, marginRight: SIZES.radius }}
            onPress={() => console.log('WITHDRAW')}
          />
        </View>
      </View>
    )
  }

  return (
    <MainLayout>
      <View style={{ flex: 1, backgroundColor: COLORS.black }}>
        {/* Header  */}
        {renderWalletInfoSection()}

        {/* Chart */}
        <Chart
          containerStyle={{ marginTop: SIZES.padding * 2 }}
          chartPrices={coins && coins[0]?.sparkline_in_7d?.price}
        />

        {/* Top Crypto  */}
      </View>
    </MainLayout>
  )
}

export default Home
