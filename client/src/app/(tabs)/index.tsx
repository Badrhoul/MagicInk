import { StyleSheet } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View, TextInput, Button, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import MultiSelectComponent from '@/components/MultiSelect';

interface Item {
  id: string;
  name: string;
}


export default function TabOneScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  });
  const onSubmit = (data: any) => console.log(data);


  const itemOptions: Item[] = [
    { id: '1', name: 'Adventure' },
    { id: '2', name: 'Horror' },
    { id: '3', name: 'Pirates' },
    { id: '4', name: 'Cowboys' },
    { id: '5', name: 'Magic' },
    { id: '6', name: 'Mystical' },
    { id: '7', name: 'Vampires' },
  ];

  return (
    <View style={styles.container}>
      {/* button suprise me */}
      <Button title='Suprise me!'/>
      {/* themes */}
      {/* location */}
      {/* select reading level */}
      {/* reading time */}

      <Controller 
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput placeholder='Themes' onBlur={onBlur} onChangeText={onChange} value={value} />
        )}
        name='firstName'
        />
      <MultiSelectComponent itemOptions={itemOptions}/>


      <Button title='Create story' onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
