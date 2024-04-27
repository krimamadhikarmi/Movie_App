import { Text, View } from "react-native";

export function MovieList({movie}){
    return(
        <View>
            <Text>{movie.original_title}</Text>
            
        </View>
    )
}