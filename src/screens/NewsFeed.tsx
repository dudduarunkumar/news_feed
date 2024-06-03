import React, {Component} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import SwipeAnimatonButton from '../components/SwipeAnimationButton';

interface Article {
  urlToImage?: string;
  title: string;
  content: string;
  description: string;
}

interface IState {
  data: Article[];
  swipeNo: number;
  initialSwipe: boolean;
  slides: boolean;
}

const API_KEY = 'dc16723f9b184e2980a4331252dfeae5';

export class NewsFeed extends Component<{}, IState> {
  state: IState = {
    data: [],
    swipeNo: 0,
    initialSwipe: false,
    slides: false,
  };

  handleInitialSwipe = async () => {
    try {
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${API_KEY}`,
      );
      const data = await res.json();
      this.setState({
        initialSwipe: !this.state.initialSwipe,
        data: data.articles,
        swipeNo: 0,
      });
    } catch (e) {
      console.log(e);
    }
  };

  handleSwipes = () => {
    this.setState({slides: true});
    if (this.state.swipeNo >= this.state.data.length-1) {
      this.handleInitialSwipe();
      this.setState({slides:false})
    } else {
      setTimeout(() => {
        this.setState(prevState => ({
          swipeNo: prevState.swipeNo + 1,
          slides: false,
        }));
      }, 1000);
    }
  };

  render() {
    const {initialSwipe, slides, data, swipeNo} = this.state;

    return (
      <View style={styles.container}>
        {!initialSwipe ? (
          <View style={styles.initialContainer}>
            <View>
              <Text style={styles.newsFeedText}>Welcome to News Feed</Text>
              <SwipeAnimatonButton onSwipeSuccess={this.handleInitialSwipe} />
            </View>
          </View>
        ) : slides ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#75b9a2" />
          </View>
        ) : (
          <View style={styles.contentContainer}>
            <Text style={styles.headerText}>News Feed App</Text>
            <View style={styles.card}>
              {data[swipeNo]?.urlToImage && (
                <Image
                  style={styles.newsImage}
                  resizeMode="stretch"
                  source={{uri: data[swipeNo].urlToImage}}
                />
              )}
              <Text style={styles.titleText}>{data[swipeNo]?.title}</Text>
              <Text style={styles.contentText}>
                {data[swipeNo]?.content}
                {data[swipeNo]?.description}
              </Text>
            </View>
            <View style={styles.swipeButtonContainer}>
              <SwipeAnimatonButton onSwipeSuccess={this.handleSwipes} />
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default NewsFeed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  initialContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: responsiveWidth(5),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    paddingVertical: responsiveHeight(5),
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'grey',
    paddingHorizontal: responsiveWidth(7),
  },
  headerText: {
    fontSize: responsiveFontSize(2.5),
    color: 'white',
    fontWeight: '900',
  },
  newsFeedText: {
    color: '#75b9a2',
    fontSize: responsiveFontSize(2.5),
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: responsiveHeight(2),
  },
  titleText: {
    color: 'black',
    marginVertical: 10,
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
  contentText: {
    flex: 1,
    color: 'black',
    marginVertical: 10,
    fontSize: responsiveFontSize(1.8),
  },
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '80%',
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(2),
    borderRadius: responsiveFontSize(2),
  },
  newsImage: {
    height: '60%',
    width: '100%',
    borderRadius: responsiveFontSize(1.5),
  },
  swipeButtonContainer: {
    width: '98%',
    height: '10%',
    justifyContent: 'center',
    marginBottom: 20,
  },
});
