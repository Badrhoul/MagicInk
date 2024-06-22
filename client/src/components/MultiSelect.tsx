import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Button } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

interface Item {
  id: string;
  name: string;
}

export default function MultiSelectComponent ({itemOptions}: { itemOptions: Item[] }) {
  const { control, handleSubmit } = useForm<{ items: string[] }>({
    defaultValues: {
      items: [],
    },
  });

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  function toggleItemSelection (itemId: string) {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(itemId)) {
        return prevSelectedItems.filter((id) => id !== itemId);
      } else {
        return [...prevSelectedItems, itemId];
      }
    });
  };

  function onSubmit (data: { items: string[] }) {
    console.log('Selected themes:', data.items);
  };

  return (
    <View style={styles.container}>
      <Controller
        name="items"
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <FlatList
              horizontal={true}
              data={itemOptions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.item,
                    value.includes(item.id) && styles.selectedItem,
                  ]}
                  onPress={() => {
                    toggleItemSelection(item.id);
                    onChange(value.includes(item.id)
                      ? value.filter((id) => id !== item.id)
                      : [...value, item.id]);
                  }}
                >
                  <Text style={styles.itemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    padding: 15,
    margin: 5,
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    height: 60
  },
  selectedItem: {
    backgroundColor: '#c6e2ff',
  },
  itemText: {
    fontSize: 16,
  },
});
