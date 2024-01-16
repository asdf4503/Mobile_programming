import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const GymStyles = StyleSheet.create({
  
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 1, 
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'rgb(0, 150, 200)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: wp('20%'),
    left: wp('4%'),
  },
  imageStyle: {
    width: wp('15%'),
    height:hp('7%'),
  },
  textContainer: {
    zIndex: 10,
    width: wp('60%'),
    alignItems: 'center',
  },
  textStyle: {
    fontSize: hp('3%'), 
    fontWeight: 'bold',
  },
  spacer: {
    width: wp('20%'),
  },
  subHeader: {
    fontSize: hp('1%'), 
    fontWeight: 'bold',
    color: 'white',
  },
  image: {
    top: -130,
    width: '100%',
    height: 450,
  },
  reservationStatus: {
    width: '100%',
    padding: 10,
    backgroundColor: 'lightgreen',
  },
  reservationText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    position: 'absolute',
    backgroundColor: 'lightgray',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 120, // 높이를 약간 줄였습니다.
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 10 // 이용시간 설정하기와 회색 글씨를 위로 올리기 위해 패딩 추가
  },
  reservationButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5
  },
  greyText: {
    color: 'grey'
  },
  userIdText: {
    fontSize: 14,
    color: 'grey',
    marginTop: 5,
}

});

export default GymStyles;
