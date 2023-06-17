export interface AuthContextType {
  user: any;
  getUser: () => void;
  loading: boolean;
}