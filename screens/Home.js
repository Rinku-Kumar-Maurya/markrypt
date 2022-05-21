import { useState } from 'react'
import { View, SafeAreaView, FlatList, Image, Text } from "react-native"

import { assets, COLORS, FONTS, NFTData, SIZES } from '../constants'
import { HomeHeader, NFTCard, FocusedStatusBar } from '../components'

const Home = () => {
  const [nftData, setNftData] = useState(NFTData);

  const handleSearch = (value) => {
    if (!value.length) {
      return setNftData(NFTData);
    }

    const filteredData = NFTData.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredData.length) {
      setNftData(filteredData);
    }
    else {
      setNftData([]);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar background={COLORS.primary} />

      <View style={{ flex: 1 }}>
        <View style={{ zIndex: 0 }}>
          <FlatList
            data={nftData}
            renderItem={({ item }) => <NFTCard data={item} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<HomeHeader onSearch={handleSearch} />}
          />

          {nftData.length === 0 &&
            <View style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <Image
                source={assets.noContent}
                resizeMode="contain"
                style={{ width: '50%' }}
              />
              <Text style={{
                fontSize: SIZES.font,
                fontFamily: FONTS.semiBold,
                color: COLORS.primary
              }}>
                No matching results
              </Text>
            </View>
          }
        </View>

        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1
          }}
        >
          <View style={{ height: 300, backgroundColor: COLORS.primary }} />
          <View style={{ flex: 1, backgroundColor: COLORS.white }} />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Home