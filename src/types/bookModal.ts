export interface BookModalData {
  id: string;
  color: string;
}

export interface ActiveItem {
  type: 'slider' | 'grid';
  index: number;
}
