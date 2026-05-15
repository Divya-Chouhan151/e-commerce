export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  stockQuantity: number;
  imageUrl: string;
}

const API_BASE_URL = 'http://localhost:8080/api';

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_BASE_URL}/products`, {
    cache: 'no-store'
  });
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  return response.json();
};
