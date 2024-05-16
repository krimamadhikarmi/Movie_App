import {View, Text, Image, StyleSheet} from 'react-native';
export function MovieData({movie}) {
  return (
    <View style={styles.container}>
      {movie && (
        <View>
          <View>
            <Text style={styles.title}>{movie.original_title}</Text>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              }}
              style={styles.itemImage}
            />
          </View>
          <Text style={styles.itemText}>
            <Text style={styles.itemTitle}>Original Language:</Text>{' '}
            {movie.original_language}
          </Text>
          <Text style={styles.itemText}>
            <Text style={styles.itemTitle}>Popularity: </Text>
            {movie.popularity}
          </Text>
          <Text style={styles.itemText}>
            <Text style={styles.itemTitle}>Vote Average: </Text>
            {movie.vote_average}
          </Text>
          <Text style={styles.itemText}>
            <Text style={styles.itemTitle}>Release Date: </Text>
            {movie.release_date}
          </Text>
          <Text style={styles.itemText}>{movie.overview}</Text>
          <Text style={styles.sectionTitle}>Similar Movies</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    margin: 10,
    fontWeight: 'bold',
    color: 'crimson',
    textAlign: 'center',
  },
  itemImage: {
    width: 200,
    height: 300,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 15,
  },
  itemText: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 5,
  },
  itemTitle: {
    fontWeight: 'bold',
    color: 'crimson',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 10,
    color: 'crimson',
    textAlign:"center"
  },
  container:{
    backgroundColor: 'black'
  }
});
