/**
 * Project: Go Stack React Native Challenge Concept
 * Author: Marcos Santos
 * Date: April, 20, 2020.
 * Description: This project aims to show the concepts
 * and techniques presented and learned in the interface
 * React Native training.
 * File: App.js
 * https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-react-native
 */

import React, { useEffect, useState } from "react";
import api from './services/api';

import { SafeAreaView, View, FlatList,
         Text, StatusBar, StyleSheet,
        TouchableOpacity, RefreshControl 
} from "react-native";

import Icon from 'react-native-vector-icons/FontAwesome';

function Item({ title }) {
  return (
    <View style={styles.repositoryContainer}>
      <Text style={styles.repository}>{title}</Text>
    </View>
  );
}

export default function App() {
  const [repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleLikeRepository(id) {
    const response = await api.post(`repositories/${id}/like`);

    const likedRepository = response.data;

    const repositoriesUpdated = repositories.map(repository => {
      if (repository.id === id ) {
        return likedRepository;
      } else {
        return repository;
      }
    });

    setRepositories(repositoriesUpdated);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>

        <Text style={styles.titleText}>Repositories</Text>

        <FlatList
          data={repositories}
          contentContainerStyle={styles.container}
          enableEmptySections={true}
          keyExtractor={repository => repository.id}  
          renderItem={({item: repository}) => (

          <View style={styles.containerFlatShadow}>
            <Text style={styles.repository}>{repository.title}</Text>
            <View style={styles.techsContainer}>
              {repository.techs.map(tech => (
                <Text key={tech} style={styles.tech}>
                  {tech}
                </Text>
              ))}
            </View>

            <View style={styles.likesContainer}>
              <Text
                style={styles.likeText}
                testID={`repository-likes-${repository.id}`} >
                {repository.likes} likes
              </Text>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleLikeRepository(repository.id)}
              testID={`like-button-${repository.id}`}>
              <Text style={styles.buttonText}>Like</Text>
            </TouchableOpacity>
            
          </View>

        )}
        />

        {/*
        <FlatList 
          data={[{name: 'a'}, {name: 'b'}]} 
          renderItem={
            ({item}) => <Text style={styles.repository}>{item.name}</Text>
          } 
          keyExtractor={(item, index) => index.toString()}
        />
          */}
        
      </SafeAreaView>
      <View style={styles.containerBottom}>
          
          {/*Icon Component and personal signature */}
          
          <Text style={styles.signatureText}>
            <Icon name="rocket" size={15} color="#900" /> 
             Made by Marcos - Copyright © 2020 All rights reserved.
          </Text>
            
        </View>
    </>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },

  containerFlatShadow:{
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
    shadowOffset:{  width: 10,  height: 10,  },
    shadowColor: 'black',
    shadowOpacity: 1.0,
    borderRadius: 80 / 4,
  },

  containerBottom: {
    marginBottom: 0,
    marginHorizontal: 1,
    backgroundColor: "#fff",
    padding: 20,
  },

  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },

  titleText: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: "bold",
    marginRight: 10,
    textAlign: "center",
    color: "white"
  },

  /*
  container: {
    flex: 1,
    backgroundColor: "#7159c1",    
    width:200,
    height:200,
    borderWidth:2, 
    borderColor:'red',
  },

  repositoryContainer: {
    //flex: 1,
    width:100,
    height:300,
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#C0C0C0",
    //padding: 20,
    alignContent: 'center',
    
    flexDirection:'row',
    alignItems:'flex-start', 
    borderWidth:10,
    borderColor:'green',
  },
  */

  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },

  signatureText: {
    fontSize: 10,
    fontWeight: "bold",
    marginRight: 10,
    alignContent: 'center',
  },

  button: {
    marginTop: 10,
    shadowOffset:{  width: 8,  height: 8,  },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    borderRadius: 80 / 4,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
