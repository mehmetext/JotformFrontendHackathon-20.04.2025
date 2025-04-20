interface Product {
  cid: string;
  connectedCategories: string; // JSON string array
  connectedProducts: string; // JSON string array
  corder: string;
  description: string;
  fitImageToCanvas: string;
  hasExpandedOption: string;
  hasQuantity: string;
  hasSpecialPricing: string;
  icon: string;
  images: string; // JSON string array of image URLs
  isLowStockAlertEnabled: string;
  isStockControlEnabled: string;
  lowStockValue: string;
  name: string;
  options: string; // JSON string array
  order: string;
  paymentUUID: string;
  pid: string;
  price: string;
  required: string;
  selected: string;
  showSubtotal: string;
}
