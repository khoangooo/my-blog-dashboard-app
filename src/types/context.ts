export interface AuthContextType {
  user?: any;
  login?: (user: string, callback: VoidFunction) => void;
  logout?: (callback: VoidFunction) => void;
}