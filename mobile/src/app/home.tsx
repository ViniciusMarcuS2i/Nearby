import Categories, { CategoriesProps } from "@/components/categories";
import { PlaceProps } from "@/components/place";
import Places from "@/components/places";
import { api } from "@/libs/api";
import { useEffect, useState } from "react";
import { View } from "react-native";

type MarkekProps = PlaceProps;

function Home() {
  const [categories, setCategories] = useState<CategoriesProps>([]);
  const [category, setCategory] = useState("");
  const [markets, setMarkets] = useState<MarkekProps[]>([]);

  async function fetchCategories() {
    try {
      const { data } = await api.get("/categories");
      setCategories(data);
      setCategory(data[0].id);
    } catch (error) {
      throw error;
    }
  }

  async function fetchMarkets() {
    try {
      if (!category) return;
      const { data } = await api.get(`/markets/category/${category}`);
      setMarkets(data);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchMarkets();
  }, [category]);

  return (
    <View style={{ flex: 1 }}>
      <Categories
        onSelect={setCategory}
        selected={category}
        data={categories}
      />
      <Places data={markets} />
    </View>
  );
}

export default Home;
