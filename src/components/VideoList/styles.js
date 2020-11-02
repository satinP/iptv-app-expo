import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
  },
  video: {
    backgroundColor: '#fafafa',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  scrollView: {
    height: '45%',
    width: '100%',
    alignSelf: 'center',
    borderColor: 'black',
    backgroundColor: 'lightblue'
  }
});

export default styles;