import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  NativeModules,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  ActivityIndicator,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {BASE_URL} from '../common/utils';
import {homeScreenAPI} from '../services/homeApi';
import {setIsLoading} from '../reducer/homeReducer';

const {StatusBarManager} = NativeModules;

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 100 : StatusBarManager.HEIGHT;

const boxSize = Dimensions.get('window').width / 2 - 15;

const HomeScreen = () => {
  const dispatch = useDispatch();
  const homeRes = useSelector(state => state?.home);

  const [pageNo, setPageNo] = React.useState(1);

  React.useEffect(() => {
    getData(pageNo);
  }, []);

  const getData = pageValue => {
    var data = JSON.stringify({
      limit: '10',
      page: pageValue,
      search: '',
    });
    if (pageValue === 1) {
      dispatch(setIsLoading(true));
    }
    dispatch(homeScreenAPI(data));
  };

  const fetchMoreData = () => {
    let pageNo_Count = parseInt(pageNo) + 1;
    setPageNo(pageNo_Count);
    getData(pageNo_Count);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: STATUSBAR_HEIGHT,
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 20,
        }}>
        <View style={{flex: 0.2}}>
          <Text>Back</Text>
        </View>
        <View style={{flex: 0.6}}>
          <Text style={{textAlign: 'center', fontSize: 20, color: 'black'}}>
            Home
          </Text>
        </View>
        <View style={{flex: 0.1}}>
          <Text>right</Text>
        </View>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}
        data={homeRes.searchArr}
        numColumns={2}
        contentContainerStyle={{
          padding: 5,
        }}
        onEndReachedThreshold={0.05}
        onEndReached={fetchMoreData}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {}}
              style={{
                margin: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{backgroundColor: 'white'}}>
                <Image
                  style={{width: boxSize, height: boxSize}}
                  source={
                    item != undefined &&
                    item.image != undefined &&
                    item.image != '' &&
                    item.image !== null
                      ? {uri: homeRes.image_path + '/' + item.image}
                      : ''
                  }
                  resizeMode={'cover'}
                />

                <View
                  style={{
                    backgroundColor: 'white',
                    width: boxSize,
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingBottom: 10,
                  }}>
                  <Text>{item?.name}</Text>

                  <Text>{item?.store?.name}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={() => {
          return (
            <View style={{flex: 1, justifyContent: 'center', height: 500}}>
              <Text style={{textAlign: 'center', fontSize: 20, color: 'black'}}>
                No Data Found
              </Text>
            </View>
          );
        }}
      />
      <Modal
        transparent={true}
        animationType={'none'}
        visible={homeRes.isLoading}
        onRequestClose={() => {}}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator
              size="small"
              color={'red'}
              animating={homeRes.isLoading}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 60,
    width: 60,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
