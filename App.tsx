/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import Router from './src/router';
import {StripeProvider} from '@stripe/stripe-react-native';

import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';
Amplify.configure(awsconfig)

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <StripeProvider publishableKey="pk_test_51L2ir5A08aA5aeHIPjzTpdY6eNYen8z3Em027SLPhT8d9SZQWAurUbakKVUs6mTDvdEDmpKzTBwCtud1Ucq8bJ2D00BBcZi7el">
        <Router />
      </StripeProvider>
      
    </SafeAreaView>
  );
};


export default App;

//Quand on ajoute Amplify a un projet il faut :
//1-verifier la version de AWS
//2-Amplify init (dans notre cas on garde les parametres par default)
//3-Ajouter les libraries sous la forme npm en allant dans Amplify doc get started en fonction du project (expo ou react native choisir les dependancies)
//4-Ajouter au projet les elements importe necessaire voir documentation 
//5-Ajout dans App.tsx 



//-----------------------------------------------------------------------------------------------------------------------------------------------------------
//Dans le cas de Stripe 
//1- npm stripe for react-native 
//2- inserer la librairie dans le fichier App.tsx
//3-StripeProvider dans le fichier et entourre la partie du code d'interet