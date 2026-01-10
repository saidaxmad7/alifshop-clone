export const urls = {
    categories: {
        getList: "/categories",
        getOne: (id: string | number): string => `/categories/${id}`,
    },
    banner: {
        getList: "/banners",
        getOne: (id: string | number): string => `/banners/${id}`,
    },
    products: {
        getList: '/products',
        saleProductList: '/products?is_sale=true',
        intProductList: '/products?is_interesting=true',
        getOne: (id: string | number): string => `/products/${id}`,
    },
};
