import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import { useSelector } from 'react-redux'
import { getHoldings } from '../stores/market/marketActions'

import { MainLayout } from '.'
import { BalanceInfo, Chart } from '../components'
import { COLORS, dummyData, FONTS, SIZES } from '../constants'

const Portfolio = () => {
  const { marketReducer } = useSelector((state) => state)
  const { myHoldings } = marketReducer

  useEffect(() => {
    getHoldings(dummyData.holdings)
  }, [])

  let totalWallet = myHoldings?.reduce((a, b) => a + (b.total || 0), 0).toFixed(0)
  let valueChange = myHoldings?.reduce((a, b) => a + (b.holding_value_change_7d || 0), 0)
  let percChange = (valueChange / (totalWallet - valueChange)) * 100

  const renderCurrentBalanceSection = () => {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: COLORS.gray,
        }}>
        <Text style={{ marginTop: 50, color: COLORS.white, ...FONTS.largeTitle }}>Portfolio</Text>

        <BalanceInfo
          title='Current Balance'
          displayAmount={totalWallet}
          changePct={percChange}
          containerStyle={{ marginTop: SIZES.radius, marginBottom: SIZES.padding }}
        />
      </View>
    )
  }

  return (
    <MainLayout>
      <View style={{ flex: 1, backgroundColor: COLORS.black }}>
        {/* Header */}

        {renderCurrentBalanceSection()}

        {/* Chart */}
        <Chart
          containerSTyle={{ marginTop: SIZES.radius }}
          chartPrices={myHoldings[0]?.sparkline_in_7d?.value}
        />

        {/* Your assets */}
      </View>
    </MainLayout>
  )
}

export default Portfolio
