import * as React from 'react';
import { StyleSheet, Text, View, Image, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function App() {

  const [catImage, setCatImage] = React.useState(null);
  const [quote, setQuote] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const fetchCatAndQuote = async () => {
    setLoading(true);
    try {
      const catResponse = await axios.get('https://api.thecatapi.com/v1/images/search');
      const quoteResponse = await axios.get('https://api.quotable.io/random');
  
      setCatImage(catResponse.data[0].url);
      setQuote(quoteResponse.data.content);
      setAuthor(quoteResponse.data.author);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  
  React.useEffect(() => {
    fetchCatAndQuote();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <>
          {catImage && <Image source={{ uri: catImage }} style={styles.image} />}
          <Text style={styles.quote}>{`"${quote}"`}</Text>
          <Text style={styles.author}>— {author}</Text>
          <Button title="Get New Cat & Quote" onPress={fetchCatAndQuote} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  quote: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 10,
  },
  author: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
});