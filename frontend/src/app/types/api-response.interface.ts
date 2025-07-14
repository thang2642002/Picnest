export interface ApiResponse<T> {
  errCode: number;
  message: string;
  data: T; // obj table của các bảng (bảng nào cần thì thay vào)
}
