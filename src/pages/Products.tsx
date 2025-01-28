import { useGetAllProductsQuery } from "@/redux/features/productApi";

const Products = () => {

    const {data} = useGetAllProductsQuery(undefined)
    const products = data?.data?.data;

    return (
        <div>
            Bicycles
        </div>
    );
};

export default Products;