export default interface Graph {
  id: string | number;
  color: string;
  data: { x: number | string; y: number }[];
}
