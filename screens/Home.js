import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { useSelector } from 'react-redux'
import { MainLayout } from '.'
import { getCoinMarket, getHoldings } from '../stores/market/marketActions'
import { COLORS, dummyData, FONTS, icons, SIZES } from '../constants'
import { BalanceInfo, Chart, IconTextButton } from '../components'

const Home = () => {
  const { marketReducer } = useSelector((state) => state)
  const { myHoldings, coins, configureStore, error, loading } = marketReducer
  const [selectedCoin, setSelectedCoin] = useState(null)

  useEffect(() => {
    getHoldings(dummyData.holdings)
    getCoinMarket()
  }, [])

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
          chartPrices={
            selectedCoin ? selectedCoin?.sparkline_in_7d?.price : coins[0]?.sparkline_in_7d?.price
          }
        />

        {/* Top Crypto  */}
        <FlatList
          data={coins}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            marginTop: 30,
            paddingHorizontal: SIZES.padding,
          }}
          ListHeaderComponent={
            <View style={{ marginBottom: SIZES.radius }}>
              <Text style={{ color: COLORS.white, ...FONTS.h3, fontSize: 18 }}>
                Top Cryptocurrency
              </Text>
            </View>
          }
          renderItem={({ item }) => {
            const priceColor =
              item.price_change_percentage_7d_in_currency == 0
                ? COLORS.lightGray3
                : item.price_change_percentage_7d_in_currency > 0
                ? COLORS.lightGreen
                : COLORS.red
            return (
              <TouchableOpacity
                onPress={() => setSelectedCoin(item)}
                style={{
                  height: 55,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={{ width: 35 }}>
                  <Image source={{ uri: item.image }} style={{ height: 20, width: 20 }} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{item.name}</Text>
                </View>

                <View>
                  <Text style={{ textAlign: 'right', color: COLORS.white, ...FONTS.h4 }}>
                    $ {item.current_price}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                    }}>
                    {item.price_change_percentage_7d_in_currency != 0 && (
                      <Image
                        source={icons.upArrow}
                        style={{
                          height: 10,
                          width: 10,
                          tintColor: priceColor,
                          transform:
                            item.price_change_percentage_7d_in_currency > 0
                              ? [{ rotate: '45deg' }]
                              : [{ rotate: '140deg' }],
                        }}
                      />
                    )}
                    <Text style={{ marginLeft: 4, color: priceColor, ...FONTS.h3, lineHeight: 15 }}>
                      {item.price_change_percentage_7d_in_currency.toFixed(2)}%
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }}
          ListFooterComponent={<View style={{ marginBottom: 50 }} />}
        />
      </View>
    </MainLayout>
  )
}

export default Home
