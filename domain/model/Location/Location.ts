export interface LocationContextType {
  latitude: number | null;
  longitude: number | null;
  refreshLocation: () => Promise<void>;
}