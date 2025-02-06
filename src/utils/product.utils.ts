// src/components/layouts/SelectOptions.ts

export interface SelectOption {
    value: string;
    label: string;
  }
  
  export const categoryOptions: SelectOption[] = [
    { value: 'all', label: 'All' },
    { value: 'sports', label: 'Sports' },
    { value: 'cruiser', label: 'Cruiser' },
    { value: 'naked', label: 'Naked' },
  ];
  
  export const brandOptions: SelectOption[] = [
    { value: 'all', label: 'All' },
    { value: 'yamaha', label: 'Yamaha' },
    { value: 'honda', label: 'Honda' },
    { value: 'ktm', label: 'KTM' },
    { value: 'suzuki', label: 'Suzuki' },
  ];
  
  export const colorsList: SelectOption[] = [
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' },
    { value: 'black', label: 'Black' },
    { value: 'white', label: 'White' },
    { value: 'green', label: 'Green' },
  ];
  