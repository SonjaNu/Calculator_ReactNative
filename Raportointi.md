## Yksinkertainen laskin

#### Kehitysympäristön valmistelu

Minulla oli valmiiksi asennettuna jo Expo-ympäristö: Node.js, Expo-Client ja Git. Latasin puhelimeen sovelluksen Expo Go.

#### Ensimmäisen projektin luominen
Loin kansion CalculatorReactNative
Avasin komentotulkin, Powershellin, admin-tilassa ja loin ensimmäisen projektin nimeltään ”calculator” komennolla expo init.

    PS C:\CalculatorReactNative> expo init calculator 

Tämän jälkeen valitsin pohjan (template) neljästä vaihtoehdosta. Blank on tässä vaiheessa oikein riittävä.

    Choose a template: » blank

Menin calculator-kansioon ja käynnistin projektin komennolla yarn start

    PS C:\CalculatorReactNative\calculator> yarn start

Käynnistin puhelimestani Expo Go -sovelluksen, ja luin QR-koodin komentotulkista, jolloin sain projektin näkymään emulaattorissa. Käytän kehitysympäristönä Visual Studio Codea.


#### Mietittävää
Miten saisi tilaa kahden tekstikentän tai kahden nappulan välille...? Yritin justifyContent: 'space-around' ja justifyContent: 'space-between' sekä asettaa marginaalille ja
paddingille arvoja, mutta ei onnistunut.

Noudatin hyväksi havaittua aloitustapaa sovellusten rakentamisessa eli ensin kirjoitin paperille sovelluksen vaatiman toiminnallisuuden ja miten sovelluslogiikan voisi toteuttaa.
Tämän jälkeen aloitin koodauksen määrittämällä muuttujat (tavanomaisten importtien ja funktion luomisen jälkeen). onPress oli minulle uusi asia, mutta hahmotin toiminnallisuuden nopeasti, kun onChange oli tuttu.


#### Calculator (+, -)
Lähdin rakentamaan yksinkertaista laksinta, jolla pystyisi laskemaan yhteen- ja vähennyslaskuja. 

Aloitin määrittämällä muuttujat:
- ensimmäinen käyttäjän syöttämä luku, alustettu alkuun tyhjäksi

      const [count, setCount] = useState('');
      
- toinen käyttäjän syöttämä luku, alustettu alkuun tyhjäksi

      const [count2, setCount2] = useState('');
      
- tulos, joka syntyy laskutoimituksen jälkeen ja ilmestyy käyttäjälle tekstialueelle, alustettu alkuun tyhjäksi

      const [result, setResult] = useState('');

Sitten loin kaksi tapahtumankäsittelijää: toisen yhteenlaskulle ja toisen vähennyslaskulle: suoritetaan laskutoimitus ja asetetaan käyttäjän syöttämät luvut tämän jälkeen tyhjiksi.
```
const subtraction= () =>{
    setResult(Number(count) - Number(count2));
    setCount('')
    setCount2('')
  }
```

Sitten rakensin ulkoasun: numerojen kirjoittamiselle kaksi TextInput komponenttia, tekstialueelle (<Text/>) vakioteksti "Result: " ja sen perään laskutoimituksen vastaus (result)
ja kaksi nappulaa + ja - . onPress ohjaa oikeaan tapahtumankäsittelijään:
```
<Button  onPress={addition} title="+" color="purple" /> 
<Button onPress={subtraction} title="-" color="purple"/>
```

Lopuksi määrittelin sovellukseen tyylejä.

      const styles = StyleSheet.create({ });
      
      
#### Calculator (Historian lisääminen)

Lähdin muokkaamaan calculator-sovellusta niin, että se jättäisi laskuhistorian muistiin.

Lisäsin FlatList-komponentin palautukseen (return)

```
<FlatList
        data={data}
        renderItem={({item}) => 
            <Text>{item.key}</Text>}
      />
```
Propertyssa nimeltä data annetaan lista, joka renderöidään.
Yksi alkoi näytetään renderItem -propertyssa: parametrina funktio, joka renderöi yhden alkion (item)
Se saa FlatList-komponentilta parametrina olion, josta poimitaan listan alkio (item.key  - Otetaan itemista attribuutti key). Tämä on Text-komponentin sisässä.
FlatList-komponentilla renderöidään lista, johon on koottuna tehdyt laskutoimitukset.
Lisäsin uuden tilamuuttujan listaa varten

        const [data, setData] = useState([]);

Aina kun lasku lisätään, sen pitäisi päivittyä heti listaan.

Lisäsin tapahtumankäsittelijöille subtraction ja addition muuttujan historyItem 

        const historyItem = `${count} + ${count2} = ${result}`;
        
ja asetin sen alkion  avainattribuutiksi listaan

        setData([...data, {key: historyItem}]);
        
Puretaan alkiot spread-operaattorilla (…data)
Vakiona on olio, jolla on yksi attribuutti ( {key: historyItem} )

      
#### Calculator (Navigoinnin lisääminen)
Lähdin muokkaamaan sovellusta niin, että laskuhistoria olisi eri näkymässä. Näkymään pääsisi nappia painamalla. Käytin React Navigation kirjaston stack-navigointia.

Asensin ja importoin navigoinnin

    npm install @react-navigation/native
    expo install react-native-screens react-native-safe-area-context
    
    npm install @react-navigation/native-stack

    import { NavigationContainer } from'@react-navigation/native';
    import { createNativeStackNavigator } from'@react-navigation/native-stack';
    
Otin navigointipalan käyttöön:   

    const Stack = createNativeStackNavigator()
    
Jos haluaisi käyttää tab-navigointia stack-navigoinnin sijaan, pitäisi se asentaa ja importoida erikseen:

    npm install @react-navigation/bottom-t
    
    import { NavigationContainer } from'@react-navigation/native';
    import { createBottomTabNavigator } from'@react-navigation/bottom-tabs';
    
    const Tab = createBottomTabNavigator(
    
    


