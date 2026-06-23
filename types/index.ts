export type UserRole = "admin" | "user" | "staff";

export interface User {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
  role: UserRole;
  profile_image_url: string;
  total_orders: number;
  total_spent: number;
}

export interface UserWithRelations extends User {
  cart: Cart | null;
  orders: Order[];
  reviews: Review[];
}

export interface UserFetchProps {
  page_size?: number;
  page?: number;
  name?: string;
  email?: string;
  role?: UserRole;
}

export interface Cart {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  items: CartItem[];
  user: User;
  total_products: number;
  total_price: number;
}

export interface CartItem {
  id: string;
  created_at: string;
  updated_at: string;
  cart_id: string;
  cart: Cart;
  product_id: string;
  product: Product;
  quantity: number;
  total_price: number;
}

export type CartItemCreate = Omit<
  CartItem,
  | "id"
  | "created_at"
  | "updated_at"
  | "cart"
  | "cart_id"
  | "product"
  | "total_price"
>;

type CartItemEditableFields = Pick<CartItem, "quantity">;

export type CartItemUpdate = Partial<CartItemEditableFields> & {
  id: string;
};

export interface CartFetchProps {
  page_size?: number;
  page?: number;
}
export type OrderStatus =
  | "pending"
  | "processing"
  | "confirmed"
  | "cancelled"
  | "failed"
  | "refunded"
  | "completed";

export interface Order {
  id: string;
  public_id: string;
  created_at: string;
  updated_at: string;
  order_items: OrderItem[];
  total_products: number;
  total_price: number;
  user_id: string;
  user: User;
  status: OrderStatus;
  cancelled_at: string;
  refunded_at: string;
}

export type OrderCreate = Omit<
  Order,
  | "id"
  | "public_id"
  | "created_at"
  | "updated_at"
  | "order_items"
  | "total_products"
  | "total_price"
  | "user_id"
  | "user"
  | "status"
  | "cancelled_at"
  | "refunded_at"
>;

export interface OrderItem {
  id: string;
  created_at: string;
  updated_at: string;
  order_id: string;
  order: Order;
  product_id: string;
  product: Product;
  quantity: number;
  price_at_purchase: number;
}

export interface OrderFetchProps {
  page_size?: number;
  page?: number;
  status?: OrderStatus;
  name?: string;
}

export interface Review {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  user: User;
  product_id: string;
  product: Product;
  rating: number;
  comment: string;
}

export type ReviewCreate = Omit<
  Review,
  "id" | "created_at" | "updated_at" | "user_id" | "product" | "user"
>;

type ReviewEditableFields = Pick<Review, "rating" | "comment">;

export type ReviewUpdate = Partial<ReviewEditableFields> & {
  id: string;
};

export interface ReviewFetchProps {
  page_size?: number;
  page?: number;
  product_id?: string;
  user_id?: string;
}

export type ProductStatus = "draft" | "published" | "archived";

export interface Product {
  id: string;
  slug: string;
  created_at: string;
  updated_at: string;
  name: string;
  image_url: string;
  price: number;
  category: string;
  description: string;
  variants?: string[];
  reviews: Review[];
  total_reviews: number;
  average_rating: number;
  status: ProductStatus;
}

export type ProductCreate = Omit<
  Product,
  | "id"
  | "slug"
  | "created_at"
  | "updated_at"
  | "reviews"
  | "total_reviews"
  | "average_rating"
>;

type ProductEditableFields = Pick<
  Product,
  | "name"
  | "image_url"
  | "price"
  | "category"
  | "description"
  | "status"
  | "variants"
>;

export type ProductUpdate = Partial<ProductEditableFields> & {
  id: string;
};

export interface ProductFetchProps {
  page_size?: number;
  page?: number;
  name?: string;
  category?: string;
  status?: ProductStatus;
}

export interface ProductCategoriesSummary {
  category: string;
  product_count: number;
}

export interface ProductCategoriesSummaryFetchProps {
  status?: ProductStatus;
}

export interface DashboardSummary {
  total_revenue: number;
  revenue_change_percent: number;
  total_orders: number;
  orders_change_percent: number;
  total_customers: number;
  customers_change_percent: number;
  total_products: number;
}

export interface TopProducts {
  product: Product;
  quantity_sold: number;
  revenue: number;
}

export interface TopProductsFetchProps {
  limit?: number;
}

export interface DateRange {
  start_date?: string;
  end_date?: string;
}

export interface Pagination {
  pageIndex: number;
  pageSize: number;
}
