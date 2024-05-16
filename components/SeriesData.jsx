import {View, Text, StyleSheet, Image} from 'react-native';

export function SeriesData({series}) {
  return (
    <View>
      <Text style={styles.title}>{series.original_name}</Text>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${series.poster_path}`,
        }}
        style={styles.itemImage}
      />
      <Text style={styles.item}>
        <Text style={styles.itemTitle}>Popularity: </Text>
        {series.popularity}
      </Text>
      <Text style={styles.item}>
        <Text style={styles.itemTitle}>Vote Average: </Text>
        {series.vote_average}
      </Text>
      <Text style={styles.item}>
        <Text style={styles.itemTitle}>Vote Count: </Text>
        {series.vote_count}
      </Text>

      <Text style={styles.itemText}>
        <Text style={styles.itemTitle}>Seasons: </Text>
        {series.seasons?.length}
      </Text>

      <Text style={styles.itemText}>{series.overview}</Text>

      <Text style={styles.sectionTitle}>Similar Series</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: 'red',
    marginTop: 10,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  item: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  itemImage: {
    width: 300,
    height: 400,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 30,
    alignSelf: 'center',
  },
  itemText: {
    textAlign: 'center',
    color: 'white',
    marginHorizontal: 15,
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
});
